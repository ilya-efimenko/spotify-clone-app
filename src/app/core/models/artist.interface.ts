import { Image } from './response.interface';

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  popularity: number;
  genres: string[];
  href: string;
  followers: {
    total: number;
    href: string | null;
  };
}
