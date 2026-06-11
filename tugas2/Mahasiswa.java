public class Mahasiswa {
    String nim, nama, status; // status: "Aktif" atau "Tidak Aktif"
    double tugas, uts, uas;

    public Mahasiswa(String nim, String nama, double tugas, double uts, double uas, String status) {
        this.nim = nim;
        this.nama = nama;
        this.tugas = tugas;
        this.uts = uts;
        this.uas = uas;
        this.status = status;
    }

    public double totalNilai() {
        return (tugas * 0.3) + (uts * 0.35) + (uas * 0.35);
    }

    public String kategoriNilai() {
        double nilai = totalNilai();
        if (nilai >= 85) return "A";
        else if (nilai >= 70) return "B";
        return "C";
    }

    public double IPS() {
        // Contoh sederhana: mapping kategori ke bobot
        return 4.0; 
    }
}