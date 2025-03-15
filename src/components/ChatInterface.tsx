
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, StopCircle } from 'lucide-react';
import { Message } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onSendAudio?: (audioBlob: Blob) => void;
}

export const ChatInterface = ({ 
  messages, 
  isTyping, 
  onSendMessage,
  onSendAudio
}: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  // New refs for audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset recording state when language changes
  useEffect(() => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, [language]);
  
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Only call onSendAudio if it exists and we have audio data
        if (onSendAudio && audioChunksRef.current.length > 0) {
          onSendAudio(audioBlob);
        }
        
        // Simulate text from speech for now
        let simulatedText = "Can you tell me about personal loans?";
        
        if (language.code === 'es') {
          simulatedText = "¿Puedes contarme sobre préstamos personales?";
        } else if (language.code === 'fr') {
          simulatedText = "Pouvez-vous me parler des prêts personnels?";
        } else if (language.code === 'de') {
          simulatedText = "Können Sie mir etwas über Privatkredite erzählen?";
        } else if (language.code === 'zh') {
          simulatedText = "您能告诉我关于个人贷款的信息吗？";
        } else if (language.code === 'hi') {
          simulatedText = "क्या आप मुझे व्यक्तिगत ऋण के बारे में बता सकते हैं?";
        } else if (language.code === 'ja') {
          simulatedText = "個人ローンについて教えていただけますか？";
        } else if (language.code === 'ar') {
          simulatedText = "هل يمكنك إخباري عن القروض الشخصية؟";
        } else if (language.code.includes('IN')) {
          // For Indian languages
          simulatedText = "Can you tell me about personal loans in India?";
          
          if (language.code === 'hi') {
            simulatedText = "क्या आप मुझे भारत में व्यक्तिगत ऋण के बारे में बता सकते हैं?";
          }
        }
        
        setInputValue(simulatedText);
        
        // Stop all tracks on the stream to release the microphone
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice recording.",
      });
      setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording stopped",
        description: "Processing your audio...",
      });
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                } shadow-sm animate-scale-in`}
              >
                <p className="text-sm sm:text-base">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block text-right">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className={`shrink-0 h-10 w-10 rounded-full transition-all duration-200 ${
              isRecording ? 'bg-red-50 border-red-500 text-red-500 animate-pulse' : ''
            }`}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <StopCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
          
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={language.code === 'en' ? "Type your message..." : 
                           language.code === 'es' ? "Escribe tu mensaje..." :
                           language.code === 'fr' ? "Tapez votre message..." :
                           language.code === 'de' ? "Geben Sie Ihre Nachricht ein..." :
                           language.code === 'zh' ? "输入您的消息..." :
                           language.code === 'hi' ? "अपना संदेश लिखें..." :
                           language.code === 'ja' ? "メッセージを入力..." :
                           language.code === 'ar' ? "اكتب رسالتك..." : 
                           language.code === 'bn-IN' ? "আপনার বার্তা টাইপ করুন..." :
                           language.code === 'gu-IN' ? "તમારો સંદેશ લખો..." :
                           language.code === 'kn-IN' ? "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ..." :
                           language.code === 'ml-IN' ? "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക..." :
                           language.code === 'mr-IN' ? "तुमचा संदेश टाइप करा..." :
                           language.code === 'od-IN' ? "ଆପଣଙ୍କ ବାର୍ତ୍ତା ଟାଇପ୍ କରନ୍ତୁ..." :
                           language.code === 'pa-IN' ? "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ..." :
                           language.code === 'ta-IN' ? "உங்கள் செய்தியைத் தட்டச்சு செய்யவும்..." :
                           language.code === 'te-IN' ? "మీ సందేశాన్ని టైప్ చేయండి..." :
                           "Type your message..."}
              className="pr-10 py-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-full focus-visible:ring-blue-500"
              dir={language.code === 'ar' ? "rtl" : "ltr"} // Add right-to-left support for Arabic
            />
            {isRecording && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-6 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1.5 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            size="icon"
            className="shrink-0 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
