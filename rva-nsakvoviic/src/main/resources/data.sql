-- Banke
INSERT INTO banka (id, pib, kontakt, naziv) VALUES
(DEFAULT, 12345678, '021/123-456', 'Erste Bank'),
(DEFAULT, 87654321, '021/555-999', 'Banca Intesa'),
(DEFAULT, 11223344, '011/333-222', 'Raiffeisen Bank');

-- Filijale
INSERT INTO filijala (banka, broj_pultova, id, poseduje_sef, adresa) VALUES
(1, 5, DEFAULT, TRUE, 'Bulevar Oslobodjenja 100, Novi Sad'),
(2, 8, DEFAULT, TRUE, 'Knez Mihailova 10, Beograd'),
(1, 3, DEFAULT, FALSE, 'Cara Dusana 55, Novi Sad'),
(3, 6, DEFAULT, TRUE, 'Trg Republike 1, Beograd');

-- Korisnici usluga
INSERT INTO korisnik_usluge (id, ime, maticni_broj, prezime) VALUES
(DEFAULT, 'Marko', '0101990123456', 'Markovic'),
(DEFAULT, 'Jelena', '0202990789123', 'Jovanovic'),
(DEFAULT, 'Petar', '1503990123987', 'Petrovic'),
(DEFAULT, 'Ana', '0904990789456', 'Nikolic');

-- Usluge
INSERT INTO usluga (datum_ugovora, filijala, id, korisnik, provizija, naziv, opis_usluge) VALUES
(TO_DATE('01.03.2025','DD.MM.YYYY'), 1, DEFAULT, 1, 150.00, 'Tekuci racun', 'Otvranje tekućeg racuna'),
(TO_DATE('08.03.2025','DD.MM.YYYY'), 2, DEFAULT, 2, 200.00, 'Stedni racun', 'Otvranje stednog racuna'),
(TO_DATE('15.03.2025','DD.MM.YYYY'), 1, DEFAULT, 3, 1000.00, 'Kredit', 'Stambeni kredit'),
(TO_DATE('20.03.2025','DD.MM.YYYY'), 4, DEFAULT, 4, 50.00, 'Kartica', 'Visa Classic kartica');
