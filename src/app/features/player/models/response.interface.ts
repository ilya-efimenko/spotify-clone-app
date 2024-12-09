interface Image {
  width: number;
  height: number;
  url: string;
}

interface Album {
  name: string;
  images: Image[];
}

export interface ArtistResponse {
  id: string;
  name: string;
  images: Image[]
}

interface Song {
  album: Album;
  artists: ArtistResponse[];
  preview_url: string;
}

export interface PlayerResponse {
  item: Song;
}