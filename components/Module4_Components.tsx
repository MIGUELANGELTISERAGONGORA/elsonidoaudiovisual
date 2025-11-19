import React, { useState } from 'react';
import { Mic, Music4, Wind, VolumeX } from 'lucide-react';

const Module4_Components: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "La Palabra",
      icon: Mic,
      color: "text-blue-400",
      bg: "bg-blue-500",
      content: (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-2xl font-bold text-blue-400">Diálogos y Voz</h3>
          <p>No es solo información, es textura.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong className="text-white">Voz-Teatro vs. Voz-Texto:</strong> ¿El diálogo busca realismo naturalista o recitación literaria?</li>
            <li><strong className="text-white">Star-system vocal:</strong> Reconocemos la voz del actor antes de verlo. Su grano de voz aporta autoridad o fragilidad.</li>
          </ul>
        </div>
      )
    },
    {
      title: "La Música",
      icon: Music4,
      color: "text-pink-400",
      bg: "bg-pink-500",
      content: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-bold text-pink-400">Empática vs. Anempática</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-pink-500/30 rounded-lg bg-pink-500/10">
              <h4 className="font-bold text-pink-300 mb-2">Empática</h4>
              <p className="text-sm">La música siente lo mismo que la escena. <br/><em>Escena triste + Música de violines tristes.</em></p>
            </div>
            <div className="p-4 border border-yellow-500/30 rounded-lg bg-yellow-500/10">
              <h4 className="font-bold text-yellow-300 mb-2">Anempática</h4>
              <p className="text-sm">Indiferencia musical. Genera shock. <br/><em>Escena violenta + Música alegre (La Naranja Mecánica).</em></p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Efectos (SFX)",
      icon: Wind,
      color: "text-green-400",
      bg: "bg-green-500",
      content: (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-2xl font-bold text-green-400">Ambientes y Foley</h3>
          <p>Crean la "materialidad" de la imagen.</p>
          <div className="p-4 bg-white/5 rounded-lg italic text-gray-400 border-l-2 border-green-500">
            "Sin el ruido de la ropa o los pasos, la imagen parece fantasmagórica y plana."
          </div>
          <p className="text-sm">Los ambientes definen el espacio (reverberación de catedral vs. sequedad de un armario).</p>
        </div>
      )
    },
    {
      title: "El Silencio",
      icon: VolumeX,
      color: "text-gray-200",
      bg: "bg-gray-200",
      content: (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-2xl font-bold text-white">El Sonido Cero</h3>
          <p className="text-xl font-light text-gray-300">No es la ausencia de sonido, es un efecto dramático.</p>
          <p className="text-sm text-gray-400">
            Se usa para enfatizar un momento de shock, intimidad o muerte. En el cine, el silencio absoluto no existe (siempre hay 'room tone'), pero su reducción drástica centra la atención.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-[#121212] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
      
      <h2 className="text-3xl md:text-5xl font-black mb-8 text-center z-10">Componentes de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Banda Sonora</span></h2>
      
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-[600px] md:h-[500px] bg-[#1e1e2e] rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10">
        
        {/* Tabs (Sidebar on Desktop, Top on Mobile) */}
        <div className="md:w-1/4 bg-[#151520] flex md:flex-col overflow-x-auto md:overflow-visible">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-3 p-6 transition-all duration-300 min-w-[150px] md:min-w-0 md:w-full text-left border-b md:border-b-0 md:border-l-4 hover:bg-white/5
                ${activeTab === index ? `bg-white/10 ${tab.color} border-current` : 'border-transparent text-gray-500'}
              `}
            >
              <tab.icon size={24} />
              <span className="font-bold">{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto relative">
           {/* Background Accent based on tab */}
           <div className={`absolute top-0 right-0 w-64 h-64 ${tabs[activeTab].bg} opacity-5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500`}></div>
           
           {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default Module4_Components;