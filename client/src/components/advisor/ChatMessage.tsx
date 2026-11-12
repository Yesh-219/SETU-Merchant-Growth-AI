import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/models';

interface ChatMessageProps {
  message: ChatMessageType;
  onActionClick?: (action: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onActionClick }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex gap-3 text-xs leading-relaxed ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-paytm-blue text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <Bot className="w-4 h-4 text-paytm-cyan" />
        </div>
      )}

      <div className={`max-w-[80%] space-y-2`}>
        <div
          className={`p-3.5 rounded-2xl ${
            isAssistant
              ? 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-sm'
              : 'bg-paytm-blue text-white shadow-sm rounded-tr-sm'
          }`}
        >
          <p className="whitespace-pre-line text-sm">{message.content}</p>
        </div>

        {isAssistant && message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {message.suggestedActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onActionClick && onActionClick(action)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition-colors text-[11px] font-medium"
              >
                <Sparkles className="w-3 h-3 text-paytm-cyan" />
                {action}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

