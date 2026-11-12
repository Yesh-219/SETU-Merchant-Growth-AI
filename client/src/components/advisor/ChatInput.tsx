import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SETU: 'How are my sales this week?', 'Which items should I reorder?'..."
          className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-paytm-cyan focus:border-transparent shadow-sm"
          disabled={isLoading}
        />
        <Sparkles className="w-4 h-4 text-slate-300 absolute right-3.5 top-3.5 pointer-events-none" />
      </div>
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={!input.trim()}
        className="px-5 py-3 rounded-xl"
        rightIcon={<Send className="w-4 h-4" />}
      >
        Send
      </Button>
    </form>
  );
};

