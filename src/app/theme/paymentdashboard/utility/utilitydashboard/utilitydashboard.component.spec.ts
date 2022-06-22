import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitydashboardComponent } from './utilitydashboard.component';

describe('UtilitydashboardComponent', () => {
  let component: UtilitydashboardComponent;
  let fixture: ComponentFixture<UtilitydashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitydashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
