import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../../../store';

@Component({
  selector: 'app-player-song',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-song.component.html',
  styleUrl: './player-song.component.scss',
})
export class PlayerSongComponent {
  song = input<Song | null>();
}
