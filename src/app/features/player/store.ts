import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, Observable, tap, throwError, withLatestFrom } from 'rxjs';
import { ApiService } from '../../core/services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mapResponse } from './mappers/player.mapper';
import { ArtistResponse, PlayerResponse } from './models/response.interface';

export enum ScreenMode {
  FULL,
  MINIMIZED
}

export enum SongAction {
  PLAY,
  PAUSE
}

export interface PlayerState {
  ui: UiState,
  activeSong: SongState,
  artist: Artist
}

export interface UiState {
  screenMode: ScreenMode,
  songAction: SongAction
}

export interface SongState {
  artistName: string;
  name: string;
  image: string;
  url: string;
  // TBD, progress 
}

export interface Song {
  artistName: string;
  name: string;
  image: string;
  url: string;
}

export interface Artist {
  id: string;
  name?: string;
  imageUrls?: string[]
}

const initialState = {
  ui: {
    screenMode: ScreenMode.MINIMIZED,
    songAction: SongAction.PLAY
  },
  activeSong: {
    artistName: '',
    name: '',
    image: '',
    url: ''
  },
  artist: {
    id: '',
    name: '',
    images: []
  }
};

@Injectable()
export class PlayerStore extends ComponentStore<PlayerState> {
  private readonly api = inject(ApiService);
  
  constructor() {
    super(initialState);
  }

  /** SELECTORS ----------------------------------------------------------- */
  readonly ui$: Observable<UiState> = this.select(state => state.ui);
  readonly song$: Observable<SongState> = this.select(state => state.activeSong);
  readonly artist$: Observable<Artist> = this.select(state => state.artist);

  readonly screenMode$: Observable<ScreenMode> = this.select(
    this.ui$,
    ui => ui.screenMode
  );

  readonly songAction$: Observable<SongAction> = this.select(
    this.ui$,
    ui => ui.songAction
  );

  /** UPDATERS ----------------------------------------------------------- */
  readonly updateScreenMode = this.updater<ScreenMode>((state, screenMode: ScreenMode) => ({
    ...state,
    ui: {
      ...state.ui,
      screenMode
    }
  }));

  readonly updateSongAction = this.updater<SongAction>((state, songAction: SongAction) => ({
    ...state,
    ui: {
      ...state.ui,
      songAction
    }
  }));

  readonly updateActiveSong = this.updater<Song>((state, song: Song) => ({
    ...state,
    activeSong: song
  }));

  readonly updateArtist = this.updater<Artist>((state, artist: Artist) => ({
    ...state,
    artist
  }));

  /** EFFECTS ----------------------------------------------------------- */
  readonly fetchPlayer = this.effect<void>(
    (trigger$) => trigger$.pipe(
      exhaustMap(() =>
        (this.api.getRequest('me/player') as Observable<PlayerResponse>).pipe(
          tap({
            next: (response) => {
              if (!response) {
                return; 
              }

              const activeSong = mapResponse(response);
              this.updateActiveSong(activeSong);

              // full screen
              const { id } = response.item.artists[0];
              this.updateArtist({id});
            },
            error: (error: HttpErrorResponse) => throwError(() => error),
          })
        )
      )
    )
  );

  readonly fetchArtist = this.effect<void>(
    (trigger$) => trigger$.pipe(
      withLatestFrom(this.artist$),
      exhaustMap(([, artist]) => 
        (this.api.getRequest(`artists/${artist.id}`) as Observable<ArtistResponse>).pipe(
          tap({
            next: (response) => {
              const { id, name, images } = response;
              const imageUrls = images.map((img: { url: string; }) => img.url);
              this.updateArtist({id, name, imageUrls});
            },
            error: (error: HttpErrorResponse) => throwError(() => error),
          })
        )
      )
    )
  );
}