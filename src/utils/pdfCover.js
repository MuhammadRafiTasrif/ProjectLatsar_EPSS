import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof window !== 'undefined' && pdfjsLib?.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

export function isPdfFile(file) {
  if (!file) return false;
  if (file.type === 'application/pdf') return true;
  return typeof file.name === 'string' && file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Render halaman pertama dokumen PDF ke gambar JPEG terkompresi (data URL)
 * agar dapat digunakan sebagai sampul default publikasi dan aman disimpan ke Supabase.
 */
export async function extractPdfFirstPageCover(
  file,
  { maxWidth = 720, maxHeight = 1020, quality = 0.72 } = {}
) {
  if (!isPdfFile(file)) {
    throw new Error('File yang dipilih bukan dokumen PDF.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });

  let pdfDocument = null;
  let firstPage = null;
  let canvas = null;

  try {
    pdfDocument = await loadingTask.promise;
    if (!pdfDocument || pdfDocument.numPages < 1) {
      throw new Error('Dokumen PDF tidak memiliki halaman yang dapat ditampilkan.');
    }

    firstPage = await pdfDocument.getPage(1);
    const baseViewport = firstPage.getViewport({ scale: 1 });

    if (!baseViewport.width || !baseViewport.height) {
      throw new Error('Dimensi halaman awal PDF tidak valid.');
    }

    const scale = Math.min(
      maxWidth / baseViewport.width,
      maxHeight / baseViewport.height,
      2
    );
    const viewport = firstPage.getViewport({ scale: Math.max(scale, 0.25) });

    canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(viewport.width));
    canvas.height = Math.max(1, Math.round(viewport.height));

    // Render dengan latar putih solid agar halaman PDF transparan tidak menjadi hitam saat ekspor JPEG
    await firstPage.render({
      canvas,
      viewport,
      background: 'rgb(255,255,255)'
    }).promise;

    const coverUrl = canvas.toDataURL('image/jpeg', quality);
    const base64Part = coverUrl.split(',')[1] || '';
    const compressedSize = Math.round((base64Part.length * 3) / 4);

    return {
      coverUrl,
      width: canvas.width,
      height: canvas.height,
      compressedSize,
      pageCount: pdfDocument.numPages
    };
  } catch (err) {
    if (err?.name === 'PasswordException') {
      throw new Error(
        'Dokumen PDF dilindungi kata sandi sehingga halaman awal tidak dapat dibaca otomatis. Unggah gambar sampul secara manual.'
      );
    }
    if (err?.name === 'InvalidPDFException') {
      throw new Error(
        'Berkas PDF tidak valid atau rusak. Pastikan file PDF dapat dibuka, atau unggah gambar sampul secara manual.'
      );
    }
    throw err;
  } finally {
    if (firstPage && typeof firstPage.cleanup === 'function') {
      firstPage.cleanup();
    }
    if (pdfDocument && typeof pdfDocument.cleanup === 'function') {
      await pdfDocument.cleanup();
    }
    if (loadingTask && typeof loadingTask.destroy === 'function') {
      await loadingTask.destroy();
    }
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }
}
