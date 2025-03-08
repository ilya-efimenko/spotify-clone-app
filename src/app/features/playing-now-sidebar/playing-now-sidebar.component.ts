import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectActiveTrack } from '../../core/store/track/track.selectors';
import { selectArtist } from '../../core/store/artist/artist.selectors';
import * as TrackActions from '../../core/store/track/track.actions';
import { initialState } from '../../core/store/track/track.reducers';

@Component({
  selector: 'app-playing-now-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playing-now-sidebar.component.html',
})
export class PlayingNowSidebarComponent {
  private readonly store = inject(Store);

  readonly initialTrack = initialState.activeTrack;

  public track = toSignal(this.store.select(selectActiveTrack));
  public artist = toSignal(this.store.select(selectArtist));

  public onCloseSidebar(): void {
    this.store.dispatch(TrackActions.toggleSidebar({ showSidebar: false }));
  }
}
