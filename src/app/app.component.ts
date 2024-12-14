import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './core/shell.component';

@Component({
  standalone: true,
  imports: [RouterModule, ShellComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'spotify-clone-app';
}
