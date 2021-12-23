import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdraftComponent } from './studentdraft.component';

describe('StudentdraftComponent', () => {
  let component: StudentdraftComponent;
  let fixture: ComponentFixture<StudentdraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentdraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentdraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
