import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  // Adding Indian languages
  { code: 'en-IN', name: 'English (India)', flag: '🇮🇳' },
  { code: 'bn-IN', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn-IN', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml-IN', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mr-IN', name: 'मराठी', flag: '🇮🇳' },
  { code: 'od-IN', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa-IN', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te-IN', name: 'తెలుగు', flag: '🇮🇳' },
];

// Define translations for different languages
export const translations = {
  en: {
    appName: "LoanGenius",
    heroTitle: "Your Intelligent Loan Assistant",
    heroSubtitle: "Explore loan options, check eligibility, and get financial guidance in your language—all in one seamless conversation.",
    startConversation: "Start Conversation",
    learnMore: "Learn More",
    multilingual: "Multilingual Financial Advisor",
    conversation: "Conversation",
    about: "About",
    aboutTitle: "Multilingual Loan Advisor",
    aboutDescription: "Your AI-powered financial assistant that helps you navigate the complex world of loans and financing options. Get personalized guidance, check your eligibility, and receive step-by-step support throughout your loan journey.",
    privacy: "Privacy & Security",
    privacyDescription: "Your financial information is securely encrypted and never shared with third parties without your explicit consent. We adhere to the highest standards of data protection to ensure your personal and financial information remains confidential.",
    // Feature titles
    loanEligibility: "Loan Eligibility",
    rateComparison: "Rate Comparison",
    applicationGuidance: "Application Guidance",
    financialAnalysis: "Financial Analysis",
    financialEducation: "Financial Education",
    // Feature descriptions
    loanEligibilityDesc: "Check if you qualify for loans based on your financial profile.",
    rateComparisonDesc: "Compare interest rates and find the best loan terms for your needs.",
    applicationGuidanceDesc: "Step-by-step assistance through the loan application process.",
    financialAnalysisDesc: "Get insights into how loans affect your overall financial health.",
    financialEducationDesc: "Learn about loan types, terms, and financial best practices."
  },
  es: {
    appName: "PréstamoGenio",
    heroTitle: "Tu Asistente Inteligente de Préstamos",
    heroSubtitle: "Explora opciones de préstamos, verifica tu elegibilidad y obtén orientación financiera en tu idioma, todo en una conversación fluida.",
    startConversation: "Iniciar Conversación",
    learnMore: "Más Información",
    multilingual: "Asesor Financiero Multilingüe",
    conversation: "Conversación",
    about: "Acerca de",
    aboutTitle: "Asesor de Préstamos Multilingüe",
    aboutDescription: "Tu asistente financiero impulsado por IA que te ayuda a navegar por el complejo mundo de los préstamos y opciones de financiamiento. Obtén orientación personalizada, verifica tu elegibilidad y recibe apoyo paso a paso durante tu proceso de préstamo.",
    privacy: "Privacidad y Seguridad",
    privacyDescription: "Tu información financiera está encriptada de forma segura y nunca se comparte con terceros sin tu consentimiento explícito. Nos adherimos a los más altos estándares de protección de datos para garantizar que tu información personal y financiera permanezca confidencial.",
    // Feature titles
    loanEligibility: "Elegibilidad para Préstamos",
    rateComparison: "Comparación de Tasas",
    applicationGuidance: "Guía de Solicitud",
    financialAnalysis: "Análisis Financiero",
    financialEducation: "Educación Financiera",
    // Feature descriptions
    loanEligibilityDesc: "Verifica si calificas para préstamos según tu perfil financiero.",
    rateComparisonDesc: "Compara tasas de interés y encuentra los mejores términos de préstamo para tus necesidades.",
    applicationGuidanceDesc: "Asistencia paso a paso durante el proceso de solicitud de préstamo.",
    financialAnalysisDesc: "Obtén información sobre cómo los préstamos afectan tu salud financiera general.",
    financialEducationDesc: "Aprende sobre tipos de préstamos, términos y mejores prácticas financieras."
  },
  fr: {
    appName: "GéniePrêt",
    heroTitle: "Votre Assistant Intelligent de Prêt",
    heroSubtitle: "Explorez les options de prêt, vérifiez votre éligibilité et obtenez des conseils financiers dans votre langue—le tout dans une conversation fluide.",
    startConversation: "Démarrer la Conversation",
    learnMore: "En Savoir Plus",
    multilingual: "Conseiller Financier Multilingue",
    conversation: "Conversation",
    about: "À Propos",
    aboutTitle: "Conseiller de Prêt Multilingue",
    aboutDescription: "Votre assistant financier propulsé par l'IA qui vous aide à naviguer dans le monde complexe des prêts et des options de financement. Obtenez des conseils personnalisés, vérifiez votre éligibilité et recevez un soutien étape par étape tout au long de votre parcours de prêt.",
    privacy: "Confidentialité et Sécurité",
    privacyDescription: "Vos informations financières sont cryptées en toute sécurité et ne sont jamais partagées avec des tiers sans votre consentement explicite. Nous adhérons aux normes les plus élevées de protection des données pour garantir que vos informations personnelles et financières restent confidentielles.",
    // Feature titles
    loanEligibility: "Éligibilité au Prêt",
    rateComparison: "Comparaison des Taux",
    applicationGuidance: "Conseils pour la Demande",
    financialAnalysis: "Analyse Financière",
    financialEducation: "Éducation Financière",
    // Feature descriptions
    loanEligibilityDesc: "Vérifiez si vous êtes éligible aux prêts en fonction de votre profil financier.",
    rateComparisonDesc: "Comparez les taux d'intérêt et trouvez les meilleures conditions de prêt pour vos besoins.",
    applicationGuidanceDesc: "Assistance pas à pas dans le processus de demande de prêt.",
    financialAnalysisDesc: "Obtenez des informations sur l'impact des prêts sur votre santé financière globale.",
    financialEducationDesc: "Renseignez-vous sur les types de prêts, les conditions et les meilleures pratiques financières."
  },
  de: {
    appName: "DarlehensGenie",
    heroTitle: "Ihr Intelligenter Darlehensassistent",
    heroSubtitle: "Erkunden Sie Darlehensoptionen, prüfen Sie Ihre Berechtigung und erhalten Sie finanzielle Beratung in Ihrer Sprache — alles in einem nahtlosen Gespräch.",
    startConversation: "Gespräch starten",
    learnMore: "Mehr erfahren",
    multilingual: "Mehrsprachiger Finanzberater",
    conversation: "Gespräch",
    about: "Über uns",
    aboutTitle: "Mehrsprachiger Darlehensberater",
    aboutDescription: "Ihr KI-gesteuerter Finanzassistent, der Ihnen hilft, sich in der komplexen Welt der Darlehen und Finanzierungsoptionen zurechtzufinden. Erhalten Sie personalisierte Beratung, prüfen Sie Ihre Berechtigung und erhalten Sie schrittweise Unterstützung während Ihrer Darlehensreise.",
    privacy: "Datenschutz & Sicherheit",
    privacyDescription: "Ihre Finanzdaten werden sicher verschlüsselt und niemals ohne Ihre ausdrückliche Zustimmung an Dritte weitergegeben. Wir halten uns an die höchsten Standards des Datenschutzes, um sicherzustellen, dass Ihre persönlichen und finanziellen Informationen vertraulich bleiben.",
    // Feature titles
    loanEligibility: "Darlehensberechtigung",
    rateComparison: "Zinsvergleich",
    applicationGuidance: "Antragsberatung",
    financialAnalysis: "Finanzanalyse",
    financialEducation: "Finanzbildung",
    // Feature descriptions
    loanEligibilityDesc: "Prüfen Sie, ob Sie basierend auf Ihrem Finanzprofil für Darlehen in Frage kommen.",
    rateComparisonDesc: "Vergleichen Sie Zinssätze und finden Sie die besten Darlehensbedingungen für Ihre Bedürfnisse.",
    applicationGuidanceDesc: "Schritt-für-Schritt-Hilfe durch den Darlehensantragsprozess.",
    financialAnalysisDesc: "Erhalten Sie Einblicke, wie sich Darlehen auf Ihre allgemeine finanzielle Gesundheit auswirken.",
    financialEducationDesc: "Informieren Sie sich über Darlehensarten, Bedingungen und finanzielle Best Practices."
  },
  // For simplicity, I'll add basic translations for the other languages
  zh: {
    appName: "贷款精灵",
    heroTitle: "您的智能贷款助手",
    heroSubtitle: "探索贷款选项，检查资格，并以您的语言获取财务指导 — 全部在一次流畅的对话中。",
    startConversation: "开始对话",
    learnMore: "了解更多",
    multilingual: "多语言财务顾问",
    conversation: "对话",
    about: "关于",
    aboutTitle: "多语言贷款顾问",
    aboutDescription: "您的AI驱动的财务助手，帮助您导航复杂的贷款和融资选择世界。获取个性化指导，检查您的资格，并在贷款旅程中获得一步一步的支持。",
    privacy: "隐私与安全",
    privacyDescription: "您的财务信息被安全加密，未经您明确同意，绝不会与第三方共享。我们坚持最高标准的数据保护，确保您的个人和财务信息保持机密。",
    // Feature titles
    loanEligibility: "贷款资格",
    rateComparison: "利率比较",
    applicationGuidance: "申请指导",
    financialAnalysis: "财务分析",
    financialEducation: "金融教育",
    // Feature descriptions
    loanEligibilityDesc: "根据您的财务状况检查您是否有资格获得贷款。",
    rateComparisonDesc: "比较利率并找到最适合您需求的贷款条件。",
    applicationGuidanceDesc: "贷款申请过程中的逐步指导。",
    financialAnalysisDesc: "了解贷款如何影响您的整体财务健康。",
    financialEducationDesc: "了解贷款类型、条款和财务最佳实践。"
  },
  hi: {
    appName: "लोनजीनियस",
    heroTitle: "आपका बुद्धिमान ऋण सहायक",
    heroSubtitle: "ऋण विकल्पों का पता लगाएं, पात्रता की जांच करें, और अपनी भाषा में वित्तीय मार्गदर्शन प्राप्त करें — सब एक सहज वार्तालाप में।",
    startConversation: "वार्तालाप प्रारंभ करें",
    learnMore: "अधिक जानें",
    multilingual: "बहुभाषी वित्तीय सलाहकार",
    conversation: "वार्तालाप",
    about: "परिचय",
    aboutTitle: "बहुभाषी ऋण सलाहकार",
    aboutDescription: "आपका AI-संचालित वित्तीय सहायक जो आपको ऋण और वित्तपोषण विकल्पों की जटिल दुनिया में नेविगेट करने में मदद करता है। व्यक्तिगत मार्गदर्शन प्राप्त करें, अपनी पात्रता की जांच करें, और अपनी ऋण यात्रा के दौरान चरण-दर-चरण सहायता प्राप्त करें।",
    privacy: "गोपनीयता और सुरक्षा",
    privacyDescription: "आपकी वित्तीय जानकारी सुरक्षित रूप से एन्क्रिप्टेड है और आपकी स्पष्ट सहमति के बिना कभी भी तीसरे पक्ष के साथ साझा नहीं की जाती है। हम डेटा सुरक्षा के उच्चतम मानकों का पालन करते हैं ताकि आपकी व्यक्तिगत और वित्तीय जानकारी गोपनीय रहे।",
    // Feature titles
    loanEligibility: "ऋण पात्रता",
    rateComparison: "दर तुलना",
    applicationGuidance: "आवेदन मार्गदर्शन",
    financialAnalysis: "वित्तीय विश्लेषण",
    financialEducation: "वित्तीय शिक्षा",
    // Feature descriptions
    loanEligibilityDesc: "अपने वित्तीय प्रोफ़ाइल के आधार पर जांचें कि क्या आप ऋण के लिए योग्य हैं।",
    rateComparisonDesc: "ब्याज दरों की तुलना करें और अपनी आवश्यकताओं के लिए सर्वोत्तम ऋण शर्तें खोजें।",
    applicationGuidanceDesc: "ऋण आवेदन प्रक्रिया के माध्यम से कदम-दर-कदम सहायता।",
    financialAnalysisDesc: "समझें कि ऋण आपके समग्र वित्तीय स्वास्थ्य को कैसे प्रभावित करते हैं।",
    financialEducationDesc: "ऋण प्रकार, शर्तों और वित्तीय सर्वोत्तम प्रथाओं के बारे में जानें।"
  },
  ja: {
    appName: "ローンジーニアス",
    heroTitle: "あなたのインテリジェントローンアシスタント",
    heroSubtitle: "ローンオプションを探索し、資格を確認し、あなたの言語で財務ガイダンスを取得 — すべてがシームレスな会話で。",
    startConversation: "会話を始める",
    learnMore: "詳細を見る",
    multilingual: "多言語金融アドバイザー",
    conversation: "会話",
    about: "概要",
    aboutTitle: "多言語ローンアドバイザー",
    aboutDescription: "あなたのAI駆動の金融アシスタントが、ローンや融資オプションの複雑な世界をナビゲートするのを手伝います。パーソナライズされたガイダンスを受け、あなたの資格を確認し、ローンの旅を通じてステップバイステップのサポートを受けましょう。",
    privacy: "プライバシーとセキュリティ",
    privacyDescription: "あなたの金融情報は安全に暗号化され、あなたの明示的な同意なしに第三者と共有されることはありません。私たちは、あなたの個人情報と金融情報が機密に保たれるよう、データ保護の最高基準を遵守しています。",
    // Feature titles
    loanEligibility: "ローン資格",
    rateComparison: "金利比較",
    applicationGuidance: "申請ガイダンス",
    financialAnalysis: "財務分析",
    financialEducation: "金融教育",
    // Feature descriptions
    loanEligibilityDesc: "あなたの財務プロファイルに基づいてローンの資格があるかどうかを確認します。",
    rateComparisonDesc: "金利を比較し、あなたのニーズに最適なローン条件を見つけます。",
    applicationGuidanceDesc: "ローン申請プロセスを通じてステップバイステップのサポート。",
    financialAnalysisDesc: "ローンがあなたの全体的な財務健全性にどのように影響するかについての洞察を得ます。",
    financialEducationDesc: "ローンの種類、条件、財務のベストプラクティスについて学びます。"
  },
  ar: {
    appName: "عبقري القروض",
    heroTitle: "مساعدك الذكي للقروض",
    heroSubtitle: "استكشف خيارات القروض، وتحقق من الأهلية، واحصل على إرشادات مالية بلغتك — كل ذلك في محادثة سلسة واحدة.",
    startConversation: "بدء المحادثة",
    learnMore: "معرفة المزيد",
    multilingual: "مستشار مالي متعدد اللغات",
    conversation: "محادثة",
    about: "حول",
    aboutTitle: "مستشار القروض متعدد اللغات",
    aboutDescription: "مساعدك المالي المدعوم بالذكاء الاصطناعي الذي يساعدك على التنقل في عالم القروض وخيارات التمويل المعقد. احصل على إرشادات مخصصة، وتحقق من أهليتك، واحصل على دعم خطوة بخطوة طوال رحلة القرض الخاصة بك.",
    privacy: "الخصوصية والأمان",
    privacyDescription: "يتم تشفير معلوماتك المالية بشكل آمن ولا يتم مشاركتها أبدًا مع أطراف ثالثة دون موافقتك الصريحة. نحن نلتزم بأعلى معايير حماية البيانات لضمان بقاء معلوماتك الشخصية والمالية سرية.",
    // Feature titles
    loanEligibility: "أهلية القرض",
    rateComparison: "مقارنة الأسعار",
    applicationGuidance: "إرشادات التطبيق",
    financialAnalysis: "التحليل المالي",
    financialEducation: "التعليم المالي",
    // Feature descriptions
    loanEligibilityDesc: "تحقق مما إذا كنت مؤهلاً للحصول على قروض بناءً على ملفك المالي.",
    rateComparisonDesc: "قارن أسعار الفائدة واعثر على أفضل شروط القرض لاحتياجاتك.",
    applicationGuidanceDesc: "مساعدة خطوة بخطوة من خلال عملية تقديم طلب القرض.",
    financialAnalysisDesc: "احصل على رؤى حول كيفية تأثير القروض على صحتك المالية العامة.",
    financialEducationDesc: "تعرف على أنواع القروض والشروط وأفضل الممارسات المالية."
  },
  'en-IN': {
    // Same as English but with Indian context
    appName: "LoanGenius India",
    heroTitle: "Your Intelligent Loan Assistant for India",
    heroSubtitle: "Explore loan options, check eligibility, and get financial guidance in your language—all in one seamless conversation.",
    startConversation: "Start Conversation",
    learnMore: "Learn More",
    multilingual: "Multilingual Financial Advisor",
    conversation: "Conversation",
    about: "About",
    aboutTitle: "Multilingual Loan Advisor",
    aboutDescription: "Your AI-powered financial assistant that helps you navigate the complex world of loans and financing options in India. Get personalized guidance, check your eligibility, and receive step-by-step support throughout your loan journey.",
    privacy: "Privacy & Security",
    privacyDescription: "Your financial information is securely encrypted and never shared with third parties without your explicit consent. We adhere to the highest standards of data protection to ensure your personal and financial information remains confidential.",
    // Feature titles
    loanEligibility: "Loan Eligibility",
    rateComparison: "Rate Comparison",
    applicationGuidance: "Application Guidance",
    financialAnalysis: "Financial Analysis",
    financialEducation: "Financial Education",
    // Feature descriptions
    loanEligibilityDesc: "Check if you qualify for loans based on your financial profile in India.",
    rateComparisonDesc: "Compare interest rates and find the best loan terms for your needs in the Indian market.",
    applicationGuidanceDesc: "Step-by-step assistance through the loan application process.",
    financialAnalysisDesc: "Get insights into how loans affect your overall financial health.",
    financialEducationDesc: "Learn about loan types, terms, and financial best practices in India."
  },
  'bn-IN': {
    appName: "লোনজিনিয়াস",
    heroTitle: "আপনার বুদ্ধিমান ঋণ সহকারী",
    heroSubtitle: "ঋণের বিকল্পগুলি অন্বেষণ করুন, যোগ্যতা যাচাই করুন এবং আপনার ভাষায় আর্থিক নির্দেশনা পান — সবই এক সহজ কথোপকথনে।",
    startConversation: "কথোপকথন শুরু করুন",
    learnMore: "আরও জানুন",
    multilingual: "বহুভাষী আর্থিক পরামর্শদাতা",
    conversation: "কথোপকথন",
    about: "সম্পর্কে",
    aboutTitle: "বহুভাষী ঋণ পরামর্শদাতা",
    aboutDescription: "আপনার AI-পাওয়ার্ড আর্থিক সহকারী যা আপনাকে ঋণ এবং অর্থায়ন বিকল্পের জটিল বিশ্বে নেভিগেট করতে সাহায্য করে। ব্যক্তিগতকৃত নির্দেশনা পান, আপনার যোগ্যতা যাচাই করুন এবং আপনার ঋণ যাত্রার সময় ধাপে ধাপে সহায়তা পান।",
    privacy: "গোপনীয়তা এবং নিরাপত্তা",
    privacyDescription: "আপনার আর্থিক তথ্য নিরাপদে এনক্রিপ্ট করা আছে এবং আপনার স্পষ্ট সম্মতি ছাড়া কখনই তৃতীয় পক্ষের সাথে শেয়ার করা হয় না। আপনার ব্যক্তিগত এবং আর্থিক তথ্য গোপনীয় থাকে তা নিশ্চিত করতে আমরা ডেটা সুরক্ষার সর্বোচ্চ মান মেনে চলি।",
    loanEligibility: "ঋণের যোগ্যতা",
    rateComparison: "হার তুলনা",
    applicationGuidance: "আবেদন নির্দেশিকা",
    financialAnalysis: "আর্থিক বিশ্লেষণ",
    financialEducation: "আর্থিক শিক্ষা",
    loanEligibilityDesc: "আপনার আর্থিক প্রোফাইলের উপর ভিত্তি করে আপনি ঋণের জন্য যোগ্য কিনা তা যাচাই করুন।",
    rateComparisonDesc: "সুদের হার তুলনা করুন এবং আপনার প্রয়োজনের জন্য সেরা ঋণের শর্তাবলী খুঁজুন।",
    applicationGuidanceDesc: "ঋণ আবেদন প্রক্রিয়ার মাধ্যমে ধাপে ধাপে সহায়তা।",
    financialAnalysisDesc: "ঋণ আপনার সামগ্রিক আর্থিক স্বাস্থ্যকে কীভাবে প্রভাবিত করে সে সম্পর্কে অন্তর্দৃষ্টি পান।",
    financialEducationDesc: "ঋণের প্রকার, শর্তাবলী এবং আর্থিক সেরা অনুশীলন সম্পর্কে জানুন।"
  },
  // Basic translations for other Indian languages (for demonstration - in a real app, you'd have complete translations)
  'gu-IN': {
    appName: "લોનજીનિયસ",
    heroTitle: "તમારા બુદ્ધિશાળી લોન સહાયક",
    // ... add more translations as needed
  },
  'kn-IN': {
    appName: "ಲೋನ್ಜೀನಿಯಸ್",
    heroTitle: "ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ಸಾಲ ಸಹಾಯಕ",
    // ... add more translations as needed
  },
  'ml-IN': {
    appName: "ലോൺജീനിയസ്",
    heroTitle: "നിങ്ങളുടെ ബുദ്ധിമാനായ വായ്പാ സഹായി",
    // ... add more translations as needed
  },
  'mr-IN': {
    appName: "लोनजीनियस",
    heroTitle: "तुमचा बुद्धिमान कर्ज सहाय्यक",
    // ... add more translations as needed
  },
  'od-IN': {
    appName: "ଲୋନଜିନିୟସ୍",
    heroTitle: "ଆପଣଙ୍କର ବୁଦ୍ଧିମାନ ଋଣ ସହାୟକ",
    // ... add more translations as needed
  },
  'pa-IN': {
    appName: "ਲੋਨਜੀਨੀਅਸ",
    heroTitle: "ਤੁਹਾਡਾ ਬੁੱਧੀਮਾਨ ਕਰਜ਼ਾ ਸਹਾਇਕ",
    // ... add more translations as needed
  },
  'ta-IN': {
    appName: "லோன்ஜீனியஸ்",
    heroTitle: "உங்கள் அறிவார்ந்த கடன் உதவியாளர்",
    // ... add more translations as needed
  },
  'te-IN': {
    appName: "లోన్జీనియస్",
    heroTitle: "మీ తెలివైన రుణ సహాయకుడు",
    // ... add more translations as needed
  }
};

type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? JSON.parse(savedLanguage) : languages[0];
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('language', JSON.stringify(language));
  }, [language]);

  // Function to get translated text
  const t = (key: string): string => {
    const currentTranslations = translations[language.code as keyof typeof translations] || translations.en;
    return (currentTranslations as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
