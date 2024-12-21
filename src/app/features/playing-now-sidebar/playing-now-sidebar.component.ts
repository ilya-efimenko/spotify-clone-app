import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActiveTrack } from '../../core/store/track/track.selectors';
import { Track } from '../../core/models/track.interface';

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

  private readonly store = inject(Store);
}
