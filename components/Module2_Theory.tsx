import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Music, Zap, Radio, Volume2 } from 'lucide-react';

const Module2_Theory: React.FC = () => {
  const [selectedSound, setSelectedSound] = useState<string>('none');
  
  const birdsRef = useRef<HTMLAudioElement>(null);
  const sirenRef = useRef<HTMLAudioElement>(null);

  const scenarios = {
    none: {
      mood: "Neutral",
      desc: "Un plano de una calle vacía. Información visual pura.",
      color: "border-gray-500"
    },
    birds: {
      mood: "Paz / Mañana Tranquila",
      desc: "El sonido de pájaros añade un valor de frescura y seguridad. La imagen no cambió, pero 'vemos' una mañana apacible.",
      color: "border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.4)]"
    },
    siren: {
      mood: "Tensión / Crimen",
      desc: "Una sirena lejana. La misma calle ahora parece peligrosa, un escenario de crimen urbano.",
      color: "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
    }
  };

  const currentScenario = scenarios[selectedSound as keyof typeof scenarios] || scenarios.none;

  useEffect(() => {
    const stopAndReset = (audio: HTMLAudioElement | null) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    // Reset both first
    stopAndReset(birdsRef.current);
    stopAndReset(sirenRef.current);

    // Play selected
    const playAudio = async () => {
      try {
        if (selectedSound === 'birds' && birdsRef.current) {
          birdsRef.current.volume = 0.5;
          await birdsRef.current.play();
        } else if (selectedSound === 'siren' && sirenRef.current) {
          sirenRef.current.volume = 0.6;
          await sirenRef.current.play();
        }
      } catch (e) {
        // Auto-play policies might block audio if no interaction occurred
        console.log("Esperando interacción del usuario para reproducir audio.");
      }
    };

    playAudio();

  }, [selectedSound]);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-[#0f3460] relative">
       <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
       {/* Audio Elements */}
       <audio ref={birdsRef} loop src="https://assets.mixkit.co/sfx/preview/mixkit-morning-birds-2472.mp3" preload="auto" />
       <audio ref={sirenRef} loop src="https://assets.mixkit.co/sfx/preview/mixkit-police-siren-loop-1195.mp3" preload="auto" />

      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white z-10">
        <span className="text-[#e94560]">La Audiovisión</span> (Michel Chion)
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl z-10 mb-16">
        {/* Interactive Demo Section */}
        <div className="bg-[#1a1a2e] p-6 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
              <Zap className="text-yellow-400" /> Valor Añadido
            </h3>
            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">Simulación Interactiva</span>
          </div>
          
          <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-6 group">
             {/* Stable Image of Empty Street */}
             <img 
               src="https://images.unsplash.com/photo-1517154596051-c2b5f6607433?q=80&w=1000&auto=format&fit=crop" 
               alt="Calle vacía" 
               className={`w-full h-full object-cover transition-all duration-500 ${selectedSound === 'siren' ? 'brightness-75 contrast-125 sepia' : ''} ${selectedSound === 'birds' ? 'brightness-110 saturate-150' : ''}`}
             />
             <div className={`absolute inset-0 border-4 transition-all duration-500 pointer-events-none ${currentScenario.color}`}></div>
             
             {/* Visual Feedback for Sound */}
             {selectedSound !== 'none' && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                  <Volume2 size={16} />
                  <span className="text-sm uppercase font-bold">{selectedSound === 'birds' ? 'Sonido: Pájaros' : 'Sonido: Sirena'}</span>
                </div>
             )}
          </div>

          <div className="flex gap-4 mb-6 justify-center flex-wrap">
            <button 
              onClick={() => setSelectedSound('none')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${selectedSound === 'none' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Silencio
            </button>
            <button 
              onClick={() => setSelectedSound('birds')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${selectedSound === 'birds' ? 'bg-green-600 text-white ring-2 ring-green-300' : 'bg-gray-800 text-gray-400 hover:bg-green-900/50'}`}
            >
              🐦 Pájaros
            </button>
            <button 
              onClick={() => setSelectedSound('siren')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${selectedSound === 'siren' ? 'bg-red-600 text-white ring-2 ring-red-300' : 'bg-gray-800 text-gray-400 hover:bg-red-900/50'}`}
            >
              🚨 Sirena
            </button>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Interpretación del espectador</p>
            <h4 key={selectedSound} className="text-xl font-bold text-white mb-2 transition-all animate-pulse">
              {currentScenario.mood}
            </h4>
            <p className="text-gray-300 text-sm italic">{currentScenario.desc}</p>
          </div>
        </div>

        {/* Theory Cards */}
        <div className="space-y-6">
           <div className="bg-gradient-to-r from-indigo-900 to-[#1a1a2e] p-6 rounded-2xl border-l-4 border-yellow-400 hover:translate-x-2 transition-transform">
             <h3 className="text-xl font-bold text-yellow-400 mb-2">La Síncresis</h3>
             <p className="text-sm text-gray-300 mb-2">Sincronismo + Síntesis</p>
             <p className="text-gray-400 text-sm">
               La soldadura inevitable entre un fenómeno sonoro y uno visual cuando ocurren simultáneamente. 
               <br/><span className="text-white font-semibold">Ejemplo:</span> Foley. Golpear una sandía = Cabeza rota.
             </p>
           </div>

           <div className="bg-[#1a1a2e] p-6 rounded-2xl border border-white/5">
             <h3 className="text-xl font-bold text-purple-400 mb-4">Los 3 Tipos de Escucha</h3>
             <ul className="space-y-3">
               <li className="flex items-start gap-3">
                 <div className="bg-purple-500/20 p-2 rounded text-purple-400"><ArrowRight size={16}/></div>
                 <div>
                   <strong className="text-white block">Causal</strong>
                   <span className="text-sm text-gray-400">¿Qué es eso? (Identificar la causa: un perro).</span>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <div className="bg-purple-500/20 p-2 rounded text-purple-400"><Radio size={16}/></div>
                 <div>
                   <strong className="text-white block">Semántica</strong>
                   <span className="text-sm text-gray-400">Decodificar un código (Lenguaje, Morse).</span>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <div className="bg-purple-500/20 p-2 rounded text-purple-400"><Music size={16}/></div>
                 <div>
                   <strong className="text-white block">Reducida</strong>
                   <span className="text-sm text-gray-400">Cualidades del sonido (Tono, timbre). La escucha del técnico.</span>
                 </div>
               </li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Module2_Theory;