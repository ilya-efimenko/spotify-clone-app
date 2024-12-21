import { ActionReducerMap } from '@ngrx/store';
import { TrackState, reducers as trackReducer } from './track/track.reducers';

export interface AppState {
  track: TrackState;
}

export const reducers: ActionReducerMap<AppState> = {
  track: trackReducer,
};
