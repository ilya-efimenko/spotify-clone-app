import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { render } from '@testing-library/angular';

describe(AppComponent.name, () => {
  const renderOptions = {
    imports: [RouterModule.forRoot([])],
    providers: [provideHttpClient()],
  };

  it('should create', async () => {
    expect(await render(AppComponent, renderOptions)).toBeTruthy();
  });
});
