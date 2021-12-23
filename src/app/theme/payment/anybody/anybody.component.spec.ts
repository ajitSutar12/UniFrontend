import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnybodyComponent } from './anybody.component';

describe('AnybodyComponent', () => {
  let component: AnybodyComponent;
  let fixture: ComponentFixture<AnybodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnybodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnybodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
