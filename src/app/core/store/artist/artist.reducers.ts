import { createReducer, on } from '@ngrx/store';
import * as ArtistActions from './artist.actions';
import { Artist } from '../../models/artist.interface';

export interface ArtistState {
  artist: Artist;
}

export const initialState: ArtistState = {
  artist: {
    id: '',
    name: '',
    images: [],
    popularity: 0,
    genres: [],
    href: '',
    followers: {
      total: 0,
      href: null,
    },
  },
};

export const reducers = createReducer(
  initialState,
  on(ArtistActions.fetchArtistByIdSuccess, (state, { artist }) => {
    return { ...state, artist };
  })
);
