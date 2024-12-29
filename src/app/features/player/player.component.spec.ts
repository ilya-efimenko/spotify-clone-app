import { PlayerComponent } from './player.component';
import { provideHttpClient } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';

import { render } from '@testing-library/angular';
import { mockInitialState } from '../../core/store/mocks/store.mock';

describe(PlayerComponent.name, () => {
  const renderOptions = {
    providers: [provideHttpClient(), provideMockStore({ initialState: mockInitialState })],
  };

  it('should create', async () => {
    expect(await render(PlayerComponent, renderOptions)).toBeTruthy();
  });
});
