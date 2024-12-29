import { AppState } from '../reducers';

export const mockInitialState: AppState = {
  track: {
    activeTrack: {
      artist: { id: '1', fullName: 'foobar' },
      name: 'foo',
      image: 'buz',
      url: 'test',
    },
    ui: {
      showSidebar: false,
    },
  },
  artist: {
    artist: {
      id: '2',
      name: 'bar',
      images: [],
      popularity: 100,
      genres: ['afro house', 'rap'],
      href: '',
      followers: {
        total: 1000,
        href: null,
      },
    },
  },
};
