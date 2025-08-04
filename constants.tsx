import React from 'react';
import { Weapon, type WeaponInfo } from './types';

export const ROUND_DURATION = 8; // seconds
export const FEEDBACK_DURATION = 2; // seconds
export const CAPTURE_TIME = 3; // seconds before round end
export const TOTAL_ROUNDS = 10;

export const WEAPONS: WeaponInfo[] = [
  {
    id: Weapon.StraightPunch,
    name: 'Straight Punch',
    thaiName: 'หมัดตรง',
    thaiDescription: 'กำหมัดให้แน่น แล้วยืดแขนชกไปข้างหน้าตรงๆ ให้เร็วและแรง',
    prompt: 'a Muay Thai straight punch (Mat Trong)',
  },
  {
    id: Weapon.Uppercut,
    name: 'Uppercut',
    thaiName: 'หมัดงัด',
    thaiDescription: 'งอข้อศอก กำหมัดแน่น แล้วชกเสยขึ้นไปข้างบน เหมือนจะชกใต้คาง',
    prompt: 'a Muay Thai uppercut punch (Mat Ngat)',
  },
  {
    id: Weapon.HammerFist,
    name: 'Hammer Fist',
    thaiName: 'หมัดโขก',
    thaiDescription: 'กำหมัดในแนวดิ่ง แล้วทุบลงมาจากด้านบน คล้ายการใช้ค้อน',
    prompt: 'a Muay Thai hammer fist (Mat Khok)',
  },
  {
    id: Weapon.DownwardElbow,
    name: 'Downward Elbow Strike',
    thaiName: 'ศอกตี',
    thaiDescription: 'ยกศอกขึ้นให้สูง แล้วฟันลงในแนวดิ่งใส่เป้าหมาย',
    prompt: 'a Muay Thai downward elbow strike (Sok Ti)',
  },
  {
    id: Weapon.CuttingElbow,
    name: 'Cutting Elbow Strike',
    thaiName: 'ศอกตัด',
    thaiDescription: 'งอศอกให้แหลม แล้วเหวี่ยงในแนวขวาง ขนานกับพื้น',
    prompt: 'a Muay Thai horizontal cutting elbow strike (Sok Tat)',
  },
];
