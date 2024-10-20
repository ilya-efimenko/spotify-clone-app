import { inject, Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, EMPTY, exhaustMap, Observable, tap } from "rxjs";
import { ApiService } from '../../core/services/api/api.service';
import { HttpErrorResponse } from "@angular/common/http";

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
  private readonly api = inject(ApiService);
  
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

  /** EFFECTS ----------------------------------------------------------- */
  readonly fetchPlayer = this.effect<void>(
    (trigger$) => trigger$.pipe(
      exhaustMap(() =>
        this.api.getRequest('me/player').pipe(
          tap({
            next: (data) => console.log(data),
            error: (error: HttpErrorResponse) => console.log(error),
          })
        )
      )
    )
  );
}