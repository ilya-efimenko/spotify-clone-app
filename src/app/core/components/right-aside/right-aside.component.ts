import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingNowSidebarComponent } from '../../../features/playing-now-sidebar/playing-now-sidebar.component';

@Component({
  selector: 'app-right-aside',
  standalone: true,
  imports: [CommonModule, PlayingNowSidebarComponent],
  templateUrl: './right-aside.component.html',
})
export class RightAsideComponent {}
