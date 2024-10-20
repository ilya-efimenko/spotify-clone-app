import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionButtonListComponent } from './action-button-list.component';

describe('ActionButtonListComponent', () => {
  let component: ActionButtonListComponent;
  let fixture: ComponentFixture<ActionButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
