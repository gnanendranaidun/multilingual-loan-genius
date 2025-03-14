
import { useState, useEffect, useCallback } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
};

export type ChatOptions = {
  initialMessages?: Message[];
  onMessageReceived?: (message: Message) => void;
};

// Mock responses for financial questions
const financialResponses: Record<string, string> = {
  'loan': "I can help you find the right loan. What type of loan are you interested in? Personal, home, auto, education, or business?",
  'eligibility': "To check your loan eligibility, I'll need some information about your finances. What's your annual income, credit score, and employment duration?",
  'credit': "Your credit score is an important factor for loan approval. A higher score may qualify you for better interest rates. Would you like tips to improve your credit score?",
  'interest': "Interest rates vary based on loan type, your credit score, income, and market conditions. For specific rates, I'll need more details about your financial situation.",
  'personal loan': "Personal loans can be used for various purposes like debt consolidation or large purchases. They typically have terms of 1-7 years with fixed interest rates.",
  'home loan': "Home loans or mortgages help finance property purchases. They usually have longer terms (15-30 years) and require a down payment. Let me know if you'd like to check your eligibility.",
  'auto loan': "Auto loans are specifically for vehicle purchases. They typically have terms of 3-7 years, and the vehicle serves as collateral for the loan.",
  'education loan': "Education loans help finance higher education costs. They often have favorable interest rates and repayment terms that begin after graduation.",
  'business loan': "Business loans provide capital for starting or expanding a business. The requirements and terms vary based on your business plan and financial projections.",
  'default': "I'm your financial assistant. I can help with loan information, eligibility checks, and financial guidance. What would you like to know about?"
};

export const useChat = (options: ChatOptions = {}) => {
  const [messages, setMessages] = useState<Message[]>(options.initialMessages || []);
  const [isTyping, setIsTyping] = useState(false);

  // Function to generate a response based on user input
  const generateResponse = useCallback((userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simple keyword matching for demo purposes
      const userInput = userMessage.toLowerCase();
      let response = financialResponses.default;
      
      // Check for keywords in the user input
      Object.keys(financialResponses).forEach((keyword) => {
        if (userInput.includes(keyword)) {
          response = financialResponses[keyword];
        }
      });
      
      // Simulate network delay
      setTimeout(() => {
        resolve(response);
      }, 1000 + Math.random() * 1000); // 1-2 second delay
    });
  }, []);

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
      const responseText = await generateResponse(content);
      
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
  }, [generateResponse, options]);

  // Initialize with system message
  useEffect(() => {
    if (messages.length === 0) {
      addMessage("Hello! I'm your financial assistant. How can I help you today?", 'assistant');
    }
  }, []);

  return {
    messages,
    isTyping,
    addMessage,
  };
};
