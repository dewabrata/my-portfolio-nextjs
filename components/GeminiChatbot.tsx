'use client';

import React, { useState } from 'react';
import { nanoid } from 'nanoid'; // Untuk menghasilkan ID unik untuk pesan

interface ChatMessageType {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function GeminiChatbot() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessageType = { id: nanoid(), role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: ChatMessageType = { id: nanoid(), role: 'assistant', content: data.content };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error: unknown) { // Menambahkan tipe 'unknown' untuk error
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: nanoid(), role: 'system', content: `Error: ${error instanceof Error ? error.message : String(error)}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-[500px]"> {/* Tambahkan tinggi dan posisi relatif */}
      <div className="flex-1 overflow-y-auto p-4 mb-12 border border-gray-300 rounded shadow-xl bg-white text-black"> {/* Kontainer untuk pesan */}
        {messages.length > 0 ? (
          messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap my-2">
              <span className="font-bold">{m.role === 'user' ? 'User: ' : m.role === 'assistant' ? 'AI: ' : 'System: '}</span>
              {m.content}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Mulai percakapan dengan Gemini AI!</div>
        )}
        {isLoading && (
          <div className="text-center text-gray-500 my-2">AI sedang mengetik...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full"> {/* Posisi form di bagian bawah */}
        <input
          className="w-full p-2 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
