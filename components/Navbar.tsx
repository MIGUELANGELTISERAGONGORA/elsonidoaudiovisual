import React from 'react';
import { Film, Music, Speaker, Activity, Clapperboard } from 'lucide-react';
import { ModuleId } from '../types';

interface NavbarProps {
  currentModule: ModuleId;
  onNavigate: (id: ModuleId) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentModule, onNavigate }) => {
  const navItems = [
    { id: ModuleId.INTRO, icon: Film, label: 'Intro' },
    { id: ModuleId.THEORY, icon: Activity, label: 'Teoría' },
    { id: ModuleId.SPACE, icon: Speaker, label: 'Espacio' },
    { id: ModuleId.COMPONENTS, icon: Music, label: 'Componentes' },
    { id: ModuleId.WORKFLOW, icon: Clapperboard, label: 'Flujo' },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 z-50 shadow-[0_0_20px_rgba(233,69,96,0.5)]">
      <ul className="flex space-x-4 sm:space-x-8 items-center">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center transition-all duration-300 group ${
                currentModule === item.id ? 'text-[#e94560] scale-110' : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon size={24} className={`mb-1 ${currentModule === item.id ? 'stroke-[3px]' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 absolute -top-8 transition-opacity bg-black px-2 py-1 rounded text-white">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;