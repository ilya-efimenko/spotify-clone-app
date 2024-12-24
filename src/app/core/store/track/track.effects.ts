import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TrackActions from './track.actions';
import * as ArtistActions from '../artist/artist.actions';
import { catchError, EMPTY, exhaustMap, switchMap } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { PlayerResponse } from '../../models/response.interface';
import { mapResponse } from '../../mappers/player.mapper';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);
  private readonly api = inject(ApiService);

  fetchActiveTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.fetchActiveTrack),
      exhaustMap(() =>
        this.api.getRequest('me/player/currently-playing').pipe(
          switchMap((response) => [
            TrackActions.fetchActiveTrackSuccess({ track: mapResponse(response as PlayerResponse) }),
            ArtistActions.fetchArtistById(),
          ]),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
