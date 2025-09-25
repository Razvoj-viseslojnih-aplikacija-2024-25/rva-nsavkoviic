package rva.services;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.models.Banka;
import rva.models.Filijala;

@Service
public interface FilijalaService extends CrudService<Filijala> {
    List<Filijala> getFilijaleByAdresa(String adresa);
    List<Filijala> getFilijaleByBanka(Banka banka);
}
