package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.models.Banka;
import rva.models.Filijala;

public interface FilijalaRepository extends JpaRepository<Filijala, Integer> {
    List<Filijala> findByAdresaContainingIgnoreCase(String adresa);
    List<Filijala> findByBanka(Banka banka);
}
