import React from 'react';
import { Eye, Ear, Quote } from 'lucide-react';

const Module1_Intro: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      
      {/* Encabezado destacado del Profesor */}
      <div className="w-full bg-gradient-to-r from-[#e94560] to-[#0f3460] text-center py-4 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 border-b border-white/10 relative">
        <p className="text-white font-bold md:text-xl tracking-wide flex flex-col md:flex-row items-center justify-center gap-2 font-serif">
          <span className="text-2xl">🎓</span> 
          <span>Material Didáctico:</span>
          <span className="text-yellow-300 text-lg md:text-xl uppercase border-b-2 border-yellow-300 pb-1">Prof. Miguelangel Tisera</span> 
          <span className="opacity-80">— Realización Audiovisual</span>
        </p>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="flex-1 flex flex-col justify-center items-center p-8 z-10">
        <div className="max-w-4xl w-full space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-xl text-[#e94560] font-bold tracking-[0.3em] uppercase animate-fade-in-up">Módulo 1</h2>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
              CineSonoro
            </h1>
            <p className="text-2xl text-gray-300 font-light">Desmitificando la supremacía de la imagen</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group cursor-default">
              <Eye size={48} className="mx-auto mb-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">El Ojo</h3>
              <p className="text-sm text-gray-400">Solemos aprender a "ver" cine, analizando planos, luz y color.</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/30 hover:border-pink-500 transition-all group cursor-default transform hover:-translate-y-1 shadow-[0_0_30px_rgba(233,69,96,0.3)]">
              <Ear size={48} className="mx-auto mb-4 text-[#e94560] group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-[#e94560]">El Oído</h3>
              <p className="text-sm text-gray-300">Rara vez aprendemos a "escuchar" cine, aunque es el 50% de la experiencia.</p>
            </div>
          </div>

          <div className="relative p-8 md:p-12 bg-black/40 rounded-3xl border-l-4 border-[#e94560]">
            <Quote className="absolute top-4 left-4 text-[#e94560] opacity-50" size={32} />
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-gray-100">
              “El sonido es el 50% de la experiencia de una película”
            </p>
            <p className="text-right mt-4 font-bold text-[#e94560]">— George Lucas / David Lynch</p>
          </div>

          <div className="text-gray-400 text-sm max-w-2xl mx-auto bg-black/20 p-4 rounded-xl border border-white/5">
            <span className="font-bold text-white">Dato Curioso:</span> El cine es sonoro desde antes de que los actores hablaran. El cine mudo siempre estuvo acompañado de música en vivo y explicadores.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module1_Intro;