import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NettoyageComponent } from './nettoyage.component';

describe('NettoyageComponent', () => {
  let component: NettoyageComponent;
  let fixture: ComponentFixture<NettoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NettoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NettoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
