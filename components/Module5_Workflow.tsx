import React from 'react';
import { FileText, Mic2, Sliders } from 'lucide-react';

const Module5_Workflow: React.FC = () => {
  const steps = [
    {
      title: "Preproducción",
      icon: FileText,
      color: "text-yellow-400",
      borderColor: "border-yellow-400",
      details: [
        "Guion técnico sonoro: Planificar qué se escucha.",
        "Scouting acústico: Evitar locaciones con ruido incontrolable (carreteras, aeropuertos)."
      ]
    },
    {
      title: "Rodaje",
      icon: Mic2,
      color: "text-red-400",
      borderColor: "border-red-400",
      details: [
        "Dictadura del Sonido Directo: Lo que no se graba bien aquí, cuesta el triple en post.",
        "Wild tracks / Room tone: Grabar el silencio del set es vital para la edición."
      ]
    },
    {
      title: "Postproducción",
      icon: Sliders,
      color: "text-blue-400",
      borderColor: "border-blue-400",
      details: [
        "Edición de diálogos: Limpieza.",
        "Foley: Recreación de pasos y roces.",
        "Diseño Sonoro (SFX): Creación de mundos.",
        "Mezcla: Equilibrio final (Mono, Stereo, Atmos)."
      ]
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-[#0f3460] to-[#1a1a2e] flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-white">
        El Flujo de Trabajo <br/><span className="text-lg font-normal text-gray-400">Del Guion a la Mezcla</span>
      </h2>

      <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-700 -z-10"></div>

        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center group">
            {/* Circle Icon */}
            <div className={`w-16 h-16 rounded-full bg-[#1a1a2e] border-4 ${step.borderColor} flex items-center justify-center z-10 mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110 duration-300`}>
              <step.icon className={step.color} size={32} />
            </div>

            {/* Card */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 w-full h-full hover:bg-white/10 transition-all">
              <h3 className={`text-xl font-bold mb-4 text-center ${step.color}`}>{step.title}</h3>
              <ul className="space-y-3">
                {step.details.map((detail, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0`} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 max-w-2xl text-center p-8 bg-[#1a1a2e] rounded-2xl border border-[#e94560]/50 shadow-[0_0_40px_rgba(233,69,96,0.2)]">
        <p className="text-xl font-bold text-white mb-2">Conclusión</p>
        <p className="text-gray-300 italic">
          "El sonido no es un adorno, es narrativa. Un buen realizador escribe con la cámara y pinta con el micrófono."
        </p>
      </div>
    </div>
  );
};

export default Module5_Workflow;