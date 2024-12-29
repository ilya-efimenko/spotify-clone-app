import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { render } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { mockInitialState } from './core/store/mocks/store.mock';

describe(AppComponent.name, () => {
  const renderOptions = {
    imports: [RouterModule.forRoot([])],
    providers: [provideHttpClient(), provideMockStore({ initialState: mockInitialState })],
  };

  it('should create', async () => {
    expect(await render(AppComponent, renderOptions)).toBeTruthy();
  });
});
