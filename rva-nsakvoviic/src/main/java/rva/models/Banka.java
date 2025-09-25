package rva.models;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Banka implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "BANKA_ID_GEN", sequenceName = "BANKA_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BANKA_ID_GEN")
    private int id;

    private String naziv;
    private String kontakt;
    private int pib;

    @OneToMany(mappedBy = "banka")
    @JsonIgnore
    private List<Filijala> filijale;

    public Banka() {
        super();
    }

    public Banka(int id, String naziv, String kontakt, int pib) {
        super();
        this.id = id;
        this.naziv = naziv;
        this.kontakt = kontakt;
        this.pib = pib;
    }

    // getteri i setteri
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNaziv() { return naziv; }
    public void setNaziv(String naziv) { this.naziv = naziv; }

    public String getKontakt() { return kontakt; }
    public void setKontakt(String kontakt) { this.kontakt = kontakt; }

    public int getPib() { return pib; }
    public void setPib(int pib) { this.pib = pib; }

    public List<Filijala> getFilijale() { return filijale; }
    public void setFilijale(List<Filijala> filijale) { this.filijale = filijale; }
}