import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StcokOptionsComponent } from './stcok-options.component';

describe('StcokOptionsComponent', () => {
  let component: StcokOptionsComponent;
  let fixture: ComponentFixture<StcokOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StcokOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StcokOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
