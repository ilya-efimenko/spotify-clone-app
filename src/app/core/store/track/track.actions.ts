import { createAction, props } from '@ngrx/store';
import { Track } from '../../models/track.interface';

export const fetchActiveTrack = createAction('[Track] Fetch active track');

export const fetchActiveTrackSuccess = createAction('[Track] Fetch active track success', props<{ track: Track }>());
