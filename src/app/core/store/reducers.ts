import { ActionReducerMap } from '@ngrx/store';
import { TrackState, reducers as trackReducer } from './track/track.reducers';
import { ArtistState, reducers as artistReducer } from './artist/artist.reducers';

export interface AppState {
  track: TrackState;
  artist: ArtistState;
}

export const reducers: ActionReducerMap<AppState> = {
  track: trackReducer,
  artist: artistReducer,
};
