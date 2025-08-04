export enum GameState {
  Login,
  Welcome,
  Playing,
  GameOver,
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  userClass: string;
  userNumber: string;
}

export enum Weapon {
  StraightPunch,
  Uppercut,
  HammerFist,
  DownwardElbow,
  CuttingElbow,
}

export interface WeaponInfo {
  id: Weapon;
  name: string;
  thaiName: string;
  thaiDescription?: string;
  prompt: string;
}
