import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerFullScreenComponent } from './player-full-screen.component';

describe('PlayerFullScreenComponent', () => {
  let component: PlayerFullScreenComponent;
  let fixture: ComponentFixture<PlayerFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerFullScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
