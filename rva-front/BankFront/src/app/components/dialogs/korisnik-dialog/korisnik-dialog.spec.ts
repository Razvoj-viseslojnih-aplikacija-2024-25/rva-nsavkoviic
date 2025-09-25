import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikDialog } from './korisnik-dialog';

describe('KorisnikDialog', () => {
  let component: KorisnikDialog;
  let fixture: ComponentFixture<KorisnikDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KorisnikDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
