import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEpisodeComponent } from './single-episode.component';

describe('SingleEpisodeComponent', () => {
  let component: SingleEpisodeComponent;
  let fixture: ComponentFixture<SingleEpisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEpisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
