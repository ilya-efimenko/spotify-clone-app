import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerMinimizedScreenComponent } from './player-minimized-screen.component';

describe('PlayerMinimizedScreenComponent', () => {
  let component: PlayerMinimizedScreenComponent;
  let fixture: ComponentFixture<PlayerMinimizedScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerMinimizedScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerMinimizedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
