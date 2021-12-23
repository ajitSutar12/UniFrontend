import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnybodypaymentComponent } from './anybodypayment.component';

describe('AnybodypaymentComponent', () => {
  let component: AnybodypaymentComponent;
  let fixture: ComponentFixture<AnybodypaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnybodypaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnybodypaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
