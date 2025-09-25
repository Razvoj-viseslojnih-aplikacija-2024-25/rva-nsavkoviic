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

import rva.implementation.FilijalaServiceImpl;
import rva.implementation.KorisnikUslugeServiceImpl;
import rva.implementation.UslugaServiceImpl;
import rva.models.Filijala;
import rva.models.KorisnikUsluge;
import rva.models.Usluga;

@RestController
public class UslugaController {

    @Autowired
    private UslugaServiceImpl service;
    private FilijalaServiceImpl filijalaService;
    private KorisnikUslugeServiceImpl korisnikService;

    @GetMapping("/usluga")
    public ResponseEntity<?> getAllUsluge() { return ResponseEntity.ok(service.getAll()); }

    @GetMapping("/usluga/naziv/{naziv}")
    public ResponseEntity<?> getUslugeByNaziv(@PathVariable String naziv) {
        List<Usluga> usluge = service.getUslugeByNaziv(naziv);
        if (usluge.isEmpty())
            return new ResponseEntity<>(String.format("No usluge exist with naziv: %s", naziv), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(usluge);
    }

    @GetMapping("/usluga/id/{id}")
    public ResponseEntity<?> getUslugaById(@PathVariable int id) {
        Optional<Usluga> usluga = service.findById(id);
        if (usluga.isEmpty())
            return new ResponseEntity<>(String.format("Resource with id: %s does not exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(usluga.get());
    }

    @PostMapping("/usluga")
    public ResponseEntity<?> createUsluga(@RequestBody Usluga usluga) {
        if (service.existsById(usluga.getId()))
            return new ResponseEntity<>(String.format("Entity with id: %s already exists", usluga.getId()), HttpStatus.CONFLICT);
        Usluga created = service.create(usluga);
        URI uri = URI.create("/usluga/id/" + created.getId());
        return ResponseEntity.created(uri).body(created);
    }

    @PutMapping("/usluga/{id}")
    public ResponseEntity<?> updateUsluga(@PathVariable int id, @RequestBody Usluga usluga) {
        Optional<Usluga> updated = service.update(usluga, id);
        if (updated.isEmpty())
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(updated.get());
    }

    @DeleteMapping("/usluga/{id}")
    public ResponseEntity<?> deleteUsluga(@PathVariable int id) {
        if (!service.existsById(id))
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        service.delete(id);
        return ResponseEntity.ok(String.format("Entity with id: %s has been deleted", id));
    }

    @GetMapping("/usluga/filijala/{filijalaId}")
    public ResponseEntity<?> getUslugeByFilijala(@PathVariable int filijalaId){
        Optional<Filijala> filijala = filijalaService.findById(filijalaId);
        if(filijala.isEmpty())
            return new ResponseEntity<>(String.format("Filijala with id: %s doesnt exist", filijalaId), HttpStatus.NOT_FOUND);
        List<Usluga> usluge = service.getUslugeByFilijala(filijala.get());
        if(usluge.isEmpty())
            return new ResponseEntity<>(String.format("No usluge with filijala id: %s", filijalaId), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(usluge);
    }

    @GetMapping("/usluga/korisnik/{korisnikId}")
    public ResponseEntity<?> getUslugeByKorisnik(@PathVariable int korisnikId){
        Optional<KorisnikUsluge> korisnik = korisnikService.findById(korisnikId);
        if(korisnik.isEmpty())
            return new ResponseEntity<>(String.format("Korisnik with id: %s doesnt exist", korisnikId), HttpStatus.NOT_FOUND);
        List<Usluga> usluge = service.getUslugeByKorisnik(korisnik.get());
        if(usluge.isEmpty())
            return new ResponseEntity<>(String.format("No usluge with korisnik id: %s", korisnikId), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(usluge);
    }
}
