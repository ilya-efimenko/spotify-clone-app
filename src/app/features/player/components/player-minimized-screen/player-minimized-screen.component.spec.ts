import { PlayerMinimizedScreenComponent } from './player-minimized-screen.component';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { PlayerStore } from '../../store';

describe(PlayerMinimizedScreenComponent.name, () => {
  const renderOptions = {
    providers: [PlayerStore, provideHttpClient()],
  };

  it('should create', async () => {
    expect(await render(PlayerMinimizedScreenComponent, renderOptions)).toBeTruthy();
  });
});
