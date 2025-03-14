
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { LoanAdvisor } from '@/components/LoanAdvisor';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-blue-50/80 to-slate-50/80 dark:from-slate-900/80 dark:to-blue-900/80 -z-10 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <main className={`flex-1 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-16 md:gap-24">
            <Hero />
            <LoanAdvisor />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
