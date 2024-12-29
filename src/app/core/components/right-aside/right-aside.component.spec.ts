import '@testing-library/jest-dom';

import { RightAsideComponent } from './right-aside.component';

import { render, screen } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { selectIsShowingSidebar } from '../../store/track/track.selectors';

describe(RightAsideComponent.name, () => {
  const renderOptions = (showSidebar = false) => ({
    providers: [provideMockStore({ selectors: [{ selector: selectIsShowingSidebar, value: showSidebar }] })],
  });

  it('should be displayed if showSidebar is truthy', async () => {
    await render(RightAsideComponent, renderOptions(true));
    const container = screen.getByTestId('right-aside-container');

    expect(container).toBeInTheDocument();
  });

  it('should not be displayed if showSidebar is falsy', async () => {
    await render(RightAsideComponent, renderOptions());
    const container = screen.queryByTestId('right-aside-container');

    expect(container).toBeNull();
  });
});
