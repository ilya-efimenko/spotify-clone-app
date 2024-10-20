import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";

export enum ScreenMode {
  FULL,
  MINIMIZED
}

export interface PlayerState {
  ui: UiState
}

export interface UiState {
  screenMode: ScreenMode
}

@Injectable()
export class PlayerStore extends ComponentStore<PlayerState> {
  
  constructor() {
    super({ui: {screenMode: ScreenMode.MINIMIZED}});
  }

  /** SELECTORS ----------------------------------------------------------- */
  readonly ui$: Observable<UiState> = this.select(state => state.ui);

  readonly screenMode$: Observable<ScreenMode> = this.select(
    this.ui$,
    ui => ui.screenMode
  );

  /** UPDATERS ----------------------------------------------------------- */
  readonly updateScreenMode = this.updater<ScreenMode>((state, screenMode: ScreenMode) => ({
    ...state,
    ui: {
      ...state.ui,
      screenMode
    }
  }));
}