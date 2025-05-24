<?php

function cgb_register_custom_blocks() {
    $blocks_dir = CGB_PLUGIN_DIR . 'blocks/';

    $block_folders = array_filter(glob($blocks_dir . '*'), 'is_dir');

    foreach ($block_folders as $folder) {
        $block_name = basename($folder);
        $block_json = $folder . '/block.json';

        // Prefer block.json registration
        if (file_exists($block_json)) {
            register_block_type_from_metadata($block_json);
        }

        // Include server-side PHP render if exists
        $php_file = $folder . '/' . $block_name . '.php';
        if (file_exists($php_file)) {
            require_once $php_file;
        }
    }
}
add_action('init', 'cgb_register_custom_blocks');
