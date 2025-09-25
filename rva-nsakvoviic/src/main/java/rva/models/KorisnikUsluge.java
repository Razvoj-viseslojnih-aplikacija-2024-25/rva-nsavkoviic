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
public class KorisnikUsluge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "KORISNIK_ID_GEN", sequenceName = "KORISNIK_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "KORISNIK_ID_GEN")
    private int id;

    private String ime;
    private String prezime;
    private String maticniBroj;

    @OneToMany(mappedBy = "korisnik")
    @JsonIgnore
    private List<Usluga> usluge;

    public KorisnikUsluge() {}

    // Getteri i setteri
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getIme() { return ime; }
    public void setIme(String ime) { this.ime = ime; }

    public String getPrezime() { return prezime; }
    public void setPrezime(String prezime) { this.prezime = prezime; }

    public String getMaticniBroj() { return maticniBroj; }
    public void setMaticniBroj(String maticniBroj) { this.maticniBroj = maticniBroj; }

    public List<Usluga> getUsluge() { return usluge; }
    public void setUsluge(List<Usluga> usluge) { this.usluge = usluge; }
}