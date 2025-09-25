import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilijalaDialog } from './filijala-dialog';

describe('FilijalaDialog', () => {
  let component: FilijalaDialog;
  let fixture: ComponentFixture<FilijalaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilijalaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilijalaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
