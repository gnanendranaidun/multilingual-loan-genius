
import { useToast } from '@/components/ui/use-toast';
import responses from '@/data/mockResponses';
import type { LanguageResponses } from '@/data/mockResponses';

// API endpoint for the chat
const API_ENDPOINT = 'https://eab2-103-246-194-81.ngrok-free.app/ask';

// Function to send text to the API
export const sendTextToAPI = async (text: string, languageCode: string, showToast: ReturnType<typeof useToast>['toast']): Promise<string> => {
  try {
    console.log(`Sending text to API: ${text}`);
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: text }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send text to API: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', data);
    
    // Return the response content or fall back to mock responses
    if (data && typeof data === 'string') {
      return data;
    } else if (data && data.answer) {
      return data.answer;
    } else {
      // Fallback to mock responses if API fails to return properly formatted data
      return getFallbackResponse(text, languageCode);
    }
  } catch (error) {
    console.error('Error sending text to API:', error);
    showToast({
      variant: "destructive",
      title: "API Error",
      description: "Failed to connect to the chat service. Using fallback responses.",
    });
    
    // Fallback to mock responses on error
    return getFallbackResponse(text, languageCode);
  }
};

// Function to send audio to the API
export const sendAudioToAPI = async (
  audioBlob: Blob, 
  languageCode: string, 
  showToast: ReturnType<typeof useToast>['toast'], 
  textApi: (text: string) => Promise<string>
): Promise<string> => {
  try {
    console.log('Sending audio to API...');
    
    // Create a FormData object to send the audio file
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    
    // For now, we'll simulate conversion to text and then use the text API
    showToast({
      title: "Audio processing",
      description: "Converting speech to text...",
    });
    
    // Simulate speech-to-text conversion
    const simulatedText = getSimulatedTextForLanguage(languageCode);
    
    // Now send the simulated text to the API
    const response = await textApi(simulatedText);
    
    showToast({
      title: "Audio processed",
      description: "Your voice recording has been processed successfully.",
    });
    
    return response;
    
  } catch (error) {
    console.error('Error sending audio to API:', error);
    showToast({
      variant: "destructive",
      title: "Error",
      description: "Failed to process your voice recording. Please try again.",
    });
    
    // Fallback to default response in the current language
    return getFallbackResponse("", languageCode);
  }
};

// Helper function to get simulated text based on language
const getSimulatedTextForLanguage = (languageCode: string): string => {
  let simulatedText = "Can you tell me about personal loans?";
  
  switch (languageCode) {
    case 'es':
      simulatedText = "¿Puedes contarme sobre préstamos personales?";
      break;
    case 'fr':
      simulatedText = "Pouvez-vous me parler des prêts personnels?";
      break;
    case 'de':
      simulatedText = "Können Sie mir etwas über Privatkredite erzählen?";
      break;
    case 'zh':
      simulatedText = "您能告诉我关于个人贷款的信息吗？";
      break;
    case 'hi':
      simulatedText = "क्या आप मुझे व्यक्तिगत ऋण के बारे में बता सकते हैं?";
      break;
    case 'ja':
      simulatedText = "個人ローンについて教えていただけますか？";
      break;
    case 'ar':
      simulatedText = "هل يمكنك إخباري عن القروض الشخصية؟";
      break;
    default:
      if (languageCode.includes('IN')) {
        simulatedText = "Can you tell me about personal loans in India?";
        
        if (languageCode === 'hi-IN') {
          simulatedText = "क्या आप मुझे भारत में व्यक्तिगत ऋण के बारे में बता सकते हैं?";
        }
      }
  }
  
  return simulatedText;
};

// Helper function to get fallback response
const getFallbackResponse = (text: string, languageCode: string): string => {
  const currentLangResponses = responses[languageCode as keyof typeof responses] || responses.en;
  
  if (!text) {
    return currentLangResponses.default;
  }
  
  const userInput = text.toLowerCase();
  let mockResponse = currentLangResponses.default;
  
  Object.keys(currentLangResponses).forEach((keyword) => {
    if (userInput.includes(keyword)) {
      mockResponse = currentLangResponses[keyword as keyof LanguageResponses];
    }
  });
  
  console.log('Falling back to mock response');
  return mockResponse;
};
