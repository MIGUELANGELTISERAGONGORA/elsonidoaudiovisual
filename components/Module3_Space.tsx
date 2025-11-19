import React, { useState } from 'react';
import { Monitor, Ghost, MessageCircle, Music, Info } from 'lucide-react';

const Module3_Space: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'diegetic' | 'extradiegetic' | null>(null);

  const handleInteraction = (zone: 'diegetic' | 'extradiegetic' | null) => {
    setActiveZone(activeZone === zone ? null : zone);
  };

  return (
    <div className="min-h-screen bg-[#16213e] p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Vibrant Background Elements */}
      <div className="absolute -right-20 top-40 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute -left-20 bottom-40 w-96 h-96 bg-pink-500 rounded-full filter blur-[150px] opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="z-10 w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-sm">
          Tipología y Espacio
        </h2>
        
        <p className="text-gray-400 mb-12 text-center max-w-2xl flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
          <Info size={18} />
          <span className="text-sm">Toca o pasa el mouse por las zonas para explorar</span>
        </p>

        <div className="relative w-full max-w-5xl aspect-[16/9] bg-black rounded-3xl border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden group/container">
          
          {/* The Screen (Diegesis) */}
          <div 
            className={`relative z-20 w-3/4 h-3/4 bg-gray-900 rounded-xl border-2 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer
              ${activeZone === 'diegetic' ? 'border-green-500 shadow-[0_0_60px_rgba(34,197,94,0.4)] bg-gray-800 scale-105' : 'border-gray-700 hover:border-gray-500'}
            `}
            onMouseEnter={() => setActiveZone('diegetic')}
            onMouseLeave={() => setActiveZone(null)}
            onClick={() => handleInteraction('diegetic')}
          >
            <span className={`absolute top-4 left-4 text-xs font-mono uppercase border px-2 py-1 rounded transition-colors ${activeZone === 'diegetic' ? 'text-green-400 border-green-400 bg-green-400/10' : 'text-gray-600 border-gray-600'}`}>
              Diegesis (Historia)
            </span>
            
            <div className="flex gap-8 md:gap-16">
              <div className={`flex flex-col items-center transition-all duration-500 ${activeZone === 'diegetic' ? 'text-white scale-110' : 'text-gray-600'}`}>
                <MessageCircle size={48} className="mb-3" />
                <span className="text-sm font-bold">Diálogos</span>
              </div>
              <div className={`flex flex-col items-center transition-all duration-500 ${activeZone === 'diegetic' ? 'text-white scale-110' : 'text-gray-600'}`}>
                <span className="text-5xl mb-2">👣</span>
                <span className="text-sm font-bold">Pasos</span>
              </div>
            </div>

            <div className={`mt-8 text-center px-4 max-w-md transition-all duration-500 ${activeZone === 'diegetic' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-green-400 font-bold mb-1">Mundo de la Historia</p>
              <p className="text-sm text-gray-300">
                Sonido que pertenece a la realidad de la narración. Los personajes pueden oírlo.
              </p>
            </div>
          </div>

          {/* Extradiegetic Space */}
          <div 
            className={`absolute inset-0 z-10 bg-[#1a1a2e]/40 transition-all duration-700 cursor-pointer
               ${activeZone === 'extradiegetic' ? 'bg-pink-900/30 shadow-[inset_0_0_150px_rgba(236,72,153,0.4)]' : ''}
            `}
            onMouseEnter={() => setActiveZone('extradiegetic')}
            onMouseLeave={() => setActiveZone(null)}
            onClick={() => handleInteraction('extradiegetic')}
          >
            <div className={`absolute top-6 right-6 md:top-10 md:right-10 flex flex-col items-end transition-all duration-500 ${activeZone === 'extradiegetic' ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'}`}>
              <span className="text-xs font-mono text-pink-500 uppercase border border-pink-500 px-2 py-1 rounded mb-4 bg-black/50 backdrop-blur">Extradiegético</span>
              
              <div className={`flex items-center gap-3 text-pink-300 mb-4 p-2 rounded-lg ${activeZone === 'extradiegetic' ? 'bg-pink-500/10' : ''}`}>
                <span className="font-bold text-right">Música Incidental<br/><span className="text-xs font-normal opacity-70">(Score)</span></span> 
                <Music size={32} />
              </div>
              
              <div className={`flex items-center gap-3 text-purple-300 p-2 rounded-lg ${activeZone === 'extradiegetic' ? 'bg-purple-500/10' : ''}`}>
                <span className="font-bold text-right">Narrador<br/><span className="text-xs font-normal opacity-70">Omnisciente</span></span> 
                <Ghost size={32} />
              </div>
            </div>
            
            <div className={`absolute bottom-8 left-8 max-w-sm transition-all duration-500 ${activeZone === 'extradiegetic' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <h3 className="text-pink-400 font-bold text-xl mb-2">Fuera de la Historia</h3>
               <p className="text-sm text-gray-200 leading-relaxed bg-black/60 p-4 rounded-xl border-l-4 border-pink-500 backdrop-blur-md">
                 Sonido agregado en postproducción que los personajes no escuchan. Sirve para crear atmósfera, comentar la acción o manipular las emociones del espectador.
               </p>
            </div>
          </div>

        </div>

        {/* Acousmatic Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-5xl">
          <div className="bg-gradient-to-br from-orange-900/20 to-black p-6 rounded-2xl border border-orange-500/30 hover:border-orange-500 transition-all group">
            <h3 className="text-xl font-bold text-orange-400 mb-3 flex items-center gap-2">
              <span className="bg-orange-500/20 p-1 rounded group-hover:bg-orange-500 group-hover:text-black transition-colors">🔊</span> El Fuera de Campo
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Sonido <strong className="text-white">Acusmático</strong>: Se oye sin ver la causa. Genera misterio y suspenso. Es la herramienta más económica para "construir" mundos sin mostrarlos.
              <br/><span className="text-xs text-gray-500 mt-2 block">Ej: La madre en Psicosis, HAL 9000.</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/20 to-black p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all group">
            <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
              <span className="bg-purple-500/20 p-1 rounded group-hover:bg-purple-500 group-hover:text-black transition-colors">🔄</span> La Frontera Difusa
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Cuando la música empieza como extradiegética (score) y un personaje prende la radio, volviéndose diegética. 
              Un efecto de transición narrativa brillante que conecta ambos mundos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module3_Space;