<?php

return [

    /*
    |----------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |----------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Apply CORS to API routes and Sanctum cookie route

    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, etc.)

    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')], // Only allow frontend URL (for security)

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => [], // No need to expose any headers for this case

    'max_age' => 0, // Caching for preflight requests

    'supports_credentials' => true, // Needed for cookies or authentication

];
