import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { ApiService } from '../../services/api/api.service';
import * as ArtistActions from './artist.actions';
import * as TrackSelectors from '../track/track.selectors';

import { Artist } from '../../models/artist.interface';
import { Store } from '@ngrx/store';

@Injectable()
export class ArtistEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private readonly api = inject(ApiService);

  fetchArtistById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArtistActions.fetchArtistById),
      concatLatestFrom(() => this.store.select(TrackSelectors.selectActiveTrackArtistId)),
      exhaustMap(([, artistId]) =>
        this.api.getRequest(`artists/${artistId}`).pipe(
          map((response) => ArtistActions.fetchArtistByIdSuccess({ artist: response as Artist })),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
