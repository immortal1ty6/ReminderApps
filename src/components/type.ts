export type Kegiatan = {
    id_kegiatan: number;
    judul_kegiatan: string;
    deskripsi_kegiatan: string;
    tanggal_mulai_kegiatan: string;
    tanggal_selesai_kegiatan: string;
    penerima: 'Pengurus' | 'Anggota' | 'Semua';
  };

export type Penerima = {
    id_penerima: number;
    nama_penerima: string;
    email_penerima: string;
    id_level: number;
};