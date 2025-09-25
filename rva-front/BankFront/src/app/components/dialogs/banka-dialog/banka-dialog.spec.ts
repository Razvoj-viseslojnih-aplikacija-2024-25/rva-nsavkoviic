import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankaDialog } from './banka-dialog';

describe('BankaDialog', () => {
  let component: BankaDialog;
  let fixture: ComponentFixture<BankaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
