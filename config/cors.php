<?php

return [
    'paths' => ['api/*', 'spotify/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'max_age' => 0,
    'supports_credentials' => true,
];

