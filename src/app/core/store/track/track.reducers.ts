import { createReducer, on } from '@ngrx/store';
import * as TrackActions from './track.actions';
import { Track } from '../../models/track.interface';

export interface TrackState {
  activeTrack: Track;
}

export const initialState: TrackState = {
  activeTrack: {
    artist: { id: '', fullName: '' },
    name: '',
    image: '',
    url: '',
  },
};

export const reducers = createReducer(
  initialState,
  on(TrackActions.fetchActiveTrackSuccess, (state, { track }) => {
    return { ...state, activeTrack: track };
  })
);
