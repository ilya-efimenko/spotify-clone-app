import { createAction, props } from '@ngrx/store';
import { Artist } from '../../models/artist.interface';

export const fetchArtistById = createAction('[Artist] Fetch Artist By Id');

export const fetchArtistByIdSuccess = createAction('[Artist] Fetch Artist By Id Success', props<{ artist: Artist }>());
