"use client";

import  { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Menu, SendHorizontal } from 'lucide-react';
import type { Message } from '@/lib/types/chatbot';
import { useChat } from '../hooks/useChat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from 'use-intl';

export default function SmartCoachChat() {
    // translation
    const t =useTranslations('chatbot');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'أهلاً بك! أنا مدربك الذكي 🤖.. كيف يمكنني مساعدتك في رحلتك الرياضية اليوم؟',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const { processMessage, loading } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput(''); // Clear input immediately for better UX

    // 1. Add User Message
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);

    // 2. Get AI Response from our Hook
    const botReply = await processMessage(userMessage);

    // 3. Add Bot Response
    setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
  };

  return (
    <div
      className="relative mx-auto flex h-150 w-full max-w-md flex-col overflow-hidden border border-zinc-800 rounded-3xl bg-black text-white shadow-2xl"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/assets/images/bot-background.png')",
        backgroundSize: 'cover',
      }}
    >
      {/* --- Header --- */}
      <header className="flex items-center justify-between p-6 bg-zinc-900/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          <h1 className="text-xl font-bold tracking-tight">{t('title')}</h1>
        </div>
        <Menu className="h-6 w-6 cursor-pointer text-orange-600 hover:text-orange-400 transition-colors" />
      </header>

      {/* --- Chat Area --- */}
      <ScrollArea className="flex-1 p-4 h-full">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar className="h-9 w-9 border border-orange-600/50">
                {msg.sender === 'bot' ? (
                  <AvatarImage src="/assets/images/ai-avatar.png" />
                ) : (
                  <AvatarImage src="/user-icon.png" />
                )}
                <AvatarFallback className="bg-orange-900 text-xs">
                  {msg.sender === 'bot' ? 'AI' : 'ME'}
                </AvatarFallback>
              </Avatar>

              <div
                dir="auto" // Detects Arabic/English automatically
                className={`max-w-[80%] whitespace-pre-line rounded-2xl p-3 text-sm leading-relaxed shadow-lg ${
                  msg.sender === 'bot'
                    ? 'rounded-tl-none bg-zinc-900/90 border border-white/5 text-zinc-200'
                    : 'rounded-tr-none bg-orange-700 text-white font-medium'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-zinc-500 text-xs italic ml-12">
              <span className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.2s]">.</span>
                <span className="animate-bounce [animation-delay:0.4s]">.</span>
              </span>
              المدرب يفكر الآن
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* --- Input Area --- */}
      <footer className="p-6 ">
        <div className="relative group">
          <Pencil className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-orange-600 group-focus-within:text-orange-400 transition-colors" />

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('input-placeholder')}
            className="h-12 w-full bg-zinc-900/80 border-zinc-700 pl-11 pr-12 focus:border-orange-600 focus:ring-orange-600 rounded-xl text-zinc-100 placeholder:text-zinc-500"
          />

          <Button
            size="icon"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 bg-orange-600 hover:bg-orange-500 rounded-lg transition-all"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-center mt-4 text-zinc-600 uppercase tracking-widest">
          Powered by Fitness API
        </p>
      </footer>
    </div>
  );
}