import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Music, Zap, Radio, Volume2, VolumeX, Sparkles, Loader2, ImageIcon, Mic, Play } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

const Module2_Theory: React.FC = () => {
  const [selectedSound, setSelectedSound] = useState<string>('none');
  const [bgImage, setBgImage] = useState<string>("https://images.unsplash.com/photo-1517154596051-c2b5f6607433?q=80&w=1000&auto=format&fit=crop");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio Context Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const scenarios = {
    none: {
      mood: "Neutral",
      desc: "Un plano de una calle vacía. Información visual pura.",
      color: "border-gray-500"
    },
    birds: {
      mood: "Paz / Mañana Tranquila",
      desc: "La voz suave y poética transforma la calle en un lugar seguro. El 'Valor Añadido' es la serenidad proyectada por el tono.",
      color: "border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.4)]"
    },
    siren: {
      mood: "Tensión / Terror",
      desc: "Una alerta de emergencia distópica convierte la misma imagen en una zona de guerra inminente.",
      color: "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
    }
  };

  const currentScenario = scenarios[selectedSound as keyof typeof scenarios] || scenarios.none;

  // Helper: Decode Base64 string to Uint8Array
  const base64ToBytes = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Helper: Convert PCM Data to AudioBuffer manually
  const pcmToAudioBuffer = (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number = 24000,
    numChannels: number = 1
  ): AudioBuffer => {
    // Ensure data length is even (16-bit samples)
    const length = data.length;
    const alignedLength = length % 2 === 0 ? length : length - 1;
    const alignedData = data.slice(0, alignedLength);

    const dataInt16 = new Int16Array(alignedData.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        // Convert Int16 (-32768 to 32767) to Float32 (-1.0 to 1.0)
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  // Generate AI Audio (TTS)
  const generateAndPlayAiAudio = async (type: 'birds' | 'siren') => {
    // Stop previous audio
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
    setIsPlaying(false);
    setIsGeneratingAudio(true);

    try {
      // Initialize Audio Context on user gesture
      if (!audioContextRef.current) {
        // @ts-ignore
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
        // Create Gain Node for Volume control
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = 1.5; 
        gainNodeRef.current.connect(audioContextRef.current.destination);
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // @ts-ignore
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      
      // Use TTS model as it is more stable than native-audio for this purpose currently
      const modelName = "gemini-2.5-flash-preview-tts";

      let promptText = "";
      let voiceName = "Kore"; // Default soft voice

      if (type === 'birds') {
        // Peace / Meditation - Soft voice
        voiceName = "Kore";
        // Simple text for TTS to read
        promptText = "The city is sleeping. Feel the gentle morning breeze. Everything is calm. The birds are singing. Peace.";
      } else {
        // Terror / Siren - Deep/Harsh voice
        voiceName = "Fenrir";
        // Simple text for TTS to read
        promptText = "Emergency. Warning. Curfew violation detected. Remain indoors. Patrols are approaching. Danger.";
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [{ parts: [{ text: promptText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (base64Audio && audioContextRef.current) {
        const audioBytes = base64ToBytes(base64Audio);
        // Verify we have data
        if (audioBytes.length < 100) {
          throw new Error("Audio generated was empty or too short");
        }

        const audioBuffer = pcmToAudioBuffer(audioBytes, audioContextRef.current);
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        // Connect to Gain Node instead of Destination directly
        source.connect(gainNodeRef.current!); 
        
        source.start();
        setIsPlaying(true);
        
        source.onended = () => {
          setIsPlaying(false);
          setIsGeneratingAudio(false);
        };
        currentSourceRef.current = source;
      } else {
        // Check for text error response
        const textPart = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textPart) {
            console.warn("Model returned text:", textPart);
            throw new Error("La IA devolvió texto en lugar de audio.");
        }
        throw new Error("No audio data received in response");
      }

    } catch (error: any) {
      console.error("Error generating audio:", error);
      let msg = "Error generando audio.";
      if (error.message && error.message.includes("500")) {
        msg = "Error del servidor de IA (500). Intenta de nuevo.";
      } else if (error.message && error.message.includes("404")) {
        msg = "Modelo de audio no encontrado.";
      }
      alert(msg);
      setIsPlaying(false);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Function to generate city image
  const generateCityImage = async () => {
    setIsGeneratingImage(true);
    try {
      // @ts-ignore
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A realistic cinematic wide shot of an empty urban city street during the day, neutral lighting, high detail, 8k resolution, photorealistic, no people, no cars.',
            },
          ],
        },
        config: {
            responseModalities: [Modality.IMAGE], 
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      if (part && part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
        setBgImage(imageUrl);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("No se pudo generar la imagen. Verifica tu conexión o clave API.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSoundSelection = (type: string) => {
    setSelectedSound(type);
    if (type === 'none') {
       if (currentSourceRef.current) {
         currentSourceRef.current.stop();
         setIsPlaying(false);
       }
    } else {
       generateAndPlayAiAudio(type as 'birds' | 'siren');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentSourceRef.current) {
        currentSourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden bg-[#0f3460]">
       {/* Vibrant Background */}
       <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#e94560] opacity-90 z-0"></div>
       <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>
      
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
              
              <button 
                onClick={generateCityImage}
                disabled={isGeneratingImage}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingImage ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                {isGeneratingImage ? "Generando..." : "Generar Escenario (IA)"}
              </button>
            </div>
            
            <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-6 group shadow-inner">
               {/* Dynamic Image */}
               <img 
                 src={bgImage}
                 alt="Escenario Urbano" 
                 className={`w-full h-full object-cover transition-all duration-700 ${selectedSound === 'siren' ? 'brightness-75 contrast-125 sepia hue-rotate-[-15deg]' : ''} ${selectedSound === 'birds' ? 'brightness-110 saturate-150' : ''}`}
               />
               
               {/* Loading Overlay */}
               {(isGeneratingImage || isGeneratingAudio) && (
                 <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white z-20 transition-opacity rounded-xl">
                    {isGeneratingImage ? (
                      <>
                        <Loader2 size={48} className="animate-spin text-purple-400 mb-4" />
                        <p className="font-mono text-sm animate-pulse text-purple-200">
                          Generando imagen urbana con Gemini Nano...
                        </p>
                      </>
                    ) : (
                      <>
                        {/* Animated Audio Wave */}
                        <div className="flex items-end justify-center gap-2 mb-4 h-12">
                           <div className="w-2 h-6 bg-cyan-400 rounded-full animate-[bounce_1s_infinite] delay-75"></div>
                           <div className="w-2 h-10 bg-cyan-400 rounded-full animate-[bounce_1.2s_infinite] delay-150"></div>
                           <div className="w-2 h-12 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite] delay-300"></div>
                           <div className="w-2 h-8 bg-cyan-400 rounded-full animate-[bounce_1.1s_infinite] delay-100"></div>
                           <div className="w-2 h-4 bg-cyan-400 rounded-full animate-[bounce_0.9s_infinite] delay-200"></div>
                        </div>
                        <p className="font-mono text-sm animate-pulse text-cyan-300 font-bold">
                          Diseñando Narrativa Sonora con IA...
                        </p>
                        <p className="text-xs text-gray-400 mt-2">(Gemini TTS Voice Acting)</p>
                      </>
                    )}
                 </div>
               )}

               <div className={`absolute inset-0 border-4 transition-all duration-500 pointer-events-none ${currentScenario.color}`}></div>
               
               {/* Visual Feedback for Sound */}
               {(isPlaying || (selectedSound !== 'none' && !isGeneratingAudio)) && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse border border-white/20 shadow-lg">
                    {isPlaying ? <div className="flex gap-1 items-center h-4">
                      <div className="w-1 h-3 bg-green-400 animate-bounce" style={{animationDelay: '0s'}}></div>
                      <div className="w-1 h-4 bg-green-400 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-2 bg-green-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div> : <Volume2 size={16} />}
                    
                    <span className="text-sm uppercase font-bold">
                      {isPlaying ? 'Reproduciendo...' : selectedSound}
                    </span>
                  </div>
               )}
               
               {/* AI Label */}
               <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] text-white/60 flex items-center gap-1">
                 <ImageIcon size={10} />
                 Generated by Gemini
               </div>
            </div>

            <div className="flex gap-3 mb-6 justify-center flex-wrap">
              <button 
                onClick={() => handleSoundSelection('none')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${selectedSound === 'none' ? 'bg-gray-600 text-white shadow-lg ring-2 ring-gray-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                <VolumeX size={18} /> Silencio
              </button>
              <button 
                onClick={() => handleSoundSelection('birds')}
                disabled={isGeneratingAudio}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${selectedSound === 'birds' ? 'bg-green-600 text-white shadow-lg shadow-green-500/30 ring-2 ring-green-400' : 'bg-gray-800 text-gray-400 hover:bg-green-900/50 hover:text-green-400'}`}
              >
                <Music size={18} /> Ambiente: Paz
              </button>
              <button 
                onClick={() => handleSoundSelection('siren')}
                disabled={isGeneratingAudio}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${selectedSound === 'siren' ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400' : 'bg-gray-800 text-gray-400 hover:bg-red-900/50 hover:text-red-400'}`}
              >
                <Music size={18} /> Ambiente: Terror
              </button>
            </div>

            <div className="bg-black/30 p-5 rounded-xl border border-white/5 min-h-[100px]">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Interpretación del espectador</p>
              {/* Use key to force re-render animation */}
              <h4 key={`mood-${selectedSound}`} className="text-xl font-bold text-white mb-2 transition-all animate-fade-in">
                {currentScenario.mood}
              </h4>
              <p key={`desc-${selectedSound}`} className="text-gray-300 text-sm italic animate-fade-in">{currentScenario.desc}</p>
            </div>
          </div>

          {/* Theory Cards */}
          <div className="space-y-6 flex flex-col justify-center">
             <div className="bg-gradient-to-r from-indigo-900/90 to-[#1a1a2e]/90 p-8 rounded-2xl border-l-4 border-yellow-400 hover:translate-x-2 transition-transform shadow-lg">
               <h3 className="text-2xl font-bold text-yellow-400 mb-3">La Síncresis</h3>
               <p className="text-sm font-mono text-gray-400 mb-4 bg-black/30 inline-block px-2 py-1 rounded">Sincronismo + Síntesis</p>
               <p className="text-gray-300 leading-relaxed mb-4">
                 La soldadura inevitable entre un fenómeno sonoro y uno visual cuando ocurren simultáneamente.
               </p>
               
               <div className="space-y-3 bg-black/20 p-4 rounded-lg">
                  <div className="flex items-start gap-3 border-l-2 border-yellow-400/50 pl-3">
                     <span className="text-xl">🍉</span>
                     <div>
                       <strong className="text-white text-sm block">Golpe de Puño</strong>
                       <p className="text-xs text-gray-400">Visual: Puño pasa cerca. Sonido: Golpe a sandía/apio. Resultado: Sentimos el dolor del impacto.</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-3 border-l-2 border-cyan-400/50 pl-3">
                     <span className="text-xl">🔦</span>
                     <div>
                       <strong className="text-white text-sm block">Sable de Luz</strong>
                       <p className="text-xs text-gray-400">Visual: Palo con luz. Sonido: Zumbido TV antigua + Motor proyector. Resultado: Arma energética mortal.</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-3 border-l-2 border-pink-400/50 pl-3">
                     <span className="text-xl">🏃</span>
                     <div>
                       <strong className="text-white text-sm block">Animación</strong>
                       <p className="text-xs text-gray-400">Visual: Personaje corriendo. Sonido: Neumáticos derrapando. Resultado: Velocidad imposible.</p>
                     </div>
                  </div>
               </div>
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