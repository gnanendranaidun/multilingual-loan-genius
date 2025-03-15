
import { useState, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatInterface } from './ChatInterface';
import { 
  CheckCircle2, 
  CircleDollarSign, 
  FileText, 
  BarChart3,
  GraduationCap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { testAPICall } from '@/utils/chatApi';
import { useToast } from '@/components/ui/use-toast';

export const LoanAdvisor = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'about'>('chat');
  const { language, t } = useLanguage();
  const { messages, isTyping, addMessage, addAudioMessage } = useChat();
  const { toast } = useToast();
  const [apiTestResult, setApiTestResult] = useState<string | null>(null);

  // Reset chat when language changes
  useEffect(() => {
    // This will trigger a new initial message in the useChat hook
    // because messages will be empty again
  }, [language]);

  // Handle audio submission
  const handleAudioSubmission = (audioBlob: Blob) => {
    // Call the addAudioMessage function from useChat
    addAudioMessage(audioBlob);
  };

  // Test the API directly
  const handleTestAPI = async () => {
    try {
      toast({
        title: "Testing API",
        description: "Sending test message to API...",
      });
      
      const testMessage = "Hello, this is a test message.";
      const result = await testAPICall(testMessage);
      
      setApiTestResult(result);
      
      toast({
        title: "API Test Complete",
        description: "Check the result below the chat window.",
      });
    } catch (error) {
      console.error("API test failed:", error);
      toast({
        variant: "destructive",
        title: "API Test Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  // Loan advisor features
  const features = [
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: t('loanEligibility'),
      description: t('loanEligibilityDesc')
    },
    {
      icon: <CircleDollarSign className="h-6 w-6" />,
      title: t('rateComparison'),
      description: t('rateComparisonDesc')
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t('applicationGuidance'),
      description: t('applicationGuidanceDesc')
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t('financialAnalysis'),
      description: t('financialAnalysisDesc')
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: t('financialEducation'),
      description: t('financialEducationDesc')
    }
  ];

  return (
    <section id="advisor" className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              {t('conversation')}
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-all duration-200 ${
                activeTab === 'about'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('about')}
            >
              {t('about')}
            </button>
          </div>
          
          {/* Content */}
          <div className="h-[600px]">
            {activeTab === 'chat' ? (
              <>
                <ChatInterface
                  key={language.code} // This will recreate the component when language changes
                  messages={messages}
                  isTyping={isTyping}
                  onSendMessage={addMessage}
                  onSendAudio={handleAudioSubmission}
                />
                <div className="px-4 pb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleTestAPI}
                    className="w-full mt-2"
                  >
                    Test API Connection
                  </Button>
                  
                  {apiTestResult && (
                    <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm overflow-auto max-h-32">
                      <p className="font-semibold">API Response:</p>
                      <pre className="whitespace-pre-wrap break-words">
                        {apiTestResult}
                      </pre>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full overflow-y-auto p-6 sm:p-8">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{t('aboutTitle')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('aboutDescription')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex gap-4 p-4 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="shrink-0 mt-1 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
                    <h3 className="text-lg font-semibold mb-2">{t('privacy')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('privacyDescription')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
