import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export enum ScreenMode {
  FULL,
  MINIMIZED,
}

export enum SongAction {
  PLAY,
  PAUSE,
}

export interface PlayerState {
  ui: UiState;
}

export interface UiState {
  screenMode: ScreenMode;
  songAction: SongAction;
}

const initialState = {
  ui: {
    screenMode: ScreenMode.MINIMIZED,
    songAction: SongAction.PLAY,
  },
};

@Injectable()
export class PlayerStore extends ComponentStore<PlayerState> {
  constructor() {
    super(initialState);
  }

  /** SELECTORS ----------------------------------------------------------- */
  readonly ui$: Observable<UiState> = this.select((state) => state.ui);

  readonly screenMode$: Observable<ScreenMode> = this.select(this.ui$, (ui) => ui.screenMode);

  readonly songAction$: Observable<SongAction> = this.select(this.ui$, (ui) => ui.songAction);

  /** UPDATERS ----------------------------------------------------------- */
  readonly updateScreenMode = this.updater<ScreenMode>((state, screenMode: ScreenMode) => ({
    ...state,
    ui: {
      ...state.ui,
      screenMode,
    },
  }));

  readonly updateSongAction = this.updater<SongAction>((state, songAction: SongAction) => ({
    ...state,
    ui: {
      ...state.ui,
      songAction,
    },
  }));
}
