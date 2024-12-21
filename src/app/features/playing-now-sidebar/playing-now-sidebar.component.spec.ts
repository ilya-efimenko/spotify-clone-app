import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayingNowSidebarComponent } from './playing-now-sidebar.component';

describe('PlayingNowSidebarComponent', () => {
  let component: PlayingNowSidebarComponent;
  let fixture: ComponentFixture<PlayingNowSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingNowSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayingNowSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
