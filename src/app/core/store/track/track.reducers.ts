import { createReducer, on } from '@ngrx/store';
import * as TrackActions from './track.actions';
import { Track } from '../../models/track.interface';

interface UiState {
  showSidebar: boolean;
}

export interface TrackState {
  activeTrack: Track;
  ui: UiState;
}

export const initialState: TrackState = {
  activeTrack: {
    artist: { id: '', fullName: '' },
    name: '',
    image: '',
    url: '',
  },
  ui: {
    showSidebar: false,
  },
};

export const reducers = createReducer(
  initialState,
  on(TrackActions.fetchActiveTrackSuccess, (state, { track }) => {
    return { ...state, activeTrack: track };
  }),

  on(TrackActions.toggleSidebar, (state, { showSidebar }) => {
    return { ...state, ui: { ...state.ui, showSidebar } };
  })
);
