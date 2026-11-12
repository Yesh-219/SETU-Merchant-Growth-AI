import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { ChatMessage } from '../../components/advisor/ChatMessage';
import { ChatInput } from '../../components/advisor/ChatInput';
import { PromptSuggestions } from '../../components/advisor/PromptSuggestions';
import { Card } from '../../components/common/Card';
import { advisorService } from '../../services/advisorService';
import { ChatMessage as ChatMessageType } from '../../types/models';
import { Bot, RefreshCw } from 'lucide-react';

const initialMessages: ChatMessageType[] = [
  {
    id: 'msg-001',
    role: 'assistant',
    content:
      'Namaste Ramesh ji! I am SETU, your merchant growth copilot. I analyze your sales patterns, inventory stockouts, and daily cash flow to give you actionable advice for Lakshmi Provision Store.\n\nHow can I help your business today?',
    timestamp: new Date().toISOString(),
    suggestedActions: [
      'Check Low Stock Items',
      'Today\'s Sales Summary',
      'Next Supplier Due Date',
    ],
  },
];

export const AdvisorPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessageType = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await advisorService.sendMessage(text);
      const assistantMsg: ChatMessageType = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toISOString(),
        suggestedActions: response.suggestedActions,
        insights: response.insights,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessageType = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content:
          'Based on your sales data: You have 3 critical low-stock items (Fortune Sunflower Oil, Toor Dal, and Aashirvaad Atta). Reorder Toor Dal today to avoid losing approximately ₹1,850 in weekend revenue.',
        timestamp: new Date().toISOString(),
        suggestedActions: ['View Inventory Table', 'Draft Supplier Order'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Conversational AI Business Advisor"
        description="Natural-language business insights powered by Sarvam AI & Paytm transaction history."
        actions={
          <button
            onClick={handleResetConversation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Chat
          </button>
        }
      />

      {/* Chat Container */}
      <Card className="flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onActionClick={(action) => handleSendMessage(action)}
            />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2.5 text-xs text-slate-400 p-2">
              <Bot className="w-4 h-4 animate-bounce text-paytm-cyan" />
              <span>SETU is analyzing your business metrics...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="pt-3 border-t border-slate-100 mb-3">
          <PromptSuggestions onSelectPrompt={(prompt) => handleSendMessage(prompt)} />
        </div>

        {/* Input Form */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </Card>
    </div>
  );
};

export default AdvisorPage;

