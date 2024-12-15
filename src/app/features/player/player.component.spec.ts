import { PlayerComponent } from './player.component';
import { provideHttpClient } from '@angular/common/http';

import { render } from '@testing-library/angular';

describe(PlayerComponent.name, () => {
  const renderOptions = {
    providers: [provideHttpClient()],
  };

  it('should create', async () => {
    expect(await render(PlayerComponent, renderOptions)).toBeTruthy();
  });
});
