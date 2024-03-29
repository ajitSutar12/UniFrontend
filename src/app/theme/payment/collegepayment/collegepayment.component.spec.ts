import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegepaymentComponent } from './collegepayment.component';

describe('CollegepaymentComponent', () => {
  let component: CollegepaymentComponent;
  let fixture: ComponentFixture<CollegepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
