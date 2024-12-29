import { ShellComponent } from './shell.component';
import { render } from '@testing-library/angular';
import { ApiService } from './services/api/api.service';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from './store/track/track.reducers';
import * as TrackActions from './store/track/track.actions';

describe(ShellComponent.name, () => {
  const renderOptions = {
    imports: [ShellComponent],
    providers: [ApiService, provideHttpClient(), provideMockStore({ initialState })],
  };

  it('should dispatch an action to fetch active track on init', async () => {
    const { fixture } = await render(ShellComponent, renderOptions);
    const store = TestBed.inject(MockStore);
    const spy = jest.spyOn(store, 'dispatch');

    fixture.componentInstance.ngOnInit();

    expect(spy).toHaveBeenCalledWith(TrackActions.fetchActiveTrack());
  });
});
