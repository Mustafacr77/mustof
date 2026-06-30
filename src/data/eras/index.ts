import { EraData } from './types';
import { preIslamicEraData } from './pre-islamic';
import { propheticEraData } from './prophetic';
import { rashidunEraData } from './rashidun';
import { umayyadEraData } from './umayyad';
import { abbasidEraData } from './abbasid';
import { alAndalusEraData } from './al-andalus';
import { ottomanEraData } from './ottoman';
import { modernEraData } from './modern';

export * from './types';

export const ERAS_DATA: EraData[] = [
  preIslamicEraData,
  propheticEraData,
  rashidunEraData,
  umayyadEraData,
  abbasidEraData,
  alAndalusEraData,
  ottomanEraData,
  modernEraData
];

export const getEraDataById = (id: string): EraData | undefined => {
  return ERAS_DATA.find(e => e.id === id);
};
