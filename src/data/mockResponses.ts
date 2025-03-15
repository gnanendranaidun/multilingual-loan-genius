
// Mock responses for development fallback
const responses = {
  en: {
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
  },
  es: {
    'loan': "Puedo ayudarte a encontrar el préstamo adecuado. ¿Qué tipo de préstamo te interesa? ¿Personal, hipotecario, de auto, educativo o empresarial?",
    'eligibility': "Para verificar tu elegibilidad para un préstamo, necesitaré información sobre tus finanzas. ¿Cuáles son tus ingresos anuales, puntaje crediticio y duración de empleo?",
    'credit': "Tu puntaje crediticio es un factor importante para la aprobación del préstamo. Un puntaje más alto puede calificarte para mejores tasas de interés. ¿Te gustaría consejos para mejorar tu puntaje crediticio?",
    'interest': "Las tasas de interés varían según el tipo de préstamo, tu puntaje crediticio, ingresos y condiciones del mercado. Para tarifas específicas, necesitaré más detalles sobre tu situación financiera.",
    'personal loan': "Los préstamos personales pueden usarse para diversos propósitos como consolidación de deudas o compras importantes. Generalmente tienen plazos de 1-7 años con tasas de interés fijas.",
    'home loan': "Los préstamos hipotecarios ayudan a financiar compras de propiedades. Normalmente tienen plazos más largos (15-30 años) y requieren un pago inicial. Avísame si deseas verificar tu elegibilidad.",
    'auto loan': "Los préstamos para autos son específicamente para compras de vehículos. Típicamente tienen plazos de 3-7 años, y el vehículo sirve como garantía para el préstamo.",
    'education loan': "Los préstamos educativos ayudan a financiar costos de educación superior. A menudo tienen tasas de interés favorables y términos de pago que comienzan después de la graduación.",
    'business loan': "Los préstamos empresariales proporcionan capital para iniciar o expandir un negocio. Los requisitos y términos varían según tu plan de negocio y proyecciones financieras.",
    'default': "Soy tu asistente financiero. Puedo ayudarte con información sobre préstamos, verificaciones de elegibilidad y orientación financiera. ¿Sobre qué te gustaría saber?"
  },
  fr: {
    'loan': "Je peux vous aider à trouver le prêt adapté. Quel type de prêt vous intéresse ? Personnel, immobilier, auto, éducation ou entreprise ?",
    'eligibility': "Pour vérifier votre éligibilité au prêt, j'aurai besoin d'informations sur vos finances. Quels sont vos revenus annuels, votre cote de crédit et votre durée d'emploi ?",
    'credit': "Votre cote de crédit est un facteur important pour l'approbation du prêt. Un score plus élevé peut vous qualifier pour de meilleurs taux d'intérêt. Souhaitez-vous des conseils pour améliorer votre cote de crédit ?",
    'interest': "Les taux d'intérêt varient selon le type de prêt, votre cote de crédit, vos revenus et les conditions du marché. Pour des taux spécifiques, j'aurai besoin de plus de détails sur votre situation financière.",
    'personal loan': "Les prêts personnels peuvent être utilisés à diverses fins comme la consolidation de dettes ou les achats importants. Ils ont généralement des durées de 1 à 7 ans avec des taux d'intérêt fixes.",
    'home loan': "Les prêts immobiliers aident à financer l'achat de propriétés. Ils ont généralement des durées plus longues (15-30 ans) et nécessitent un acompte. Faites-moi savoir si vous souhaitez vérifier votre éligibilité.",
    'auto loan': "Les prêts auto sont spécifiquement destinés à l'achat de véhicules. Ils ont généralement des durées de 3 à 7 ans, et le véhicule sert de garantie pour le prêt.",
    'education loan': "Les prêts éducatifs aident à financer les coûts de l'enseignement supérieur. Ils ont souvent des taux d'intérêt favorables et des modalités de remboursement qui commencent après l'obtention du diplôme.",
    'business loan': "Les prêts aux entreprises fournissent du capital pour démarrer ou développer une entreprise. Les exigences et les conditions varient en fonction de votre plan d'affaires et de vos projections financières.",
    'default': "Je suis votre assistant financier. Je peux vous aider avec des informations sur les prêts, des vérifications d'éligibilité et des conseils financiers. Sur quoi aimeriez-vous en savoir plus ?"
  },
  de: {
    'loan': "Ich kann Ihnen helfen, das richtige Darlehen zu finden. An welcher Art von Darlehen sind Sie interessiert? Persönlich, Haus, Auto, Bildung oder Geschäft?",
    'eligibility': "Um Ihre Darlehensberechtigung zu überprüfen, benötige ich einige Informationen zu Ihren Finanzen. Wie hoch ist Ihr Jahreseinkommen, Ihre Kreditwürdigkeit und Ihre Beschäftigungsdauer?",
    'credit': "Ihre Kreditwürdigkeit ist ein wichtiger Faktor für die Darlehensgenehmigung. Eine höhere Punktzahl kann Sie für bessere Zinssätze qualifizieren. Möchten Sie Tipps zur Verbesserung Ihrer Kreditwürdigkeit?",
    'interest': "Die Zinssätze variieren je nach Darlehensart, Ihrer Kreditwürdigkeit, Einkommen und Marktbedingungen. Für spezifische Zinssätze benötige ich weitere Details zu Ihrer finanziellen Situation.",
    'personal loan': "Persönliche Darlehen können für verschiedene Zwecke wie Schuldenkonsolidierung oder größere Anschaffungen verwendet werden. Sie haben in der Regel Laufzeiten von 1-7 Jahren mit festen Zinssätzen.",
    'home loan': "Immobiliendarlehen helfen bei der Finanzierung von Immobilienkäufen. Sie haben in der Regel längere Laufzeiten (15-30 Jahre) und erfordern eine Anzahlung. Lassen Sie mich wissen, ob Sie Ihre Berechtigung überprüfen möchten.",
    'auto loan': "Autodarlehen sind speziell für Fahrzeugkäufe. Sie haben in der Regel Laufzeiten von 3-7 Jahren, und das Fahrzeug dient als Sicherheit für das Darlehen.",
    'education loan': "Bildungsdarlehen helfen bei der Finanzierung von Hochschulkosten. Sie haben oft günstige Zinssätze und Rückzahlungsbedingungen, die nach dem Abschluss beginnen.",
    'business loan': "Geschäftsdarlehen stellen Kapital für die Gründung oder Erweiterung eines Unternehmens bereit. Die Anforderungen und Bedingungen variieren je nach Ihrem Geschäftsplan und finanziellen Prognosen.",
    'default': "Ich bin Ihr Finanzassistent. Ich kann Ihnen mit Darlehensinformationen, Berechtigungsprüfungen und finanzieller Beratung helfen. Worüber möchten Sie mehr erfahren?"
  },
  zh: {
    'loan': "我可以帮您找到合适的贷款。您对哪种贷款感兴趣？个人贷款、住房贷款、汽车贷款、教育贷款或商业贷款？",
    'eligibility': "要检查您的贷款资格，我需要一些关于您财务状况的信息。您的年收入、信用评分和就业时长是多少？",
    'credit': "您的信用评分是贷款审批的重要因素。更高的评分可能使您有资格获得更好的利率。您想要提高信用评分的建议吗？",
    'interest': "利率根据贷款类型、您的信用评分、收入和市场状况而变化。对于具体的利率，我需要更多关于您财务状况的详细信息。",
    'personal loan': "个人贷款可用于各种目的，如债务合并或大宗购买。它们通常有1-7年的期限，固定利率。",
    'home loan': "住房贷款帮助融资购买房产。它们通常有较长的期限（15-30年）并需要首付。如果您想检查您的资格，请告诉我。",
    'auto loan': "汽车贷款专门用于购买车辆。它们通常有3-7年的期限，车辆作为贷款的抵押品。",
    'education loan': "教育贷款帮助融资高等教育费用。它们通常有优惠的利率和毕业后开始的还款条件。",
    'business loan': "商业贷款为创业或扩展业务提供资金。要求和条件根据您的商业计划和财务预测而变化。",
    'default': "我是您的财务助手。我可以帮助您获取贷款信息、资格检查和财务指导。您想了解什么？"
  },
  hi: {
    'loan': "मैं आपको सही ऋण खोजने में मदद कर सकता हूं। आप किस प्रकार के ऋण में रुचि रखते हैं? व्यक्तिगत, गृह, ऑटो, शिक्षा, या व्यापार?",
    'eligibility': "आपकी ऋण पात्रता की जांच करने के लिए, मुझे आपके वित्त के बारे में कुछ जानकारी की आवश्यकता होगी। आपकी वार्षिक आय, क्रेडिट स्कोर, और रोजगार अवधि क्या है?",
    'credit': "आपका क्रेडिट स्कोर ऋण अनुमोदन के लिए एक महत्वपूर्ण कारक है। उच्च स्कोर आपको बेहतर ब्याज दरों के लिए योग्य बना सकता है। क्या आप अपने क्रेडिट स्कोर को सुधारने के लिए टिप्स चाहेंगे?",
    'interest': "ब्याज दरें ऋण प्रकार, आपके क्रेडिट स्कोर, आय, और बाजार स्थितियों के आधार पर भिन्न होती हैं। विशिष्ट दरों के लिए, मुझे आपकी वित्तीय स्थिति के बारे में अधिक विवरण की आवश्यकता होगी।",
    'personal loan': "व्यक्तिगत ऋणों का उपयोग ऋण समेकन या बड़ी खरीदारी जैसे विभिन्न उद्देश्यों के लिए किया जा सकता है। उनके पास आमतौर पर 1-7 वर्ष की अवधि के साथ निश्चित ब्याज दरें होती हैं।",
    'home loan': "गृह ऋण संपत्ति खरीद को वित्त पोषित करने में मदद करते हैं। उनके पास आमतौर पर लंबी अवधि (15-30 वर्ष) होती है और डाउन पेमेंट की आवश्यकता होती है। अगर आप अपनी पात्रता की जांच करना चाहते हैं तो मुझे बताएं।",
    'auto loan': "ऑटो ऋण विशेष रूप से वाहन खरीद के लिए हैं। उनके पास आमतौर पर 3-7 वर्ष की अवधि होती है, और वाहन ऋण के लिए संपार्श्विक के रूप में कार्य करता है।",
    'education loan': "शिक्षा ऋण उच्च शिक्षा लागत को वित्त पोषित करने में मदद करते हैं। उनके पास अक्सर अनुकूल ब्याज दरें और भुगतान शर्तें होती हैं जो स्नातक होने के बाद शुरू होती हैं।",
    'business loan': "व्यावसायिक ऋण एक व्यवसाय शुरू करने या विस्तार करने के लिए पूंजी प्रदान करते हैं। आवश्यकताएं और शर्तें आपकी व्यावसायिक योजना और वित्तीय अनुमानों के आधार पर भिन्न होती हैं।",
    'default': "मैं आपका वित्तीय सहायक हूं। मैं ऋण जानकारी, पात्रता जांच, और वित्तीय मार्गदर्शन में मदद कर सकता हूं। आप किस बारे में जानना चाहेंगे?"
  },
  ja: {
    'loan': "適切なローンを見つけるお手伝いをします。どのタイプのローンにご興味がありますか？個人、住宅、自動車、教育、またはビジネス？",
    'eligibility': "ローンの適格性を確認するには、あなたの財務状況についての情報が必要です。年収、信用スコア、雇用期間はいくらですか？",
    'credit': "信用スコアはローン承認の重要な要素です。高いスコアがあれば、より良い金利を得られる可能性があります。信用スコアを向上させるためのヒントが必要ですか？",
    'interest': "金利はローンの種類、信用スコア、収入、市場状況によって異なります。具体的な金利については、あなたの財務状況についてより詳しい情報が必要です。",
    'personal loan': "個人ローンは、債務の統合や大きな購入など、さまざまな目的に使用できます。通常、固定金利で1〜7年の期間があります。",
    'home loan': "住宅ローンは不動産購入の資金調達を支援します。通常、より長い期間（15〜30年）があり、頭金が必要です。適格性を確認したい場合は、お知らせください。",
    'auto loan': "自動車ローンは特に車両購入のためのものです。通常、3〜7年の期間があり、車両がローンの担保となります。",
    'education loan': "教育ローンは高等教育費用の資金調達を支援します。卒業後に始まる有利な金利と返済条件があることが多いです。",
    'business loan': "ビジネスローンは、ビジネスを始めたり拡大したりするための資本を提供します。要件と条件は、ビジネスプランと財務予測によって異なります。",
    'default': "私はあなたの金融アシスタントです。ローン情報、適格性チェック、財務ガイダンスでお手伝いできます。何について知りたいですか？"
  },
  ar: {
    'loan': "يمكنني مساعدتك في العثور على القرض المناسب. ما نوع القرض الذي تهتم به؟ شخصي، منزل، سيارة، تعليم، أو أعمال؟",
    'eligibility': "للتحقق من أهليتك للقرض، سأحتاج إلى بعض المعلومات حول مالياتك. ما هو دخلك السنوي، درجة الائتمان، ومدة العمل؟",
    'credit': "درجة الائتمان الخاصة بك هي عامل مهم للموافقة على القرض. قد تؤهلك الدرجة الأعلى لمعدلات فائدة أفضل. هل ترغب في نصائح لتحسين درجة الائتمان الخاصة بك؟",
    'interest': "تختلف معدلات الفائدة بناءً على نوع القرض، درجة الائتمان، الدخل، وظروف السوق. للحصول على معدلات محددة، سأحتاج إلى مزيد من التفاصيل حول وضعك المالي.",
    'personal loan': "يمكن استخدام القروض الشخصية لأغراض متنوعة مثل توحيد الديون أو المشتريات الكبيرة. عادة ما يكون لها فترات من 1-7 سنوات بمعدلات فائدة ثابتة.",
    'home loan': "تساعد قروض المنازل في تمويل شراء العقارات. عادة ما يكون لها فترات أطول (15-30 سنة) وتتطلب دفعة أولى. أخبرني إذا كنت ترغب في التحقق من أهليتك.",
    'auto loan': "قروض السيارات مخصصة تحديدًا لشراء المركبات. عادة ما يكون لها فترات من 3-7 سنوات، والمركبة تعمل كضمان للقرض.",
    'education loan': "تساعد القروض التعليمية في تمويل تكاليف التعليم العالي. غالبًا ما يكون لها معدلات فائدة مواتية وشروط سداد تبدأ بعد التخرج.",
    'business loan': "توفر قروض الأعمال رأس المال لبدء أو توسيع الأعمال. تختلف المتطلبات والشروط بناءً على خطة عملك والتوقعات المالية.",
    'default': "أنا مساعدك المالي. يمكنني المساعدة بمعلومات القرض، فحوصات الأهلية، والتوجيه المالي. ماذا تود أن تعرف؟"
  },
  'en-IN': {
    'loan': "I can help you find the right loan for your needs in India. What type of loan are you interested in? Personal, home, auto, education, or business?",
    'eligibility': "To check your loan eligibility in India, I'll need some information about your finances. What's your annual income, credit score, and employment duration?",
    'credit': "Your credit score (CIBIL score in India) is an important factor for loan approval. A higher score may qualify you for better interest rates. Would you like tips to improve your credit score?",
    'interest': "Interest rates in India vary based on loan type, your credit score, income, and market conditions. For specific rates, I'll need more details about your financial situation.",
    'personal loan': "Personal loans in India can be used for various purposes like debt consolidation or large purchases. They typically have terms of 1-5 years with interest rates between 10-20% depending on your profile.",
    'home loan': "Home loans in India help finance property purchases. They usually have longer terms (15-30 years) with interest rates between 6.5-9%. Let me know if you'd like to check your eligibility.",
    'auto loan': "Auto loans in India are specifically for vehicle purchases. They typically have terms of 3-7 years with interest rates between 7-12%, and the vehicle serves as collateral for the loan.",
    'education loan': "Education loans in India help finance higher education costs. They often have favorable interest rates (8-12%) and repayment terms that begin after graduation.",
    'business loan': "Business loans in India provide capital for starting or expanding a business. The requirements and terms vary based on your business plan and financial projections.",
    'default': "I'm your financial assistant for the Indian market. I can help with loan information, eligibility checks, and financial guidance. What would you like to know about?"
  },
  'bn-IN': {
    'default': "আমি আপনার আর্থিক সহকারী। আমি ঋণ সম্পর্কিত তথ্য, যোগ্যতা যাচাই এবং আর্থিক নির্দেশনা সহায়তা করতে পারি। আপনি কি সম্পর্কে জানতে চান?"
  },
  'gu-IN': {
    'default': "હું તમારો નાણાકીય સહાયક છું. હું લોન માહિતી, પાત્રતા તપાસ અને નાણાકીય માર્ગદર્શન સાથે મદદ કરી શકું છું. તમે શું વિશે જાણવા માંગો છો?"
  },
  'kn-IN': {
    'default': "ನಾನು ನಿಮ್ಮ ಹಣಕಾಸು ಸಹಾಯಕ. ನಾನು ಸಾಲ ಮಾಹಿತಿ, ಅರ್ಹತೆ ಪರಿಶೀಲನೆ ಮತ್ತು ಹಣಕಾಸು ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ಯಾವುದರ ಬಗ್ಗೆ ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?"
  },
  'ml-IN': {
    'default': "ഞാൻ നിങ്ങളുടെ ധനകാര്യ സഹായിയാണ്. എനിക്ക് വായ്പാ വിവരങ്ങൾ, യോഗ്യതാ പരിശോധനകൾ, ധനകാര്യ മാർഗ്ഗനിർദ്ദേശങ്ങൾ എന്നിവയിൽ സഹായിക്കാൻ കഴിയും. നിങ്ങൾക്ക് എന്തിനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹമുണ്ട്?"
  },
  'mr-IN': {
    'default': "मी तुमचा आर्थिक सहाय्यक आहे. मी कर्जाची माहिती, पात्रता तपासणी आणि आर्थिक मार्गदर्शनासह मदत करू शकतो. तुम्हाला कशाबद्दल जाणून घ्यायला आवडेल?"
  },
  'od-IN': {
    'default': "ମୁଁ ଆପଣଙ୍କର ଆର୍ଥିକ ସହାୟକ। ମୁଁ ଋଣ ସୂଚନା, ଯୋଗ୍ୟତା ଯାଞ୍ଚ, ଏବଂ ଆର୍ଥିକ ମାର୍ଗଦର୍ଶନ ସହ ସାହାଯ୍ୟ କରିପାରିବି। ଆପଣ କ'ଣ ବିଷୟରେ ଜାଣିବାକୁ ଚାହାଁନ୍ତି?"
  },
  'pa-IN': {
    'default': "ਮੈਂ ਤੁਹਾਡਾ ਵਿੱਤੀ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਲੋਨ ਜਾਣਕਾਰੀ, ਯੋਗਤਾ ਜਾਂਚ, ਅਤੇ ਵਿੱਤੀ ਮਾਰਗਦਰਸ਼ਨ ਦੇ ਨਾਲ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਕਿਸ ਬਾਰੇ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?"
  },
  'ta-IN': {
    'default': "நான் உங்கள் நிதி உதவியாளர். கடன் தகவல், தகுதி சோதனைகள், மற்றும் நிதி வழிகாட்டுதலுடன் நான் உதவ முடியும். நீங்கள் எதைப் பற்றி அறிய விரும்புகிறீர்கள்?"
  },
  'te-IN': {
    'default': "నేను మీ ఆర్థిక సహాయకుడిని. నేను రుణ సమాచారం, అర్హత తనిఖీలు మరియు ఆర్థిక మార్గదర్శకత్వంతో సహాయపడగలను. మీరు దేని గురించి తెలుసుకోవాలనుకుంటున్నారు?"
  }
};

// Define a type for language responses based on the structure of responses.en
export type LanguageResponses = typeof responses.en;

export default responses;
