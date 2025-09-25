package rva.models;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Usluga implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "USLUGA_ID_GEN", sequenceName = "USLUGA_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USLUGA_ID_GEN")
    private int id;

    private String naziv;
    private String opisUsluge;

    @Temporal(TemporalType.DATE)
    private Date datumUgovora;

    private double provizija;

    @ManyToOne
    @JoinColumn(name = "filijala", nullable = false)
    private Filijala filijala;

    @ManyToOne
    @JoinColumn(name = "korisnik", nullable = false)
    private KorisnikUsluge korisnik;

    public Usluga() {}

    // Getteri i setteri
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNaziv() { return naziv; }
    public void setNaziv(String naziv) { this.naziv = naziv; }

    public String getOpisUsluge() { return opisUsluge; }
    public void setOpisUsluge(String opisUsluge) { this.opisUsluge = opisUsluge; }

    public Date getDatumUgovora() { return datumUgovora; }
    public void setDatumUgovora(Date datumUgovora) { this.datumUgovora = datumUgovora; }

    public double getProvizija() { return provizija; }
    public void setProvizija(double provizija) { this.provizija = provizija; }

    public Filijala getFilijala() { return filijala; }
    public void setFilijala(Filijala filijala) { this.filijala = filijala; }

    public KorisnikUsluge getKorisnik() { return korisnik; }
    public void setKorisnik(KorisnikUsluge korisnik) { this.korisnik = korisnik; }
}
