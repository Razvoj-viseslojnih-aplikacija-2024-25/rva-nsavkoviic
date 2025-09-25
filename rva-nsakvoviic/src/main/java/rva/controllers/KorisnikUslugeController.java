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
import rva.implementation.KorisnikUslugeServiceImpl;
import rva.models.KorisnikUsluge;

@RestController
public class KorisnikUslugeController {

    @Autowired
    private KorisnikUslugeServiceImpl service;

    @GetMapping("/korisnik")
    public ResponseEntity<?> getAllKorisnici() { return ResponseEntity.ok(service.getAll()); }

    @GetMapping("/korisnik/ime/{ime}")
    public ResponseEntity<?> getKorisniciByIme(@PathVariable String ime) {
        List<KorisnikUsluge> korisnici = service.getKorisniciByIme(ime);
        if (korisnici.isEmpty())
            return new ResponseEntity<>(String.format("No korisnici exist with ime: %s", ime), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(korisnici);
    }

    @GetMapping("/korisnik/id/{id}")
    public ResponseEntity<?> getKorisnikById(@PathVariable int id) {
        Optional<KorisnikUsluge> korisnik = service.findById(id);
        if (korisnik.isEmpty())
            return new ResponseEntity<>(String.format("Resource with id: %s does not exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(korisnik.get());
    }

    @PostMapping("/korisnik")
    public ResponseEntity<?> createKorisnik(@RequestBody KorisnikUsluge korisnik) {
        if (service.existsById(korisnik.getId()))
            return new ResponseEntity<>(String.format("Entity with id: %s already exists", korisnik.getId()), HttpStatus.CONFLICT);
        KorisnikUsluge created = service.create(korisnik);
        URI uri = URI.create("/korisnik/id/" + created.getId());
        return ResponseEntity.created(uri).body(created);
    }

    @PutMapping("/korisnik/{id}")
    public ResponseEntity<?> updateKorisnik(@PathVariable int id, @RequestBody KorisnikUsluge korisnik) {
        Optional<KorisnikUsluge> updated = service.update(korisnik, id);
        if (updated.isEmpty())
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(updated.get());
    }

    @DeleteMapping("/korisnik/{id}")
    public ResponseEntity<?> deleteKorisnik(@PathVariable int id) {
        if (!service.existsById(id))
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        service.delete(id);
        return ResponseEntity.ok(String.format("Entity with id: %s has been deleted", id));
    }
}
