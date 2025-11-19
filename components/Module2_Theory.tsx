import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Music, Zap, Radio, Volume2, VolumeX } from 'lucide-react';

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
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (e) {
          console.log("Error pausing audio (likely not playing)", e);
        }
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

    if (selectedSound !== 'none') {
      playAudio();
    }

  }, [selectedSound]);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden bg-[#0f3460]">
       {/* Vibrant Background */}
       <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#e94560] opacity-90 z-0"></div>
       <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>
      
       {/* Audio Elements */}
       <audio ref={birdsRef} loop src="https://assets.mixkit.co/sfx/preview/mixkit-morning-birds-2472.mp3" preload="auto" />
       <audio ref={sirenRef} loop src="https://assets.mixkit.co/sfx/preview/mixkit-police-siren-loop-1195.mp3" preload="auto" />

      <div className="z-10 w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white drop-shadow-lg">
          <span className="text-[#e94560]">La Audiovisión</span> <span className="text-lg font-light opacity-80 block md:inline">(Michel Chion)</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 w-full">
          {/* Interactive Demo Section */}
          <div className="bg-[#1a1a2e]/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <Zap className="text-yellow-400" /> Valor Añadido
              </h3>
              <span className="text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full text-gray-300">Simulación Interactiva</span>
            </div>
            
            <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-6 group shadow-inner">
               {/* Stable Image of Empty Street */}
               <img 
                 src="https://images.unsplash.com/photo-1517154596051-c2b5f6607433?q=80&w=1000&auto=format&fit=crop" 
                 alt="Calle vacía" 
                 className={`w-full h-full object-cover transition-all duration-700 ${selectedSound === 'siren' ? 'brightness-75 contrast-125 sepia hue-rotate-[-15deg]' : ''} ${selectedSound === 'birds' ? 'brightness-110 saturate-150' : ''}`}
               />
               <div className={`absolute inset-0 border-4 transition-all duration-500 pointer-events-none ${currentScenario.color}`}></div>
               
               {/* Visual Feedback for Sound */}
               {selectedSound !== 'none' && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse border border-white/20">
                    <Volume2 size={16} />
                    <span className="text-sm uppercase font-bold">{selectedSound === 'birds' ? 'Sonido: Pájaros' : 'Sonido: Sirena'}</span>
                  </div>
               )}
            </div>

            <div className="flex gap-3 mb-6 justify-center flex-wrap">
              <button 
                onClick={() => setSelectedSound('none')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${selectedSound === 'none' ? 'bg-gray-600 text-white shadow-lg ring-2 ring-gray-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                <VolumeX size={18} /> Silencio
              </button>
              <button 
                onClick={() => setSelectedSound('birds')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${selectedSound === 'birds' ? 'bg-green-600 text-white shadow-lg shadow-green-500/30 ring-2 ring-green-400' : 'bg-gray-800 text-gray-400 hover:bg-green-900/50 hover:text-green-400'}`}
              >
                🐦 Pájaros
              </button>
              <button 
                onClick={() => setSelectedSound('siren')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${selectedSound === 'siren' ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400' : 'bg-gray-800 text-gray-400 hover:bg-red-900/50 hover:text-red-400'}`}
              >
                🚨 Sirena
              </button>
            </div>

            <div className="bg-black/30 p-5 rounded-xl border border-white/5 min-h-[100px]">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Interpretación del espectador</p>
              <h4 key={selectedSound} className="text-xl font-bold text-white mb-2 transition-all animate-fade-in">
                {currentScenario.mood}
              </h4>
              <p key={selectedSound + 'desc'} className="text-gray-300 text-sm italic animate-fade-in">{currentScenario.desc}</p>
            </div>
          </div>

          {/* Theory Cards */}
          <div className="space-y-6 flex flex-col justify-center">
             <div className="bg-gradient-to-r from-indigo-900/90 to-[#1a1a2e]/90 p-8 rounded-2xl border-l-4 border-yellow-400 hover:translate-x-2 transition-transform shadow-lg">
               <h3 className="text-2xl font-bold text-yellow-400 mb-3">La Síncresis</h3>
               <p className="text-sm font-mono text-gray-400 mb-4 bg-black/30 inline-block px-2 py-1 rounded">Sincronismo + Síntesis</p>
               <p className="text-gray-300 leading-relaxed">
                 La soldadura inevitable entre un fenómeno sonoro y uno visual cuando ocurren simultáneamente. 
                 <br/><br/>
                 <span className="text-white font-semibold border-b border-yellow-400/30 pb-1">Ejemplo Clásico:</span> Foley. Golpear una sandía = Cabeza rota.
               </p>
             </div>

             <div className="bg-[#1a1a2e]/80 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-lg">
               <h3 className="text-2xl font-bold text-purple-400 mb-6">Los 3 Tipos de Escucha</h3>
               <ul className="space-y-4">
                 <li className="flex items-start gap-4 group">
                   <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors"><ArrowRight size={20}/></div>
                   <div>
                     <strong className="text-white block text-lg">Causal</strong>
                     <span className="text-sm text-gray-400 group-hover:text-gray-300">¿Qué es eso? (Identificar la causa: un perro).</span>
                   </div>
                 </li>
                 <li className="flex items-start gap-4 group">
                   <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors"><Radio size={20}/></div>
                   <div>
                     <strong className="text-white block text-lg">Semántica</strong>
                     <span className="text-sm text-gray-400 group-hover:text-gray-300">Decodificar un código (Lenguaje, Morse).</span>
                   </div>
                 </li>
                 <li className="flex items-start gap-4 group">
                   <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors"><Music size={20}/></div>
                   <div>
                     <strong className="text-white block text-lg">Reducida</strong>
                     <span className="text-sm text-gray-400 group-hover:text-gray-300">Cualidades del sonido (Tono, timbre). La escucha del técnico.</span>
                   </div>
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module2_Theory;