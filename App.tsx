import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Module1_Intro from './components/Module1_Intro';
import Module2_Theory from './components/Module2_Theory';
import Module3_Space from './components/Module3_Space';
import Module4_Components from './components/Module4_Components';
import Module5_Workflow from './components/Module5_Workflow';
import AiTutor from './components/AiTutor';
import { ModuleId } from './types';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleId>(ModuleId.INTRO);

  // Function to scroll to specific module
  const scrollToModule = (id: ModuleId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentModule(id);
    }
  };

  // Setup Intersection Observer to update active state on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentModule(entry.target.id as ModuleId);
          }
        });
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );

    Object.values(ModuleId).forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#1a1a2e] text-white min-h-screen pb-20 relative">
      <section id={ModuleId.INTRO}>
        <Module1_Intro />
      </section>
      <section id={ModuleId.THEORY}>
        <Module2_Theory />
      </section>
      <section id={ModuleId.SPACE}>
        <Module3_Space />
      </section>
      <section id={ModuleId.COMPONENTS}>
        <Module4_Components />
      </section>
      <section id={ModuleId.WORKFLOW}>
        <Module5_Workflow />
      </section>

      <Navbar currentModule={currentModule} onNavigate={scrollToModule} />
      
      {/* Assistant Chatbot */}
      <AiTutor />
    </div>
  );
};

export default App;