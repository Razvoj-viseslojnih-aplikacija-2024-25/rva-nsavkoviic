package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.models.KorisnikUsluge;

public interface KorisnikUslugeRepository extends JpaRepository<KorisnikUsluge, Integer> {
    List<KorisnikUsluge> findByImeContainingIgnoreCase(String ime);
}
