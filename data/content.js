/* =============================================================
   DAFTAR LAYANAN & PROYEK — Rakha Jaya Teknik
   =============================================================
   INI SATU-SATUNYA FILE YANG PERLU DIUBAH untuk menambah atau
   menghapus layanan dan proyek. Semua halaman mengambil isinya
   dari sini, jadi cukup diubah sekali.

   Aturan menulis:
   - Setiap baris data diapit kurung kurawal { } dan diakhiri koma
   - Teks diapit tanda kutip tunggal '...'
   - Kalau teksnya mengandung tanda kutip tunggal, tulis \' 
   - Jangan menghapus tanda kurung siku [ ] pembuka dan penutup daftar

   Setelah mengubah file ini, cukup muat ulang halamannya.
   ============================================================= */


/* =============================================================
   1. LAYANAN
   =============================================================
   Dipakai di: halaman Layanan & Rekayasa (daftar lengkap),
               Beranda (hanya jumlahnya, misal "04 LAYANAN")

   Isian tiap layanan:
     title  — nama layanan
     desc   — penjelasan satu kalimat
     icon   — nama ikon dari assets/icons.js
     photo  — nama foto dari assets/media.js
     href   — halaman tujuan saat "Selengkapnya" diklik

   MENAMBAH LAYANAN: salin satu baris { ... }, tempel di bawahnya,
   lalu ubah isinya. Jumlah di Beranda ikut menyesuaikan sendiri.

   MENGHAPUS LAYANAN: hapus satu baris { ... } utuh, termasuk
   koma di ujungnya.
   ============================================================= */

const SERVICES = {

  /* ---------- FABRIKASI — untuk bangunan & infrastruktur ---------- */
  fabrikasi: [
    { title: 'Kanopi & Carport',
      desc:  'Kanopi rumah, carport, dan kanopi baja ringan dengan desain modern dan kokoh.',
      icon:  'kanopi',   photo: 'house',        href: 'projects.html?filter=canopy' },

    { title: 'Pagar & Gerbang',
      desc:  'Pagar besi, pagar minimalis, pintu geser, pintu lipat, dan berbagai model pagar.',
      icon:  'pagar',    photo: 'welder2',      href: 'projects.html?filter=residential' },

    { title: 'Struktur Baja',
      desc:  'Struktur baja, rangka bangunan, mezzanine, kanopi besar, dan konstruksi lainnya.',
      icon:  'struktur', photo: 'construction', href: 'projects.html?filter=industrial' },

    { title: 'Fabrikasi Logam Custom',
      desc:  'Fabrikasi logam sesuai kebutuhan, mulai dari railing, tangga, hingga aksesoris.',
      icon:  'las',      photo: 'welding',      href: 'projects.html?filter=engineering' }
  ],

  /* ---------- REKAYASA — untuk industri & produksi ---------- */
  rekayasa: [
    { title: 'Jig & Fixture',
      desc:  'Peralatan khusus untuk proses perakitan, pengelasan, pemesinan, dan kontrol kualitas.',
      icon:  'jig',          photo: 'gears',   href: 'projects.html?filter=engineering' },

    { title: 'Alat Produksi Custom',
      desc:  'Tooling produksi custom untuk meningkatkan efisiensi, akurasi, dan produktivitas.',
      icon:  'alatProduksi', photo: 'gears',   href: 'projects.html?filter=engineering' },

    { title: 'Mesin Custom',
      desc:  'Mesin khusus yang dirancang sesuai kebutuhan proses dan kapasitas produksi Anda.',
      icon:  'mesin',        photo: 'factory', href: 'projects.html?filter=engineering' },

    { title: 'Komponen Mesin',
      desc:  'Bracket, shaft, roller, gear, housing, dan berbagai part presisi lainnya.',
      icon:  'komponen',     photo: 'gears',   href: 'projects.html?filter=engineering' },

    { title: 'Modifikasi Peralatan',
      desc:  'Modifikasi dan peningkatan mesin eksisting untuk performa, fungsi, dan umur pakai yang lebih baik.',
      icon:  'modifikasi',   photo: 'welder2', href: 'projects.html?filter=engineering' },

    { title: 'Prototype & Rekayasa Custom',
      desc:  'Pembuatan prototype dan rekayasa custom dari ide, konsep, gambar, hingga produk jadi.',
      icon:  'prototype',    photo: 'gears',   href: 'projects.html?filter=engineering' }
  ]
};


/* =============================================================
   2. PROYEK
   =============================================================
   Dipakai di: halaman Proyek (semua), Beranda (yang featured saja)

   Isian tiap proyek:
     title     — nama proyek
     desc      — penjelasan satu kalimat
     tag       — label kategori yang tampil di kartu (huruf kapital)
     icon      — nama ikon dari assets/icons.js
     photo     — nama foto dari assets/media.js
     filter    — daftar kategori untuk tombol penyaring. Pilihan:
                 'canopy'      (Kanopi & Carport)
                 'residential' (Hunian)
                 'commercial'  (Komersial)
                 'industrial'  (Industri)
                 'engineering' (Rekayasa)
                 Satu proyek boleh masuk lebih dari satu kategori.
     featured  — tulis  featured: true  kalau proyek ini ingin
                 ditampilkan juga di Beranda. Kalau tidak ingin,
                 hapus saja bagian ini.

   MENAMBAH PROYEK: salin satu baris { ... }, tempel di bawahnya,
   lalu ubah isinya.

   MENGHAPUS PROYEK: hapus satu baris { ... } utuh beserta komanya.
   ============================================================= */

const PROJECTS = [
  { title: 'Kanopi Minimalis',        tag: 'KANOPI',            icon: 'kanopi',       photo: 'house',
    filter: ['canopy','residential'],      featured: true,
    desc:  'Kanopi rangka baja dengan atap polycarbonate yang elegan dan kuat.' },

  { title: 'Carport Modern',          tag: 'CARPORT',           icon: 'kanopi',       photo: 'house',
    filter: ['canopy','residential'],      featured: true,
    desc:  'Carport kuat dan tahan lama untuk melindungi kendaraan Anda.' },

  { title: 'Pagar Besi Minimalis',    tag: 'PAGAR & GERBANG',   icon: 'pagar',        photo: 'welder2',
    filter: ['residential','commercial'],  featured: true,
    desc:  'Pagar besi dengan desain minimalis dan finishing premium.' },

  { title: 'Kanopi Teras Rumah',      tag: 'KANOPI',            icon: 'kanopi',       photo: 'house',
    filter: ['canopy','residential'],      featured: true,
    desc:  'Kanopi teras modern menambah kenyamanan dan estetika hunian.' },

  { title: 'Struktur Baja Ringan',    tag: 'STRUKTUR BAJA',     icon: 'struktur',     photo: 'construction',
    filter: ['industrial','commercial'],   featured: true,
    desc:  'Konstruksi baja ringan untuk berbagai kebutuhan bangunan.' },

  { title: 'Pagar Sliding Otomatis',  tag: 'PAGAR & GERBANG',   icon: 'pagar',        photo: 'welder2',
    filter: ['residential','commercial'],  featured: true,
    desc:  'Pagar sliding otomatis dengan sistem motor berkualitas.' },

  { title: 'Carport Baja Ringan',     tag: 'CARPORT',           icon: 'kanopi',       photo: 'construction',
    filter: ['canopy','residential'],
    desc:  'Carport dengan struktur baja ringan yang kokoh dan modern.' },

  { title: 'Pagar Motif Laser Cut',   tag: 'PAGAR & GERBANG',   icon: 'pagar',        photo: 'welder2',
    filter: ['residential','commercial'],
    desc:  'Pagar motif laser cut memberikan kesan mewah dan eksklusif.' },

  { title: 'Jig & Fixture Custom',    tag: 'REKAYASA',          icon: 'bintang',      photo: 'gears',
    filter: ['engineering','industrial'],
    desc:  'Jig presisi untuk proses perakitan dan pemenuhan kontrol kualitas.' },

  { title: 'Production Tooling',      tag: 'INDUSTRI',          icon: 'alatProduksi', photo: 'gears',
    filter: ['engineering','industrial'],
    desc:  'Alat produksi custom untuk meningkatkan efisiensi dan produktivitas.' },

  { title: 'Komponen Mesin Custom',   tag: 'REKAYASA',          icon: 'bintang',      photo: 'factory',
    filter: ['engineering','industrial'],
    desc:  'Komponen mesin dibuat sesuai gambar dan spesifikasi yang dibutuhkan.' },

  { title: 'Modifikasi Mesin',        tag: 'INDUSTRI',          icon: 'alatProduksi', photo: 'factory',
    filter: ['engineering','industrial'],
    desc:  'Modifikasi dan peningkatan mesin untuk performa lebih baik.' },

  { title: 'Prototype & R&D',         tag: 'REKAYASA',          icon: 'bintang',      photo: 'gears',
    filter: ['engineering'],
    desc:  'Pembuatan prototype dari ide dan konsep sebelum produksi massal.' },

  { title: 'Peralatan Produksi Line', tag: 'INDUSTRI',          icon: 'alatProduksi', photo: 'factory',
    filter: ['engineering','industrial'],
    desc:  'Peralatan khusus untuk kebutuhan proses produksi industri.' },

  { title: 'Proses Improvement Tool', tag: 'REKAYASA',          icon: 'bintang',      photo: 'gears',
    filter: ['engineering','industrial'],
    desc:  'Tooling untuk membantu perbaikan dan optimalisasi proses produksi.' },

  { title: 'Fabrikasi Custom',        tag: 'FABRIKASI CUSTOM',  icon: 'las',          photo: 'welding',
    filter: ['engineering','commercial'],
    desc:  'Fabrikasi logam custom sesuai kebutuhan, mulai dari railing hingga aksesoris.' }
];


/* =============================================================
   3. WORKSHOP & KEMAMPUAN
   =============================================================
   Dipakai di: halaman Layanan & Rekayasa, bagian paling bawah
   sebelum ajakan menghubungi.
   ============================================================= */

const WORKSHOP = [
  { label: 'Mesin CNC',          icon: 'komponen',  photo: 'gears'        },
  { label: 'Pengelasan Presisi', icon: 'las',       photo: 'welding'      },
  { label: 'Fabrikasi Logam',    icon: 'modifikasi',photo: 'construction' },
  { label: 'Kontrol Kualitas',   icon: 'prototype', photo: 'factory'      },
  { label: 'Tim Berpengalaman',  icon: 'tim',       photo: 'welder2'      }
];
