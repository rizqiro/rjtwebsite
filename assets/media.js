/* =============================================================
   GAMBAR & IKON — Rakha Jaya Teknik
   =============================================================
   Satu tempat untuk SEMUA foto yang dipakai di situs ini.

   ----------------------------------------------------------------
   MENGGANTI FOTO CONTOH DENGAN FOTO ASLI
   ----------------------------------------------------------------
   Sekarang semua foto masih memakai contoh dari Unsplash.
   Untuk memakai foto asli Rakha Jaya Teknik:

   1. Simpan filenya ke folder  assets/img/
   2. Ubah satu baris di daftar PHOTO di bawah, contohnya:

        house: '1449844908441-8829872d2607',   <-- sebelum (contoh)
        house: 'assets/img/kanopi-rumah.jpg',  <-- sesudah (foto asli)

   Itu saja. Semua halaman yang memakai foto tersebut ikut berubah.

   Aturannya: kalau nilainya diawali 'assets/', 'http', './' atau '/',
   dipakai apa adanya sebagai alamat file. Kalau bukan, dianggap kode
   foto contoh dari Unsplash.
   ============================================================= */

const PHOTO = {
  /* --- foto contoh (ganti dengan 'assets/img/namafile.jpg') --- */
  house:        '1449844908441-8829872d2607', // rumah modern — kanopi / carport / teras
  construction: '1541888946425-d81bb19240f5', // proyek konstruksi / struktur baja
  welding:      '1565793298595-6a879b1d3985', // percikan las / fabrikasi logam
  welder2:      '1590959651373-a3db0f38a961', // pagar & gerbang besi
  factory:      '1517420704952-d9f39e95b43e', // interior pabrik / mesin produksi
  gears:        '1567789884554-0b844b597180'  // komponen mesin / jig & fixture
};

/* Mengubah nama foto menjadi alamat gambar yang bisa dipakai. */
function photoSrc(ref, w){
  if(!ref) return '';
  const value = PHOTO[ref] || ref;
  if(/^(assets\/|https?:|\.\/|\/)/.test(value)) return value;
  return 'https://images.unsplash.com/photo-' + value + '?q=80&w=' + (w || 800) + '&auto=format&fit=crop';
}

/* Membuat tag <img> lengkap. */
function photoImg(ref, w, alt){
  return '<img src="' + photoSrc(ref, w) + '" alt="' + (alt || '') + '" loading="lazy" onerror="this.remove()">';
}

/* Membuat tag <svg> dari nama ikon di assets/icons.js. */
function icon(name, strokeWidth){
  const d = (typeof ICONS !== 'undefined' && ICONS[name]) || '';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'
       + (strokeWidth || 1.8) + '" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
}

/* Mengisi <img data-photo="nama"> yang ditulis langsung di HTML
   (foto hero, foto workshop, dsb) dari daftar PHOTO di atas. */
function applyPhotoAttributes(){
  document.querySelectorAll('img[data-photo]').forEach(function(img){
    const src = photoSrc(img.dataset.photo, img.dataset.w);
    if(src) img.src = src;
  });
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', applyPhotoAttributes);
}else{
  applyPhotoAttributes();
}
