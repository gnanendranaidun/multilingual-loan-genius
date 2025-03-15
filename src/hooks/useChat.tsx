
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { Message, ChatOptions } from '@/types/chat';
import { sendTextToAPI, sendAudioToAPI } from '@/utils/chatApi';
import responses from '@/data/mockResponses';

export type { Message, ChatOptions };

export const useChat = (options: ChatOptions = {}) => {
  const [messages, setMessages] = useState<Message[]>(options.initialMessages || []);
  const [isTyping, setIsTyping] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();

  // Function to send text to the real API
  const handleSendTextToAPI = useCallback(async (text: string): Promise<string> => {
    return sendTextToAPI(text, language.code, toast);
  }, [language.code, toast]);
  
  // Function to send audio to the API
  const handleSendAudioToAPI = useCallback(async (audioBlob: Blob): Promise<string> => {
    return sendAudioToAPI(audioBlob, language.code, toast, handleSendTextToAPI);
  }, [language.code, toast, handleSendTextToAPI]);

  // Add a message to the chat
  const addMessage = useCallback(async (content: string, role: 'user' | 'assistant' | 'system' = 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    if (options.onMessageReceived) {
      options.onMessageReceived(newMessage);
    }
    
    // If it's a user message, generate a response
    if (role === 'user') {
      setIsTyping(true);
      const responseText = await handleSendTextToAPI(content);
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, responseMessage]);
      setIsTyping(false);
      
      if (options.onMessageReceived) {
        options.onMessageReceived(responseMessage);
      }
    }
  }, [options, handleSendTextToAPI]);
  
  // Function to handle audio submissions
  const addAudioMessage = useCallback(async (audioBlob: Blob) => {
    setIsTyping(true);
    
    // Process the audio through the API
    const responseText = await handleSendAudioToAPI(audioBlob);
    
    // Create an assistant message with the response
    const responseMessage: Message = {
      id: Date.now().toString(),
      content: responseText,
      role: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, responseMessage]);
    setIsTyping(false);
    
    if (options.onMessageReceived) {
      options.onMessageReceived(responseMessage);
    }
  }, [options, handleSendAudioToAPI]);

  // Initialize with system message in the current language
  useEffect(() => {
    if (messages.length === 0) {
      const currentLangResponses = responses[language.code as keyof typeof responses] || responses.en;
      addMessage(currentLangResponses.default, 'assistant');
    }
  }, [language, messages.length, addMessage]);

  return {
    messages,
    isTyping,
    addMessage,
    addAudioMessage,
  };
};
