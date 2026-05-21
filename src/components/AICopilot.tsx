'use client';

import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Terminal, Sparkles, User, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState('');

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-manrope">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-[#0A0A0A] border border-card-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-card-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-coral/20 rounded-xl">
                  <Bot size={20} className="text-coral" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    Aditi's Copilot
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  </h3>
                  <p className="text-[10px] text-muted uppercase tracking-widest font-bold">Agentic Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-background rounded-full transition-colors text-muted hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-card-border"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="p-4 bg-yellow-400/10 rounded-full">
                    <Sparkles className="text-yellow-400 w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold italic">"How can I help you today?"</p>
                    <p className="text-muted text-xs mt-2">Ask me about Aditi's projects, skills, or even download her resume.</p>
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex items-start gap-3",
                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-full",
                    m.role === 'user' ? "bg-blue-500/10 text-blue-400" : "bg-coral/10 text-coral"
                  )}>
                    {m.role === 'user' ? <User size={14} /> : <Terminal size={14} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-blue-500 text-white rounded-tr-none" 
                      : "bg-card border border-card-border text-foreground rounded-tl-none"
                  )}>
                    {m.parts.map((part, index) => {
                      if (part.type === 'text') {
                        return <span key={index}>{part.text}</span>;
                      }

                      if (part.type === 'reasoning') {
                        return null;
                      }

                      if (part.type.startsWith('tool-')) {
                        const toolPart = part as any;
                        const toolName = toolPart.type.slice(5);
                        const toolCallId = toolPart.toolCallId;
                        const state = toolPart.state;

                        if (state === 'output-available') {
                          const output = toolPart.output;
                          return (
                            <div key={toolCallId} className="mt-2 p-2 bg-background/50 rounded-lg border border-card-border text-xs text-yellow-400">
                              {output.message}
                            </div>
                          );
                        }

                        return (
                          <div key={toolCallId} className="mt-2 flex items-center gap-2 text-xs text-muted italic">
                            <Loader2 size={12} className="animate-spin" />
                            Running tool: {toolName}...
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted italic text-xs">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking...
                </div>
              )}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  Error: {error.message}. Make sure your API key is set.
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-card-border">
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="w-full bg-background border border-card-border rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-coral/50 transition-all text-foreground"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-coral text-white rounded-xl hover:bg-coral/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-coral text-white rounded-full flex items-center justify-center shadow-lg hover:bg-coral/90 transition-all group"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} className="group-hover:rotate-12 transition-transform" />}
      </motion.button>
    </div>
  );
}
