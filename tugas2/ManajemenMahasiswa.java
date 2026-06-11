import java.util.*;

public class ManajemenMahasiswa {
    private ArrayList<Mahasiswa> listMahasiswa = new ArrayList<>();

    // --- Fungsi Objek Mahasiswa ---
    public void add(Mahasiswa m) { listMahasiswa.add(m); }

    public void show() {
        for (Mahasiswa m : listMahasiswa) {
            System.out.println(m.nim + " - " + m.nama + " - " + m.totalNilai());
        }
    }

    public void deleteById(String nim) {
        listMahasiswa.removeIf(m -> m.nim.equals(nim));
    }

    // --- Fungsi Array of Object ---
    public int jumlahMahasisa() {
        return listMahasiswa.size();
    }

    public void sortByNIM() {
        listMahasiswa.sort(Comparator.comparing(m -> m.nim));
    }

    public void sortByStatus() {
        listMahasiswa.sort(Comparator.comparing(m -> m.status));
    }

    public void jumlahAktifTidak() {
        long aktif = listMahasiswa.stream().filter(m -> m.status.equals("Aktif")).count();
        System.out.println("Aktif: " + aktif + ", Tidak Aktif: " + (listMahasiswa.size() - aktif));
    }

    public void clearArray() {
        listMahasiswa.clear();
    }
}