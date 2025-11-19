import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hola, soy el asistente virtual del Prof. Tisera. ¿Tienes dudas sobre la Audiovisión o el diseño sonoro?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Obtenemos la clave inyectada por Vite
      // @ts-ignore
      const apiKey = process.env.API_KEY;

      if (!apiKey) {
        throw new Error("La clave API no está configurada. Por favor revisa la configuración en Netlify.");
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: `Eres el asistente virtual del Profesor Miguelangel Tisera, experto en Realización Audiovisual y Sonido.
          Tu objetivo es enseñar sobre "La Audiovisión" de Michel Chion y el diseño sonoro en el cine.
          
          Temas clave que dominas:
          - Valor Añadido (Sonido enriqueciendo imagen).
          - Síncresis (Soldadura sonora).
          - Los 3 tipos de escucha (Causal, Semántica, Reducida).
          - Diegético vs Extradiegético vs Acusmático (Fuera de campo).
          - Música Empática vs Anempática.
          
          Estilo de respuesta:
          - Sé didáctico, breve y entusiasta.
          - Usa ejemplos de películas famosas.
          - Si te preguntan algo fuera del tema cine/sonido, redirige amablemente al tema.
          - Mantén un tono académico pero accesible.
          `,
        },
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Lo siento, no pude procesar la respuesta." }]);

    } catch (error: any) {
      console.error("Error AI:", error);
      setMessages(prev => [...prev, { role: 'model', text: `Error de conexión: ${error.message || 'Inténtalo de nuevo más tarde.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-[350px] h-[500px] bg-[#16213e] rounded-2xl shadow-2xl border border-[#e94560]/50 flex flex-col overflow-hidden animate-fade-in-up backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#e94560] to-[#0f3460] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-300" />
              <h3 className="font-bold text-white">Tutor Virtual</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#e94560] text-white rounded-tr-none' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/10'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-2 items-center">
                  <Loader2 size={16} className="animate-spin text-[#e94560]" />
                  <span className="text-xs text-gray-400">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#1a1a2e] border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pregunta sobre sonido..."
                className="w-full bg-black/30 text-white border border-white/10 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-[#e94560] text-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className="absolute right-2 p-1.5 bg-[#e94560] rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff2e63] transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-[0_0_20px_rgba(233,69,96,0.4)] transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20 ${
          isOpen ? 'bg-gray-700 rotate-90' : 'bg-gradient-to-r from-[#e94560] to-purple-600 animate-pulse-glow'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

export default AiTutor;