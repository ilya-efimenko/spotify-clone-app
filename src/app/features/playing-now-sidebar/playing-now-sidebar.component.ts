import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActiveTrack } from '../../core/store/track/track.selectors';
import { Track } from '../../core/models/track.interface';
import { selectArtist } from '../../core/store/artist/artist.selectors';
import { Artist } from '../../core/models/artist.interface';
import * as TrackActions from '../../core/store/track/track.actions';

@Component({
  selector: 'app-playing-now-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playing-now-sidebar.component.html',
})
export class PlayingNowSidebarComponent {
  public get track$(): Observable<Track> {
    return this.store.select(selectActiveTrack);
  }

  public get artist$(): Observable<Artist> {
    return this.store.select(selectArtist);
  }

  private readonly store = inject(Store);

  public onCloseSidebar(): void {
    this.store.dispatch(TrackActions.toggleSidebar({ showSidebar: false }));
  }
}
