import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PlayerComponent } from '../features/player/player.component';
import { PlayerStore } from '../features/player/store';
import { RightAsideComponent } from './components/right-aside/right-aside.component';
import { Store } from '@ngrx/store';
import * as TrackActions from './store/track/track.actions';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PlayerComponent, RightAsideComponent],
  providers: [PlayerStore],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit(): void {
    this.store.dispatch(TrackActions.fetchActiveTrack());
  }
}
