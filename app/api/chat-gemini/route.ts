import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();
  console.log("Received messages:", messages); // Log pesan yang diterima

  // Inisialisasi Google Generative AI dengan kunci API Anda
  // Pastikan GOOGLE_API_KEY diatur di file .env Anda
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Anda bisa mengganti dengan 'gemini-1.5-pro' jika diperlukan

  const chat = model.startChat({
    history: messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      maxOutputTokens: 200, // Sesuaikan jika diperlukan
    },
  });

  const result = await chat.sendMessage(messages[messages.length - 1].content);
  const fullResponse = result.response.text();

  console.log("Gemini API final response:", fullResponse); // Log respons lengkap dari Gemini

  return new Response(JSON.stringify({ role: 'assistant', content: fullResponse }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
