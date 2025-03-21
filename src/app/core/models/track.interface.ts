export interface Track {
  artist: { id: string; fullName: string };
  name: string;
  image: string;
  url: string;
  progress: {
    progressMs: number;
    durationMs: number;
  };
}
