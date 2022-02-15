import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomatComponent } from './economat.component';

describe('EconomatComponent', () => {
  let component: EconomatComponent;
  let fixture: ComponentFixture<EconomatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EconomatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
