import { Banka } from './banka';
export interface Filijala {
  id: number;
  adresa: string;
  brojPultova: number;
  posedujeSef: boolean;
  banka: Banka;
}
