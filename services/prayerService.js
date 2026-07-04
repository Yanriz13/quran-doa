// Prayer Times API Service

const DEFAULT_METHOD = 20; // Kemenag RI

/**
 * Fetch prayer times from Aladhan API using coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} method - Calculation method ID
 * @returns {Promise<object>} Timing data and Hijri date
 */
export async function fetchPrayerTimes(lat, lng, method = DEFAULT_METHOD) {
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=${method}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API response error");
        
        const json = await response.json();
        if (json.code === 200) {
            const data = json.data;
            return {
                timings: data.timings,
                hijri: data.date.hijri,
                gregorian: data.date.gregorian,
                meta: data.meta
            };
        } else {
            throw new Error("Failed to load data from Aladhan");
        }
    } catch (error) {
        console.warn("Using offline fallback timings due to API/network error:", error);
        return getFallbackTimings();
    }
}

/**
 * Fetch prayer times by city and country
 * @param {string} city 
 * @param {string} country 
 * @param {number} method 
 */
export async function fetchPrayerTimesByCity(city, country = "Indonesia", method = DEFAULT_METHOD) {
    const url = `https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(city + ", " + country)}&method=${method}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API response error");
        const json = await response.json();
        if (json.code === 200) {
            const data = json.data;
            return {
                timings: data.timings,
                hijri: data.date.hijri,
                gregorian: data.date.gregorian,
                meta: data.meta
            };
        } else {
            throw new Error("Failed to load data from Aladhan");
        }
    } catch (error) {
        console.warn("Using offline fallback timings due to API/network error:", error);
        return getFallbackTimings();
    }
}

/**
 * Fallback offline data when API is unavailable
 */
function getFallbackTimings() {
    const now = new Date();
    // Dummy Hijri calculation (approximation)
    const options = { calendar: "islamic-umalqura", day: "numeric", month: "long", year: "numeric" };
    const hijriFormatter = new Intl.DateTimeFormat("id-ID", options);
    const hijriString = hijriFormatter.format(now);
    
    // Split Hijri String (e.g., "15 Muharram 1445 AH")
    const hijriParts = hijriString.split(" ");
    
    return {
        timings: {
            Fajr: "04:43",
            Sunrise: "06:01",
            Dhuhr: "12:02",
            Asr: "15:22",
            Maghrib: "17:58",
            Isha: "19:12",
            Imsak: "04:33",
            Midnight: "23:58"
        },
        hijri: {
            date: hijriString,
            day: hijriParts[0] || String(now.getDate()),
            month: {
                en: hijriParts[1] || "Bulan",
                ar: "الشهر"
            },
            year: hijriParts[2] || "1447",
            designation: {
                abbreviated: "H"
            }
        },
        gregorian: {
            date: now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
        },
        meta: {
            method: {
                name: "Offline Fallback (Waktu Standar)"
            }
        }
    };
}
