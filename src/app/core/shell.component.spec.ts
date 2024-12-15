import { ShellComponent } from './shell.component';
import { render } from '@testing-library/angular';
import { ApiService } from './services/api/api.service';
import { provideHttpClient } from '@angular/common/http';

describe(ShellComponent.name, () => {
  const renderOptions = {
    providers: [ApiService, provideHttpClient()],
  };

  it('should create', async () => {
    expect(await render(ShellComponent, renderOptions)).toBeTruthy();
  });
});
