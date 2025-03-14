
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <span 
          className={`inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {t('multilingual')}
        </span>
        
        <h1 
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {t('heroTitle')}
        </h1>
        
        <p 
          className={`max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-balance mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {t('heroSubtitle')}
        </p>
        
        <div 
          className={`mt-8 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <a 
            href="#advisor" 
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.97]"
          >
            {t('startConversation')}
          </a>
          <button 
            className="inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 px-6 py-3 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.97]"
          >
            {t('learnMore')}
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
    </section>
  );
};
