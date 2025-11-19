export enum ModuleId {
  INTRO = 'intro',
  THEORY = 'theory',
  SPACE = 'space',
  COMPONENTS = 'components',
  WORKFLOW = 'workflow'
}

export interface SoundScenario {
  id: string;
  name: string;
  mood: string;
  description: string;
  icon: string;
  color: string;
}
