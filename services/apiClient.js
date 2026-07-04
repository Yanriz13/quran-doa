// services/apiClient.js
// Helper terpusat untuk mengambil data.
// Mencoba proxy.php dulu (untuk lokal/Laragon dengan PHP),
// lalu otomatis fallback ke API langsung equran.id (untuk GitHub Pages / hosting statis tanpa PHP).

const DIRECT_BASE = "https://equran.id/api";

// Bangun URL API langsung berdasarkan path proxy.
function buildDirectUrl(path) {
    // 'doa' dan 'doa/5' -> https://equran.id/api/doa
    // 'surat', 'surat/114', 'tafsir/114' -> https://equran.id/api/v2/...
    if (path.indexOf("doa") === 0) {
        return `${DIRECT_BASE}/${path}`;
    }
    return `${DIRECT_BASE}/v2/${path}`;
}

// Cek apakah respons benar-benar JSON yang valid (bukan HTML error / kode PHP mentah).
async function parseJsonSafe(res) {
    if (!res || !res.ok) return null;
    try {
        return await res.json();
    } catch (err) {
        return null;
    }
}

/**
 * Ambil data JSON dari API.
 * @param {string} path contoh: "doa", "surat", "surat/114", "tafsir/114"
 * @returns {Promise<object|null>} objek JSON hasil parse, atau null bila gagal.
 */
export async function fetchApiData(path) {
    // 1. Coba lewat proxy.php (lokal)
    try {
        const res = await fetch(`./proxy.php?path=${encodeURIComponent(path)}`);
        const json = await parseJsonSafe(res);
        // Proxy mengembalikan error internal dalam bentuk { code: 500, ... }
        if (json && !json.code) {
            return json;
        }
    } catch (err) {
        // abaikan, lanjut ke fallback
    }

    // 2. Fallback: ambil langsung dari equran.id (GitHub Pages)
    try {
        const res = await fetch(buildDirectUrl(path));
        const json = await parseJsonSafe(res);
        if (json) {
            return json;
        }
    } catch (err) {
        console.error("Gagal mengambil data langsung dari equran.id:", err);
    }

    return null;
}

/**
 * URL untuk TTS suara Arab.
 * Di lokal memakai proxy.php; di hosting statis memakai Google Translate TTS langsung.
 */
export function buildTtsUrl(arabicText) {
    return `./proxy.php?tts=${encodeURIComponent(arabicText)}`;
}
