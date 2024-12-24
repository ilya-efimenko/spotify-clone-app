import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { ArtistState } from './artist.reducers';

export const selectArtistState = (state: AppState) => state.artist;

export const selectArtist = createSelector(selectArtistState, (state: ArtistState) => state.artist);
