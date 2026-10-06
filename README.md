# Website Rakha Jaya Teknik

Situs statis — hanya HTML, CSS, dan JavaScript biasa. Tidak perlu
dipasang apa pun, tidak perlu di-*build*. Cukup ubah filenya, simpan,
lalu muat ulang halaman di browser.

---

## Saya ingin menambah / menghapus layanan atau proyek

Buka satu file ini saja:

```
data/content.js
```

Semua halaman mengambil isinya dari sana, jadi cukup diubah sekali.
Jumlah layanan di Beranda dan di bar navigasi halaman Layanan ikut
berubah sendiri — tidak perlu dihitung manual.

### Menambah layanan

Cari bagian `SERVICES`, lalu salin satu baris `{ ... }` dan ubah isinya:

```js
{ title: 'Nama Layanan Baru',
  desc:  'Penjelasan satu kalimat.',
  icon:  'kanopi',   photo: 'house',   href: 'projects.html?filter=canopy' },
```

Letakkan di dalam `fabrikasi: [ ... ]` atau `rekayasa: [ ... ]`
sesuai jenisnya.

### Menambah proyek

Cari bagian `PROJECTS`, lalu salin satu baris `{ ... }`:

```js
{ title: 'Nama Proyek',   tag: 'KANOPI',   icon: 'kanopi',   photo: 'house',
  filter: ['canopy','residential'],   featured: true,
  desc:  'Penjelasan satu kalimat.' },
```

Tambahkan `featured: true` kalau proyek ini juga ingin tampil di Beranda.
Kalau tidak, hapus bagian itu — proyeknya tetap tampil di halaman Proyek.

### Menghapus

Hapus satu baris `{ ... }` utuh, termasuk koma di ujungnya.

---

## Saya ingin mengganti foto

1. Simpan foto aslinya di folder `assets/img/`
2. Buka `assets/media.js`
3. Ubah satu baris, misalnya:

```js
house: '1449844908441-8829872d2607',   // sebelum — foto contoh
house: 'assets/img/kanopi-rumah.jpg',  // sesudah — foto asli
```

Semua halaman yang memakai foto itu ikut berubah sekaligus.

Keterangan lebih lengkap ada di `assets/img/README.md`.

---

## Saya ingin menambah ikon

Buka `assets/icons.js`, tambahkan satu baris berisi kode SVG-nya, lalu
panggil namanya dari `data/content.js`. Ikon gratis bisa diambil dari
[lucide.dev](https://lucide.dev) — pilih gaya garis (*outline*) 24×24.

---

## Susunan file

```
index.html          Beranda
services.html       Layanan & Rekayasa
projects.html       Proyek
about.html          Tentang Kami
contact.html        Kontak
engineering.html    Pengalih ke services.html (jangan dihapus —
                    menjaga tautan lama tetap berfungsi)

data/
  content.js        >>> DAFTAR LAYANAN, PROYEK & WORKSHOP — ubah di sini

assets/
  icons.js          Kumpulan ikon
  media.js          Daftar foto + alat bantu gambar
  img/              Tempat menyimpan file foto asli
```

---

## Setelah mengubah file

Muat ulang halaman di browser. Kalau tampilan tidak berubah, tekan
**Ctrl + Shift + R** (atau **Cmd + Shift + R** di Mac) untuk memuat ulang
tanpa cache.

Kalau halaman jadi kosong, biasanya ada tanda kutip atau koma yang
kurang di `data/content.js`. Buka **Developer Tools** di browser
(tombol **F12**), lihat tab **Console** — pesan errornya akan menunjuk
baris yang bermasalah.
