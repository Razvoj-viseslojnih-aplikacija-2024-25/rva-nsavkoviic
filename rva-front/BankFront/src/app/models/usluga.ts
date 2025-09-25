import { Filijala } from './filijala';
import { KorisnikUsluge } from './korisnik';
export interface Usluga {
  id: number;
  naziv: string;
  opisUsluge: string;
  datumUgovora: string; // ISO date string
  provizija: number;
  filijala: Filijala;
  korisnik: KorisnikUsluge;
}
