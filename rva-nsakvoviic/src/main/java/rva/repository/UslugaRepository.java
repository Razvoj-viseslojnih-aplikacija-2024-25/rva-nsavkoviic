package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.models.Filijala;
import rva.models.KorisnikUsluge;
import rva.models.Usluga;

public interface UslugaRepository extends JpaRepository<Usluga, Integer> {
    List<Usluga> findByNazivContainingIgnoreCase(String naziv);
    List<Usluga> findByFilijala(Filijala filijala);
    List<Usluga> findByKorisnik(KorisnikUsluge korisnik);
}