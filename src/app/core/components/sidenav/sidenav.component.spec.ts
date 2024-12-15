import { SidenavComponent } from './sidenav.component';
import { render } from '@testing-library/angular';

describe(SidenavComponent.name, () => {
  it('should create', async () => {
    expect(await render(SidenavComponent)).toBeTruthy();
  });
});
