
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage, languages } from '@/contexts/LanguageContext';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-9 gap-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{language.name}</span>
          <span className="inline sm:hidden">{language.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 glass-card p-1 animate-scale-in"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition-all ${
              language.code === lang.code 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' 
                : 'hover:bg-gray-50 dark:hover:bg-slate-800/60'
            }`}
            onClick={() => setLanguage(lang)}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
