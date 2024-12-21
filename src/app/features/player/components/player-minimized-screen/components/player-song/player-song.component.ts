import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../../../../../core/models/track.interface';

@Component({
  selector: 'app-player-song',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-song.component.html',
})
export class PlayerSongComponent {
  song = input<Track | null>();
}
