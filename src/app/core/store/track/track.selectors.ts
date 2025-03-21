import { createSelector } from '@ngrx/store';
import { TrackState } from './track.reducers';
import { AppState } from '../reducers';

export const selectTrackState = (state: AppState) => state.track;

export const selectActiveTrack = createSelector(selectTrackState, (state: TrackState) => state.activeTrack);

export const selectActiveTrackArtistId = createSelector(selectActiveTrack, (track) => track.artist.id);

export const selectIsShowingSidebar = createSelector(selectTrackState, (state: TrackState) => state.ui.showSidebar);
