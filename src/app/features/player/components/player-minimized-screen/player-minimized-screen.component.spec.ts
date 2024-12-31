import { PlayerMinimizedScreenComponent } from './player-minimized-screen.component';
import { render } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { PlayerStore } from '../../store';
import { provideMockStore } from '@ngrx/store/testing';
import { mockInitialState } from '../../../../core/store/mocks/store.mock';

describe(PlayerMinimizedScreenComponent.name, () => {
  const renderOptions = {
    providers: [PlayerStore, provideHttpClient(), provideMockStore({ initialState: mockInitialState })],
  };

  it('should create', async () => {
    expect(await render(PlayerMinimizedScreenComponent, renderOptions)).toBeTruthy();
  });
});
