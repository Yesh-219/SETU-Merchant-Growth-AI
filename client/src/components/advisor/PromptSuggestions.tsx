import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const suggestedPrompts = [
  'How are my sales performing compared to last week?',
  'Which products are about to go out of stock?',
  'What is my estimated profit margin this month?',
  'When is my next supplier invoice payment due?',
  'Suggest 3 actions to boost my grocery store footfall this weekend',
];

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-paytm-cyan" /> Suggested Merchant Prompts
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="text-left text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl transition-all"
          >
            "{prompt}"
          </button>
        ))}
      </div>
    </div>
  );
};

