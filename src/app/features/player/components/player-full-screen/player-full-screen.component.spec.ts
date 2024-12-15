import { PlayerFullScreenComponent } from './player-full-screen.component';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { PlayerStore } from '../../store';

describe(PlayerFullScreenComponent.name, () => {
  const renderOptions = {
    providers: [PlayerStore, provideHttpClient()],
  };

  it('should create', async () => {
    expect(await render(PlayerFullScreenComponent, renderOptions)).toBeTruthy();
  });
});
