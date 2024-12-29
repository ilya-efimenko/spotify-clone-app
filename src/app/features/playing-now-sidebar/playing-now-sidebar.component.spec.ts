import '@testing-library/jest-dom';
import { PlayingNowSidebarComponent } from './playing-now-sidebar.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { provideHttpClient } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import * as TrackActions from '../../core/store/track/track.actions';
import { mockInitialState } from '../../core/store/mocks/store.mock';

describe(PlayingNowSidebarComponent.name, () => {
  const renderOptions = {
    imports: [PlayingNowSidebarComponent],
    providers: [provideHttpClient(), provideMockStore({ initialState: mockInitialState })],
  };

  it('should display active track name in header and as a link', async () => {
    await render(PlayingNowSidebarComponent, renderOptions);
    const name = screen.getAllByText('foo');

    expect(name).toHaveLength(2);
  });

  it('should display artist info', async () => {
    await render(PlayingNowSidebarComponent, renderOptions);
    const artistName = screen.getByText('foobar');
    const followers = screen.getByText('1000 followers');
    const genres = screen.getByText('Artist genres: afro house, rap');

    expect(artistName).toBeInTheDocument();
    expect(followers).toBeInTheDocument();
    expect(genres).toBeInTheDocument();
  });

  it('should dispatch an action to close sidebar on click', async () => {
    await render(PlayingNowSidebarComponent, renderOptions);
    const btn = screen.getByTestId('close-btn');
    const store = TestBed.inject(MockStore);
    const spy = jest.spyOn(store, 'dispatch');

    fireEvent.click(btn);

    expect(spy).toHaveBeenCalledWith(TrackActions.toggleSidebar({ showSidebar: false }));
  });
});
