import React from 'react';
import {
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
  Database,
  FileCheck,
  Award
} from 'lucide-react';

export default function HomeInfo({ onNavigate }) {
  const tujuanPembinaan = [
    {
      id: 1,
      title: 'Mendukung Perencanaan & Kebijakan',
      icon: Target,
      color: '#2563eb',
      desc: 'Statistik sektoral digunakan untuk menyediakan data yang akurat dan relevan guna mendukung perumusan kebijakan pemerintah daerah serta memfasilitasi pengambilan keputusan berbasis data di berbagai sektor.'
    },
    {
      id: 2,
      title: 'Monitoring & Evaluasi Pembangunan',
      icon: BarChart3,
      color: '#059669',
      desc: 'Menyediakan indikator terukur untuk mengukur keberhasilan program pembangunan daerah dan memantau perkembangan sektor tertentu dalam suatu periode tertentu.'
    },
    {
      id: 3,
      title: 'Peningkatan Kualitas & Akurasi Data',
      icon: ShieldCheck,
      color: '#f79039',
      desc: 'Menjamin standar dan metodologi statistik sektoral yang digunakan sesuai dengan prinsip ilmiah guna menghindari kesalahan data dan meningkatkan kepercayaan publik terhadap informasi yang disajikan.'
    },
    {
      id: 4,
      title: 'Koordinasi & Integrasi Data',
      icon: GitFork,
      color: '#2563eb',
      desc: 'Mencegah duplikasi pengumpulan data antara berbagai instansi daerah dan memudahkan integrasi data sektoral dengan data nasional atau daerah lainnya.'
    },
    {
      id: 5,
      title: 'Penyediaan Informasi untuk Publik',
      icon: Eye,
      color: '#059669',
      desc: 'Meningkatkan transparansi dengan menyediakan data yang dapat diakses oleh masyarakat, akademisi, dan pelaku usaha guna mendorong keterlibatan masyarakat dalam pengawasan pembangunan daerah.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1.5rem' }}>

      {/* Hero */}
      <section className="glass-card" style={{
        padding: '2rem 1.5rem',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--primary-light)',
        border: '1px solid var(--primary-border)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary" style={{ padding: '5px 12px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <BarChart3 size={13} /> SIMPONITAS BPS Pasaman
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.5rem, 2vw + 1rem, 2.25rem)',
            fontWeight: 800,
            lineHeight: '1.25',
            color: 'var(--text-main)',
            marginBottom: '0.75rem'
          }}>
            Pusat Informasi & Sinergi Pembinaan Statistik Sektoral Pasaman
          </h1>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.65',
            marginBottom: '1.5rem'
          }}>
            Aplikasi yang dirancang untuk memfasilitasi kolaborasi, koordinasi, serta coaching pembinaan statistik bagi seluruh Organisasi Perangkat Daerah (OPD) dalam mewujudkan penerbitan Kompilasi Produk Administrasi (Kompromin) yang akurat dan berkualitas.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('permohonan')}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              Pengajuan Pembinaan OPD
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('kompromin')}
              className="btn btn-secondary"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              <FileText size={16} color="var(--primary)" />
              Repository Kompromin
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn btn-secondary"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              <BarChart3 size={16} color="var(--accent-blue)" />
              Dashboard Analitik
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          {[
            { icon: Building2, color: 'var(--primary)', title: 'Penghubung Utama OPD', desc: 'Permohonan pembinaan & coaching statistik sektoral bagi instansi daerah.' },
            { icon: FileCheck, color: 'var(--accent-blue)', title: 'Pemantauan Kompromin', desc: 'Pantau dan evaluasi proses penyusunan Kompilasi Produk Administrasi.' },
            { icon: Award, color: 'var(--accent-green)', title: 'Standar Kualitas Tinggi', desc: 'Data statistik sektoral terintegrasi, mematuhi kaidah metodologi ilmiah.' }
          ].map((card, idx) => (
            <div key={idx} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <card.icon size={18} color={card.color} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>{card.title}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Penjelasan Umum */}
      <section className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <Layers size={20} color="var(--primary)" />
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Pengenalan Aplikasi</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>Penjelasan Umum SIMPONITAS</h2>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          lineHeight: '1.7',
          color: 'var(--text-secondary)',
          marginBottom: '1.25rem',
          fontSize: '0.92rem'
        }}>
          <p style={{ marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
            <strong>SIMPONITAS</strong> atau <em>Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas</em>. Sesuai dengan namanya, aplikasi ini dirancang untuk memfasilitasi kolaborasi dan koordinasi dalam upaya pengembangan dan peningkatan kualitas statistik di berbagai sektor.
          </p>
          <p>
            Secara operasional, aplikasi ini berfungsi sebagai penghubung utama bagi Organisasi Perangkat Daerah (OPD) untuk mengajukan permintaan pembinaan dan coaching terkait statistik sektoral. Selain itu, SIMPONITAS juga menjadi sarana untuk mendukung proses pengumpulan dan penyusunan data administrasi yang terpadu, dikenal sebagai Kompilasi Produk Administrasi (Kompromin) agar seluruh proses bisnis statistik dalam penyusunan Kompromin terpantau dan terevaluasi. Dengan demikian, SIMPONITAS memastikan bahwa data statistik yang dihasilkan oleh berbagai sektor dapat terintegrasi dengan baik dan memenuhi standar kualitas yang tinggi .
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { title: 'Fasilitasi Kolaborasi OPD', desc: 'Wadah koordinasi resmi antara BPS Kabupaten Pasaman dan OPD produsen data sektoral.' },
            { title: 'Coaching & Pendampingan', desc: 'Layanan konsultasi teknis, pembuatan metadata, dan pengajuan rekomendasi kegiatan statistik.' },
            { title: 'Evaluasi Proses Bisnis', desc: 'Alur verifikasi bertahap dari draft OPD hingga penerbitan dokumen Kompromin resmi.' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '3px', color: 'var(--text-main)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistik Sektoral */}
      <section className="glass-card" style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(37, 99, 235, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <Database size={20} color="var(--accent-blue)" />
          <div>
            <span className="badge badge-info" style={{ fontSize: '0.72rem', padding: '2px 8px', marginBottom: '3px', display: 'inline-block' }}>
              Konsep Dasar
            </span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Apa itu Statistik Sektoral?
            </h2>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontSize: '0.92rem',
          lineHeight: '1.7',
          color: 'var(--text-main)',
          marginBottom: '1.25rem'
        }}>
          Statistik sektoral adalah statistik yang pemanfaatannya ditujukan untuk memenuhi kebutuhan suatu instansi pemerintah tertentu dalam rangka penyelenggaraan tugas-tugas pemerintahan dan pembangunan yang merupakan tugas pokok instansi pemerintah yang bersangkutan. Kegiatan statistik sektoral dilaksanakan oleh instansi pemerintah non-BPS yang sesuai dengan lingkup tugas dan fungsinya, baik secara mandiri atau bekerjasama dengan BPS. Hasil statistik sektoral wajib diserahkan kepada BPS.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'Tujuan Pemanfaatan', color: 'var(--accent-blue)', title: 'Tugas Pokok Pemerintahan', desc: 'Memenuhi kebutuhan data spesifik untuk perumusan program kerja instansi daerah.' },
            { label: 'Pelaksana Kegiatan', color: 'var(--primary)', title: 'Instansi Non-BPS (OPD)', desc: 'Dilaksanakan oleh OPD/dinas secara mandiri maupun kolaborasi bersama BPS.' },
            { label: 'Kewajiban Penyerahan', color: 'var(--accent-green)', title: 'Penyerahan Hasil ke BPS', desc: 'Hasil statistik sektoral wajib diserahkan kepada BPS sebagai Pembina Data.' }
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: item.color }}>{item.label}</span>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '3px', marginBottom: '3px', color: 'var(--text-main)' }}>{item.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tujuan Pembinaan */}
      <section className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
            Arah & Pilar Pembinaan
          </span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
            Tujuan Pembinaan Statistik Sektoral
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Lima sasaran strategis pembinaan statistik sektoral bagi OPD Kabupaten Pasaman:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Featured Strategic Pillars (Pilar 1 & 2) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {tujuanPembinaan.slice(0, 2).map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${item.color}30`,
                    background: 'var(--bg-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      background: `${item.color}14`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComp size={22} color={item.color} />
                    </div>
                    <span className="badge" style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: item.color,
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}25`
                    }}>
                      Pilar Utama 0{item.id}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1.3' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Operational Pillars (Pilar 3, 4, 5) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            {tujuanPembinaan.slice(2).map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: '1.1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      background: `${item.color}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComp size={18} color={item.color} />
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)'
                    }}>
                      Pilar 0{item.id}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.3' }}>
                    {item.title}
                  </h4>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apa itu Kompromin */}
      <section className="glass-card" style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--primary-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <FileText size={20} color="var(--primary)" />
          <div>
            <span className="badge badge-primary" style={{ fontSize: '0.72rem', padding: '2px 8px', marginBottom: '3px', display: 'inline-block' }}>
              Metodologi Data
            </span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Apa itu Kompromin?
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            background: 'var(--bg-surface)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.92rem',
            lineHeight: '1.7',
            color: 'var(--text-secondary)'
          }}>
            <p style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              <strong style={{ color: 'var(--primary-hover)', fontSize: '1rem' }}>KOMPROMIN</strong> merupakan singkatan dari <strong>Kompilasi Produk Administrasi</strong>. Ini adalah metode pengumpulan, pengolahan, penyajikan, dan analisis data yang secara eksklusif bersumber dari catatan administrasi yang telah ada di instansi pemerintah dan/atau masyarakat. Berbeda dengan sensus atau survei yang mengumpulkan data primer (data yang didapatkan langsung dari objek penelitian), KOMPROMIN tidak melibatkan pengumpulan data baru.
            </p>
            <p>
              Data yang digunakan dalam KOMPROMIN adalah data sekunder yang berasal dari berbagai laporan dan catatan rutin yang dihasilkan oleh instansi atau organisasi. Catatan administrasi ini dibuat dan dikelola oleh masing-masing lembaga dalam rangka memenuhi kebutuhan tugas dan fungsi operasional mereka sehari-hari. Dengan demikian, KOMPROMIN memanfaatkan kekayaan informasi yang sudah tersedia untuk menghasilkan statistik yang relevan dan efisien.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            <div style={{
              background: 'var(--bg-surface)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Pendekatan Konvensional</span>
                <span className="badge" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border-color)', fontSize: '0.68rem' }}>Data Primer</span>
              </div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Sensus & Survei Lapangan
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Mengumpulkan data langsung dari responden atau objek penelitian di lapangan. Membutuhkan waktu, biaya, dan sumber daya pencatatan baru.
              </p>
            </div>

            <div style={{
              background: 'var(--primary-light)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--primary-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-hover)' }}>Metode Kompromin</span>
                <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>Data Sekunder</span>
              </div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Kompilasi Catatan Rutin OPD
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Memanfaatkan secara efisien laporan rutin dan catatan administrasi harian yang sudah ada di dinas tanpa perlu mengumpulkan data baru dari nol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="glass-card" style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Siap Memulai Pembinaan Statistik Sektoral?
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', maxWidth: '560px', margin: '0 auto 1.25rem auto' }}>
          Gunakan fitur SIMPONITAS untuk mengajukan permohonan pembinaan, melihat repositori dokumen Kompromin, atau mempelajari modul & SOP statistik sektoral.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('permohonan')} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
            Akses Layanan Pembinaan
          </button>
          <button onClick={() => onNavigate('dataSektoral')} className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
            Lihat Data Sektoral OPD
          </button>
          <button onClick={() => onNavigate('knowledgeBase')} className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
            Modul Knowledge Base & SOP
          </button>
        </div>
      </section>

    </div>
  );
}
