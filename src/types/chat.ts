
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
