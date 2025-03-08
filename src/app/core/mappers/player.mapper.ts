import { PlayerResponse } from '../models/response.interface';
import { Track } from '../models/track.interface';

export const mapResponse = (response: PlayerResponse): Track => {
  const {
    item: { album, artists, preview_url: previewUrl, duration_ms: durationMs },
  } = response;

  const progressMs = response.progress_ms ?? 0;

  const artistName = artists.map((artist) => artist.name).join(', ');
  const image = album.images?.find((img) => img.height === 640)?.url || '';

  return {
    artist: { id: artists[0].id ?? '', fullName: artistName },
    name: album.name,
    image,
    url: previewUrl,
    progress: {
      progressMs,
      durationMs,
    },
  };
};
