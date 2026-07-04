// Qibla calculation utility

const KAABA_LAT = 21.4225241;
const KAABA_LNG = 39.8261818;

/**
 * Calculates the Qibla bearing (direction in degrees from North)
 * @param {number} lat - User latitude
 * @param {number} lng - User longitude
 * @returns {number} Angle in degrees (0 = North, 90 = East, etc.)
 */
export function calculateQibla(lat, lng) {
    const phiRec = lat * Math.PI / 180;
    const lambdaRec = lng * Math.PI / 180;
    const phiK = KAABA_LAT * Math.PI / 180;
    const lambdaK = KAABA_LNG * Math.PI / 180;

    const diffLng = lambdaK - lambdaRec;

    const y = Math.sin(diffLng);
    const x = Math.cos(phiRec) * Math.tan(phiK) - Math.sin(phiRec) * Math.cos(diffLng);

    let qiblaRad = Math.atan2(y, x);
    let qiblaDeg = qiblaRad * 180 / Math.PI;

    // Normalize to 0-360
    return (qiblaDeg + 360) % 360;
}
