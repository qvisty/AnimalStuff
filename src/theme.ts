import { BrandStatus } from './types';

export const colors = {
  background: '#F7F6F2',
  card: '#FFFFFF',
  text: '#1F2937',
  muted: '#6B7280',
  primary: '#2F855A',
  border: '#E5E7EB',
};

export const statusMeta: Record<
  BrandStatus,
  { label: string; emoji: string; color: string; description: string }
> = {
  certified_cruelty_free: {
    label: 'Fri for dyreforsøg (certificeret)',
    emoji: '🐰',
    color: '#2F855A',
    description:
      'Mærket er certificeret af Leaping Bunny og/eller PETA og tester ikke på dyr.',
  },
  cruelty_free: {
    label: 'Erklæret fri for dyreforsøg',
    emoji: '✅',
    color: '#38A169',
    description:
      'Mærket erklærer, at det ikke tester på dyr, men har ingen uafhængig certificering.',
  },
  parent_tests: {
    label: 'Mærket tester ikke – moderselskabet gør',
    emoji: '⚠️',
    color: '#D69E2E',
    description:
      'Selve mærket tester ikke på dyr, men ejes af et selskab, der gør (eller sælger på markeder med krav om dyreforsøg).',
  },
  tests: {
    label: 'Tester på dyr',
    emoji: '❌',
    color: '#C53030',
    description:
      'Mærket tester på dyr eller sælger sine produkter på markeder, hvor dyreforsøg kan kræves ved lov.',
  },
  unknown: {
    label: 'Ukendt status',
    emoji: '❓',
    color: '#6B7280',
    description:
      'Mærket findes ikke i databasen. Kig efter Leaping Bunny- eller PETA-logoet på emballagen, eller søg på mærket hos crueltyfreeinternational.org.',
  },
};
