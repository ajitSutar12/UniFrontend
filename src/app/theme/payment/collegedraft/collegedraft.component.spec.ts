import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegedraftComponent } from './collegedraft.component';

describe('CollegedraftComponent', () => {
  let component: CollegedraftComponent;
  let fixture: ComponentFixture<CollegedraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegedraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegedraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
