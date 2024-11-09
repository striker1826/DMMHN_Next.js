import { StaticImageData } from 'next/image';

export interface ChatInfo {
  type: 'other' | 'mine' | 'recording' | 'exit';
  name: string;
  message: string;
  profileImg: StaticImageData;
}
