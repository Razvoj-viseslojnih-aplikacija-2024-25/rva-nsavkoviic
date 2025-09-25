import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugaDialog } from './usluga-dialog';

describe('UslugaDialog', () => {
  let component: UslugaDialog;
  let fixture: ComponentFixture<UslugaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UslugaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UslugaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
