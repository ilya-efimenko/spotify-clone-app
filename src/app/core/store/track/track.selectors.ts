import { createSelector } from '@ngrx/store';
import { TrackState } from './track.reducers';
import { AppState } from '../reducers';

export const selectTrackState = (state: AppState) => state.track;

export const selectActiveTrack = createSelector(selectTrackState, (state: TrackState) => state.activeTrack);
