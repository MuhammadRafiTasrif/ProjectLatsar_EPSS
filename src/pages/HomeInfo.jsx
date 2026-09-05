import React from 'react';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Target,
  BarChart3,
  GitFork,
  Eye,
  FileText,
  BookOpen,
  ArrowRight,
  Building2,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Share2,
  Award,
  Database,
  Calendar,
  FileCheck
} from 'lucide-react';

export default function HomeInfo({ onNavigate }) {
  const tujuanPembinaan = [
    {
      id: 1,
      title: 'Mendukung Perencanaan & Kebijakan',
      icon: Target,
      color: '#3b82f6',
      bgLight: 'rgba(59, 130, 246, 0.1)',
      desc: 'Statistik sektoral digunakan untuk menyediakan data yang akurat dan relevan guna mendukung perumusan kebijakan pemerintah daerah serta memfasilitasi pengambilan keputusan berbasis data di berbagai sektor.'
    },
    {
      id: 2,
      title: 'Monitoring & Evaluasi Pembangunan',
      icon: BarChart3,
      color: '#10b981',
      bgLight: 'rgba(16, 185, 129, 0.1)',
      desc: 'Menyediakan indikator terukur untuk mengukur keberhasilan program pembangunan daerah dan memantau perkembangan sektor tertentu dalam suatu periode tertentu.'
    },
    {
      id: 3,
      title: 'Peningkatan Kualitas & Akurasi Data',
      icon: ShieldCheck,
      color: '#f79039',
      bgLight: 'rgba(247, 144, 57, 0.1)',
      desc: 'Menjamin standar dan metodologi statistik sektoral yang digunakan sesuai dengan prinsip ilmiah guna menghindari kesalahan data dan meningkatkan kepercayaan publik terhadap informasi yang disajikan.'
    },
    {
      id: 4,
      title: 'Koordinasi & Integrasi Data',
      icon: GitFork,
      color: '#8b5cf6',
      bgLight: 'rgba(139, 92, 246, 0.1)',
      desc: 'Mencegah duplikasi pengumpulan data antara berbagai instansi daerah dan memudahkan integrasi data sektoral dengan data nasional atau daerah lainnya.'
    },
    {
      id: 5,
      title: 'Penyediaan Informasi untuk Publik',
      icon: Eye,
      color: '#ec4899',
      bgLight: 'rgba(236, 72, 153, 0.1)',
      desc: 'Meningkatkan transparansi dengan menyediakan data yang dapat diakses oleh masyarakat, akademisi, dan pelaku usaha guna mendorong keterlibatan masyarakat dalam pengawasan pembangunan daerah.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>

      {/* HERO BANNER SECTION */}
      <section className="glass-card" style={{
        padding: '2.5rem 2rem',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(247, 144, 57, 0.14) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(16, 185, 129, 0.06) 100%)',
        border: '1px solid var(--primary-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247, 144, 57, 0.25) 0%, rgba(247, 144, 57, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> SIMPONITAS BPS PASAMAN
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Sinergi Pembinaan Statistik Sektoral
            </span>
          </div>

          <h1 style={{
            fontSize: 'calc(1.8rem + 1vw)',
            fontWeight: 800,
            lineHeight: '1.25',
            color: 'var(--text-main)',
            marginBottom: '1rem',
            letterSpacing: '-0.5px'
          }}>
            Pusat Informasi & Sinergi Pembinaan Statistik Sektoral Pasaman
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.65',
            marginBottom: '1.8rem'
          }}>
            Aplikasi inovatif yang dirancang untuk memfasilitasi kolaborasi, koordinasi, serta coaching pembinaan statistik bagi seluruh Organisasi Perangkat Daerah (OPD) dalam mewujudkan penerbitan Kompilasi Produk Administrasi (Kompromin) yang akurat dan berkualitas.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('permohonan')}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', fontSize: '0.92rem', borderRadius: 'var(--radius-md)' }}
            >
              <span>Pengajuan Pembinaan OPD</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('kompromin')}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', fontSize: '0.92rem', borderRadius: 'var(--radius-md)' }}
            >
              <FileText size={18} color="var(--primary)" />
              <span>Repository Kompromin</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', fontSize: '0.92rem', borderRadius: 'var(--radius-md)' }}
            >
              <BarChart3 size={18} color="var(--accent-blue)" />
              <span>Dashboard Analitik</span>
            </button>
          </div>
        </div>

        {/* Highlight Cards Grid in Hero */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '2.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div className="glass-card" style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(247, 144, 57, 0.12)', color: 'var(--primary)' }}>
                <Building2 size={20} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>Penghubung Utama OPD</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Fasilitas permohonan pembinaan & coaching statistik sektoral terpadu bagi instansi pemerintah daerah.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)' }}>
                <FileCheck size={20} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>Pemantauan Kompromin</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Memantau dan mengevaluasi seluruh proses bisnis penyusunan Kompilasi Produk Administrasi daerah.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)' }}>
                <Award size={20} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>Standar Kualitas Tinggi</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Memastikan data statistik sektoral terintegrasi dan mematuhi kaidah/metodologi statistik ilmiah.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: PENJELASAN UMUM SIMPONITAS */}
      <section className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <Layers size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Pengenalan Aplikasi
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Penjelasan Umum SIMPONITAS
            </h2>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-main)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid var(--primary)',
          lineHeight: '1.7',
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          fontSize: '0.95rem'
        }}>
          <p style={{ marginBottom: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>
            <strong>SIMPONITAS</strong> atau <em>Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas</em>. Sesuai dengan namanya, aplikasi ini dirancang untuk memfasilitasi kolaborasi dan koordinasi dalam upaya pengembangan dan peningkatan kualitas statistik di berbagai sektor.
          </p>
          <p>
            Secara operasional, aplikasi ini berfungsi sebagai penghubung utama bagi Organisasi Perangkat Daerah (OPD) untuk mengajukan permintaan pembinaan dan coaching terkait statistik sektoral. Selain itu, SIMPONITAS juga menjadi sarana untuk mendukung proses pengumpulan dan penyusunan data administrasi yang terpadu, dikenal sebagai Kompilasi Produk Administrasi (Kompromin) agar seluruh proses bisnis statistik dalam penyusunan Kompromin terpantau dan terevaluasi. Dengan demikian, SIMPONITAS memastikan bahwa data statistik yang dihasilkan oleh berbagai sektor dapat terintegrasi dengan baik dan memenuhi standar kualitas yang tinggi .
          </p>
        </div>

        {/* Feature pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.2rem' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>Fasilitasi Kolaborasi OPD</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Wadah koordinasi resmi antara BPS Kabupaten Pasaman dan OPD produsen data sektoral.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>Coaching & Pendampingan</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Layanan konsultasi teknis, pembuatan metadata, dan pengajuan rekomendasi kegiatan statistik.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>Evaluasi Proses Bisnis</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Alur verifikasi bertahap dari draft OPD hingga penerbitan dokumen Kompromin resmi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATISTIK SEKTORAL ? 🤔 */}
      <section className="glass-card" style={{
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-blue-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-blue)'
          }}>
            <HelpCircle size={22} />
          </div>
          <div>
            <span className="badge" style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)', fontSize: '0.75rem', padding: '3px 10px', marginBottom: '4px', display: 'inline-block' }}>
              Konsep Dasar
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Statistik Sektoral ? 🤔
            </h2>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
          fontSize: '0.98rem',
          lineHeight: '1.7',
          color: 'var(--text-main)',
          marginBottom: '1.5rem'
        }}>
          Statistik sektoral adalah statistik yang pemanfaatannya ditujukan untuk memenuhi kebutuhan suatu instansi pemerintah tertentu dalam rangka penyelenggaraan tugas-tugas pemerintahan dan pembangunan yang merupakan tugas pokok instansi pemerintah yang bersangkutan. Kegiatan statistik sektoral dilaksanakan oleh instansi pemerintah non-BPS yang sesuai dengan lingkup tugas dan fungsinya, baik secara mandiri atau bekerjasama dengan BPS. Hasil statistik sektoral wajib diserahkan kepada BPS.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-main)', padding: '1rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>Tujuan Pemanfaatan</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px', marginBottom: '4px', color: 'var(--text-main)' }}>Tugas Pokok Pemerintahan</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Memenuhi kebutuhan data spesifik untuk perumusan program kerja instansi daerah.</p>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '1rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-purple)', textTransform: 'uppercase' }}>Pelaksana Kegiatan</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px', marginBottom: '4px', color: 'var(--text-main)' }}>Instansi Non-BPS (OPD)</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dilaksanakan oleh OPD/dinas secara mandiri maupun kolaborasi bersama BPS.</p>
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '1rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase' }}>Kewajiban Penyerahan</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px', marginBottom: '4px', color: 'var(--text-main)' }}>Penyerahan Hasil ke BPS</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Hasil statistik sektoral wajib diserahkan kepada BPS sebagai Pembina Data.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: TUJUAN PEMBINAAN STATISTIK SEKTORAL */}
      <section className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ marginBottom: '1.8rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Arah & Pilar Pembinaan
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
            Tujuan Pembinaan Statistik Sektoral
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Lima sasaran strategis pembinaan statistik sektoral bagi OPD Kabupaten Pasaman:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {tujuanPembinaan.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                  cursor: 'default'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: item.bgLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color
                  }}>
                    <IconComp size={22} />
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: item.color,
                    background: item.bgLight,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    Pilar 0{item.id}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.35' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: APA ITU KOMPROMIN? */}
      <section className="glass-card" style={{
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(247, 144, 57, 0.3)',
        background: 'linear-gradient(135deg, rgba(247, 144, 57, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <FileText size={22} />
          </div>
          <div>
            <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '3px 10px', marginBottom: '4px', display: 'inline-block' }}>
              Metodologi Data
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Apa itu Kompromin?
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-color)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            color: 'var(--text-secondary)'
          }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
              <strong style={{ color: 'var(--primary-hover)', fontSize: '1.05rem' }}>KOMPROMIN</strong> merupakan singkatan dari <strong>Kompilasi Produk Administrasi</strong>. Ini adalah metode pengumpulan, pengolahan, penyajikan, dan analisis data yang secara eksklusif bersumber dari catatan administrasi yang telah ada di instansi pemerintah dan/atau masyarakat. Berbeda dengan sensus atau survei yang mengumpulkan data primer (data yang didapatkan langsung dari objek penelitian), KOMPROMIN tidak melibatkan pengumpulan data baru.
            </p>
            <p>
              Data yang digunakan dalam KOMPROMIN adalah data sekunder yang berasal dari berbagai laporan dan catatan rutin yang dihasilkan oleh instansi atau organisasi. Catatan administrasi ini dibuat dan dikelola oleh masing-masing lembaga dalam rangka memenuhi kebutuhan tugas dan fungsi operasional mereka sehari-hari. Dengan demikian, KOMPROMIN memanfaatkan kekayaan informasi yang sudah tersedia untuk menghasilkan statistik yang relevan dan efisien.
            </p>
          </div>

          {/* Comparison Cards: Sensus/Survei vs KOMPROMIN */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{
              background: 'var(--bg-main)',
              padding: '1.2rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>PENDEKATAN LAIN</span>
                <span className="badge" style={{ background: 'rgba(148, 163, 184, 0.15)', color: 'var(--text-muted)' }}>Data Primer</span>
              </div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                Sensus & Survei Lapangan
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                Mengumpulkan data langsung dari responden atau objek penelitian di lapangan. Membutuhkan waktu, biaya, dan sumber daya pencatatan baru.
              </p>
            </div>

            <div style={{
              background: 'var(--primary-light)',
              padding: '1.2rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--primary-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-hover)' }}>METODE KOMPROMIN</span>
                <span className="badge badge-primary">Data Sekunder Administrasi</span>
              </div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                Kompilasi Catatan Rutin OPD
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                Memanfaatkan secara efisien laporan rutin dan catatan administrasi harian yang sudah ada di dinas tanpa perlu mengumpulkan data baru dari nol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS ACTION FOOTER */}
      <section className="glass-card" style={{
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-nav)',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Siap Memulai Pembinaan Statistik Sektoral?
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Gunakan fitur-fitur SIMPONITAS untuk mengajukan permohonan pembinaan, melihat repositori dokumen Kompromin, atau mempelajari modul & SOP statistik sektoral.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('permohonan')}
            className="btn btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            Akses Layanan Pembinaan
          </button>
          <button
            onClick={() => onNavigate('dataSektoral')}
            className="btn btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            Lihat Data Sektoral OPD
          </button>
          <button
            onClick={() => onNavigate('knowledgeBase')}
            className="btn btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            Modul Knowledge Base & SOP
          </button>
        </div>
      </section>

    </div>
  );
}
