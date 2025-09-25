package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.models.Banka;

public interface BankaRepository extends JpaRepository<Banka,Integer>{

	List<Banka> findByNazivContainingIgnoreCase(String naziv);
}
