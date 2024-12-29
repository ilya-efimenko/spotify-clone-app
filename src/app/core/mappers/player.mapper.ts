import { PlayerResponse } from '../models/response.interface';

export const mapResponse = (response: PlayerResponse) => {
  const {
    item: { album, artists, preview_url: previewUrl },
  } = response;

  const artistName = artists.map((artist) => artist.name).join(', ');
  const image = album.images?.find((img) => img.height === 640)?.url || '';

  return {
    artist: { id: artists[0].id ?? '', fullName: artistName },
    name: album.name,
    image,
    url: previewUrl,
  };
};
