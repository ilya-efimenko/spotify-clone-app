import { HeaderComponent } from './header.component';
import { render } from '@testing-library/angular';

describe(HeaderComponent.name, () => {
  it('should create', async () => {
    expect(await render(HeaderComponent)).toBeTruthy();
  });
});
