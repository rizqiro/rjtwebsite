# Folder Foto

Simpan semua foto asli Rakha Jaya Teknik di folder ini.

## Cara mengganti foto contoh dengan foto asli

1. Simpan file fotonya di folder ini, misalnya `kanopi-rumah.jpg`
2. Buka `assets/media.js`
3. Ubah baris foto yang ingin diganti:

```js
house: '1449844908441-8829872d2607',   // sebelum — foto contoh
house: 'assets/img/kanopi-rumah.jpg',  // sesudah — foto asli
```

Semua halaman yang memakai foto itu ikut berubah. Tidak perlu mengubah
file HTML.

## Saran ukuran

| Dipakai untuk | Lebar yang disarankan |
|---|---|
| Latar hero (bagian paling atas halaman) | 1600 px |
| Kartu layanan & proyek | 800 px |
| Petak workshop dan Instagram | 600 px |

Gunakan format `.jpg` untuk foto. Kompres dulu sebelum diunggah —
usahakan setiap file di bawah 300 KB supaya situs tetap cepat.

## Nama file

Pakai huruf kecil dan tanda hubung, tanpa spasi:

- Benar: `pagar-besi-minimalis.jpg`
- Salah: `Pagar Besi Minimalis.JPG`
