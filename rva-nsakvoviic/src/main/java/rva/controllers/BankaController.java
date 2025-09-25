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
import rva.models.Banka;

@RestController
public class BankaController {

    @Autowired
    private BankaServiceImpl service;

    @GetMapping("/banka")
    public ResponseEntity<?> getAllBanke() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/banka/naziv/{naziv}")
    public ResponseEntity<?> getBankeByNaziv(@PathVariable String naziv) {
        List<Banka> banke = service.getBankeByNaziv(naziv);
        if (banke.isEmpty())
            return new ResponseEntity<>(String.format("No banks exist with naziv: %s", naziv), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(banke);
    }

    @GetMapping("/banka/id/{id}")
    public ResponseEntity<?> getBankaById(@PathVariable int id) {
        Optional<Banka> banka = service.findById(id);
        if (banka.isEmpty())
            return new ResponseEntity<>(String.format("Resource with id: %s does not exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(banka.get());
    }

    @PostMapping("/banka")
    public ResponseEntity<?> createBanka(@RequestBody Banka banka) {
        if (service.existsById(banka.getId()))
            return new ResponseEntity<>(String.format("Entity with id: %s already exists", banka.getId()), HttpStatus.CONFLICT);
        Banka created = service.create(banka);
        URI uri = URI.create("/banka/id/" + created.getId());
        return ResponseEntity.created(uri).body(created);
    }

    @PutMapping("/banka/{id}")
    public ResponseEntity<?> updateBanka(@PathVariable int id, @RequestBody Banka banka) {
        Optional<Banka> updated = service.update(banka, id);
        if (updated.isEmpty())
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(updated.get());
    }

    @DeleteMapping("/banka/{id}")
    public ResponseEntity<?> deleteBanka(@PathVariable int id) {
        if (!service.existsById(id))
            return new ResponseEntity<>(String.format("Entity with id: %s doesnt exist", id), HttpStatus.NOT_FOUND);
        service.delete(id);
        return ResponseEntity.ok(String.format("Entity with id: %s has been deleted", id));
    }
}
