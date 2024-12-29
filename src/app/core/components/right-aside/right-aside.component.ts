import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingNowSidebarComponent } from '../../../features/playing-now-sidebar/playing-now-sidebar.component';
import { Store } from '@ngrx/store';
import { selectIsShowingSidebar } from '../../store/track/track.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-right-aside',
  standalone: true,
  imports: [CommonModule, PlayingNowSidebarComponent],
  templateUrl: './right-aside.component.html',
})
export class RightAsideComponent {
  public get showSidebar$(): Observable<boolean> {
    return this.store.select(selectIsShowingSidebar);
  }

  private readonly store = inject(Store);
}
