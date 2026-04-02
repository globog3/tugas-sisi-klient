const list_nim = ["22001", "22002", "22003"];

const mahasiswa = {
  nim: "22001",
  nama: "Budi Santoso",
  umur: 21,
  status: true,
  matkul: [{ matkulid: "MK001", tugas: 85, UTS: 88, UAS: 90 }],
};
console.log(mahasiswa);
[{ nim: "22001", nama: "Budi Santoso", umur: 21, status: true }];

const mahasiswaList = [
  { nim: "22001", nama: "Budi Santoso", status: true },
  { nim: "22002", nama: "Siti Aminah", status: false },
];

console.log(mahasiswalist);
[
  { nim: "22001", nama: "Budi Santoso", status: true },
  { nim: "22002", nama: "Siti Aminah", status: false },
];

const list_mahasiswa = [
  {
    nama: "mahasiswa 1",
    nim: "A11.123123",
    umur: 20,
  },
  {
    nama: "mahasiswa 2",
    nim: "A11.123124",
    umur: 21,
  },
];

console.log(list_mahasiswa);
[
  { nama: "mahasiswa 1", nim: "A11.123123", umur: 20 },
  { nama: "mahasiswa 2", nim: "A11.123124", umur: 21 },
];

const mahasiswa1 = {
  nim: "22001",
  nama: "Budi Santoso",
  umur: 21,
  status: true,
};

const umur = mahasiswa1.umur;
console.log(umur);
21;

if (umur > 21) {
  console.log("yes tua");
} else {
  console.log("umur tidak pantasts");
}

const { nama, umur, status } = mahasiswa1;
console.log("nama: " + nama + ", umur: " + umur); // 'nama= budi santoso

console.log(`nama: ${nama}, umur: ${umur}`);

const listmahasiswa = [
  { nim: "123", nama: "json", umur: 18, status: true },
  { nim: "44221", nama: "yanti", umur: 20, status: false },
  { nim: "1231", nama: "pantasts", umur: 24, status: true },
];
