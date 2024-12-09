import { PlayerResponse } from '../models/response.interface';

export const mapResponse = (response: PlayerResponse) => {
  const {
    item: { album, artists, preview_url: previewUrl },
  } = response;

  const artistName = artists.map((artist) => artist.name).join(', ');
  const image = album.images?.find((img) => img.height === 64)?.url || '';

  return {
    artistName,
    name: album.name,
    image,
    url: previewUrl,
  };
};
