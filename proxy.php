<?php
// proxy.php - CORS & Mixed Content Bypass Proxy for EQuran API & TTS Voice
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// Handle Google Translate TTS Audio Proxying
if (isset($_GET['tts'])) {
    header("Content-Type: audio/mpeg");
    $text = $_GET['tts'];
    $url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" . urlencode($text) . "&tl=ar&client=tw-ob";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Bypass local SSL verification
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
    
    $audio = curl_exec($ch);
    curl_close($ch);
    
    if ($audio !== false) {
        echo $audio;
    }
    exit;
}

header("Content-Type: application/json");

$path = $_GET['path'] ?? '';
if (empty($path)) {
    echo json_encode(["code" => 400, "message" => "Path is required"]);
    exit;
}

// Validate path to prevent remote file inclusion or path traversal
// Matches 'surat', 'surat/114', 'tafsir/114', 'doa', 'doa/5', etc.
if (!preg_match('/^(surat|tafsir|doa)(\/\d+)?$/', $path)) {
    echo json_encode(["code" => 400, "message" => "Invalid path format"]);
    exit;
}

if (strpos($path, 'doa') === 0) {
    $url = "https://equran.id/api/" . $path;
} else {
    $url = "https://equran.id/api/v2/" . $path;
}

// Perform curl fetch
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Bypass local SSL certificate verification
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($http_code === 200 && $response !== false) {
    echo $response;
} else {
    // If remote fails, return local JSON error with cURL details
    echo json_encode([
        "code" => 500,
        "message" => "Gagal mengambil data dari server EQuran.",
        "error" => $error,
        "http_code" => $http_code
    ]);
}
