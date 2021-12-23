import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnybodydraftComponent } from './anybodydraft.component';

describe('AnybodydraftComponent', () => {
  let component: AnybodydraftComponent;
  let fixture: ComponentFixture<AnybodydraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnybodydraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnybodydraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
