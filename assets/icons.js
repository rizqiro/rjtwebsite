/* =============================================================
   PUSTAKA IKON — Rakha Jaya Teknik
   =============================================================
   Semua ikon disimpan di satu tempat supaya tidak perlu menyalin
   kode SVG berulang kali.

   Cara memakai di data/content.js: tulis nama ikonnya saja, misal
   icon: 'kanopi'

   Menambah ikon baru:
   1. Cari ikon garis (outline) berukuran 24x24 — misalnya dari lucide.dev
   2. Salin bagian DALAM <svg> saja (<path>, <circle>, <rect>, dst)
   3. Tambahkan satu baris di bawah ini dengan nama pilihan Anda

   Jangan menyertakan tag <svg> pembuka/penutup — itu ditambahkan
   otomatis oleh assets/media.js.
   ============================================================= */

const ICONS = {
  /* --- Fabrikasi --- */
  kanopi:      '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  pagar:       '<path d="M5 4v16M9 4v16M15 4v16M19 4v16"/><path d="M3 9h18M3 15h18"/>',
  struktur:    '<path d="M3 21h18M5 21V10l6-4 6 4v11M9 21v-6h6v6"/>',
  las:         '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>',

  /* --- Rekayasa --- */
  jig:         '<rect x="4" y="7" width="16" height="10" rx="1"/><circle cx="12" cy="12" r="3"/>',
  alatProduksi:'<rect x="3" y="8" width="18" height="10" rx="1"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>',
  mesin:       '<rect x="4" y="5" width="16" height="14" rx="1"/><path d="M8 9h8M8 13h8M8 17h4"/>',
  komponen:    '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  modifikasi:  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94Z"/>',
  prototype:   '<circle cx="12" cy="12" r="9"/><path d="M9 12.5 11 15l4-5"/>',
  bintang:     '<path d="m12 2 2.4 7.4H22l-6 4.4 2.3 7.4L12 16.8 5.7 21.2 8 13.8 2 9.4h7.6Z"/>',

  /* --- Workshop & umum --- */
  tim:         '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  panah:       '<path d="M5 12h14M13 6l6 6-6 6"/>'
};
