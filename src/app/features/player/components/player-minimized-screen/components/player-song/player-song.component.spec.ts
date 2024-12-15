import { PlayerSongComponent } from './player-song.component';
import { render } from '@testing-library/angular';

describe(PlayerSongComponent.name, () => {
  it('should create', async () => {
    expect(await render(PlayerSongComponent, {})).toBeTruthy();
  });
});
