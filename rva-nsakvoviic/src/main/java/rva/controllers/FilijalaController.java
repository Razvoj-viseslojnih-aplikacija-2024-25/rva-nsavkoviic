package rva.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.implementation.BankaServiceImpl;
import rva.implementation.FilijalaServiceImpl;
import rva.models.Banka;
import rva.models.Filijala;

@RestController
public class FilijalaController {

    @Autowired
    private FilijalaServiceImpl service;
    private BankaServiceImpl bankaService;

    @GetMapping("/filijala")
    public ResponseEntity<?> getAllFilijale() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/filijala/adresa/{adresa}")
    public ResponseEntity<?> getFilijaleByAdresa(@PathVariable String adresa) {
        List<Filijala> filijale = service.getFilijaleByAdresa(adresa);
        if (filijale.isEmpty())
            return new ResponseEntity<>(String.format("No filijale exist with adresa: %s", adresa), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(filijale);
    }

    @GetMapping("/filijala/id/{id}")
    public ResponseEntity<?> getFilijalaById(@PathVariable int id) {
        Optional<Filijala> filijala = service.findById(id);
        if (filijala.isEmpty())
            return new ResponseEntity<>(String.format("Resource with id: %s does not exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(filijala.get());
    }

    @PostMapping("/filijala")
    public ResponseEntity<?> createFilijala(@RequestBody Filijala filijala) {
        if (service.existsById(filijala.getId()))
            return new ResponseEntity<>(String.format("Entity with id: %s already exists", filijala.getId()), HttpStatus.CONFLICT);
        Filijala created = service.create(filijala);
        URI uri = URI.create("/filijala/id/" + created.getId());
        return ResponseEntity.created(uri).body(created);
    }

    @PutMapping("/filijala/{id}")
    public ResponseEntity<?> updateFilijala(@PathVariable int id, @RequestBody Filijala filijala) {
        Optional<Filijala> updated = service.update(filijala, id);
        if (updated.isEmpty())
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(updated.get());
    }

    @DeleteMapping("/filijala/{id}")
    public ResponseEntity<?> deleteFilijala(@PathVariable int id) {
        if (!service.existsById(id))
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        service.delete(id);
        return ResponseEntity.ok(String.format("Entity with id: %s has been deleted", id));
    }

    @GetMapping("/filijala/banka/{bankaId}")
    public ResponseEntity<?> getFilijaleByBanka(@PathVariable int bankaId){
        Optional<Banka> banka = bankaService.findById(bankaId);
        if(banka.isEmpty())
            return new ResponseEntity<>(String.format("Banka with id: %s doesnt exist", bankaId), HttpStatus.NOT_FOUND);
        List<Filijala> filijale = service.getFilijaleByBanka(banka.get());
        if(filijale.isEmpty())
            return new ResponseEntity<>(String.format("No filijale with banka id: %s", bankaId), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(filijale);
    }
}
