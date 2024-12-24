import { Artist } from './artist.interface';

export interface Image {
  width: number;
  height: number;
  url: string;
}

interface Album {
  name: string;
  images: Image[];
}

interface Song {
  album: Album;
  artists: Partial<Artist>[];
  /**
   * @deprecated Spotify API does not provide this prop due to the policy
   */
  preview_url: string;
}

export interface PlayerResponse {
  item: Song;
}
