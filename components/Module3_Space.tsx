import React, { useState } from 'react';
import { Monitor, Ghost, MessageCircle, Music } from 'lucide-react';

const Module3_Space: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'diegetic' | 'extradiegetic' | null>(null);

  return (
    <div className="min-h-screen bg-[#16213e] p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute -right-20 top-40 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-10"></div>
      <div className="absolute -left-20 bottom-40 w-96 h-96 bg-pink-500 rounded-full filter blur-[120px] opacity-10"></div>

      <h2 className="text-4xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Tipología y Espacio Sonoro
      </h2>

      <div className="relative w-full max-w-4xl aspect-[16/9] bg-black rounded-2xl border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden">
        
        {/* The Screen (Diegesis) */}
        <div 
          className={`relative z-20 w-2/3 h-3/4 bg-gray-900 rounded-lg border-2 transition-all duration-500 flex flex-col items-center justify-center group
            ${activeZone === 'diegetic' ? 'border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)] bg-gray-800' : 'border-gray-700'}
          `}
          onMouseEnter={() => setActiveZone('diegetic')}
          onMouseLeave={() => setActiveZone(null)}
        >
          <span className="absolute top-2 left-2 text-xs font-mono text-green-500 uppercase border border-green-500 px-1 rounded">Diegesis (Historia)</span>
          
          <div className="flex gap-8">
            <div className="flex flex-col items-center text-gray-300">
              <MessageCircle className="mb-2" />
              <span className="text-xs">Diálogos</span>
            </div>
            <div className="flex flex-col items-center text-gray-300">
              <span className="text-2xl">👣</span>
              <span className="text-xs">Pasos</span>
            </div>
          </div>

          <div className="mt-8 text-center px-4">
            <p className="text-sm text-gray-400">
              Sonido que pertenece al mundo de la historia. Los personajes lo oyen.
            </p>
          </div>
        </div>

        {/* Extradiegetic Space */}
        <div 
          className={`absolute inset-0 z-10 bg-[#1a1a2e]/50 transition-all duration-500
             ${activeZone === 'extradiegetic' ? 'bg-pink-900/20 shadow-[inset_0_0_100px_rgba(236,72,153,0.3)]' : ''}
          `}
          onMouseEnter={() => setActiveZone('extradiegetic')}
          onMouseLeave={() => setActiveZone(null)}
        >
          <div className="absolute top-8 right-8 flex flex-col items-end">
            <span className="text-xs font-mono text-pink-500 uppercase border border-pink-500 px-1 rounded mb-2 bg-black">Extradiegético</span>
            <div className={`flex items-center gap-2 text-pink-400 transition-transform ${activeZone === 'extradiegetic' ? 'scale-110' : ''}`}>
              <span>Música Incidental (Score)</span> <Music size={20} />
            </div>
            <div className={`flex items-center gap-2 text-pink-400 mt-4 transition-transform ${activeZone === 'extradiegetic' ? 'scale-110' : ''}`}>
              <span>Narrador Omnisciente</span> <Ghost size={20} />
            </div>
          </div>
          
          <div className="absolute bottom-8 left-8 max-w-xs">
             <p className={`text-sm text-gray-400 transition-opacity ${activeZone === 'extradiegetic' ? 'opacity-100' : 'opacity-50'}`}>
               Sonido fuera de la historia. Solo el espectador lo oye. Crea atmósfera o comentario.
             </p>
          </div>
        </div>

      </div>

      {/* Acousmatic Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl w-full">
        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-orange-500 hover:bg-white/10 transition-colors">
          <h3 className="text-lg font-bold text-orange-400 mb-2">El Fuera de Campo (Acusmática)</h3>
          <p className="text-sm text-gray-300">
            Se oye sin ver la causa. Genera misterio y suspenso. Es la herramienta más económica para "construir" mundos sin mostrarlos.
            <br/><em>Ej: La madre en Psicosis, HAL 9000.</em>
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-purple-500 hover:bg-white/10 transition-colors">
          <h3 className="text-lg font-bold text-purple-400 mb-2">La Frontera Difusa</h3>
          <p className="text-sm text-gray-300">
            Cuando la música empieza como extradiegética (score) y un personaje prende la radio (se vuelve diegética). 
            Un efecto de transición narrativa brillante.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Module3_Space;