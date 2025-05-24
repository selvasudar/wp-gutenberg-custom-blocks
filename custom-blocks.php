<?php
/**
 * Plugin Name: Custom Blocks
 * Description: A modular Gutenberg blocks plugin for hero, testimonial, and bottom CTA sections.
 * Version: 1.0.0
 * Author: Selvakumar Duraipandian
 * Author URI:https://linkedin.com/in/selvakumarduraipandian
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function custom_blocks_register() {
    // Define paths
    $blocks_dir = plugin_dir_path(__FILE__) . 'blocks/';
    $blocks = array('hero-section', 'testimonial-section', 'bottom-cta-section');

    // Register shared editor and frontend styles
    wp_register_style(
        'custom-blocks-editor',
        plugins_url('assets/css/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/editor.css')
    );

    wp_register_style(
        'custom-blocks-style',
        plugins_url('assets/css/style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/style.css')
    );

    // Register shared block editor script
    wp_register_script(
        'custom-blocks-editor',
        plugins_url('assets/js/blocks.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor', 'wp-server-side-render'),
        filemtime(plugin_dir_path(__FILE__) . 'assets/js/blocks.js'),
        true
    );

    // Register each block
    foreach ($blocks as $block) {
        $block_path = $blocks_dir . $block;
        if (is_dir($block_path)) {
            // Register block-specific styles
            wp_register_style(
                "custom-blocks-{$block}-editor",
                plugins_url("blocks/{$block}/editor.css", __FILE__),
                array('custom-blocks-editor'),
                filemtime("{$block_path}/editor.css")
            );

            wp_register_style(
                "custom-blocks-{$block}-style",
                plugins_url("blocks/{$block}/style.css", __FILE__),
                array('custom-blocks-style'),
                filemtime("{$block_path}/style.css")
            );

            wp_register_script(
                "custom-blocks-{$block}-editor",
                plugins_url("blocks/{$block}/block.js", __FILE__),
                array('custom-blocks-editor'),
                filemtime("{$block_path}/block.js"),
                true
            );

            // Register the block
            $block_registered = register_block_type("custom-blocks/{$block}", array(
                'editor_script' => "custom-blocks-{$block}-editor",
                'editor_style'  => "custom-blocks-{$block}-editor",
                'style'         => "custom-blocks-{$block}-style",
                'render_callback' => function($attributes) use ($block) {
                    return custom_blocks_render_block($block, $attributes);
                },
            ));

            // Log registration status for debugging
            if (!$block_registered) {
                error_log("Failed to register block: custom-blocks/{$block}");
            }
        } else {
            error_log("Block directory not found: {$block_path}");
        }
    }
}

add_action('init', 'custom_blocks_register');

// Server-side rendering callback
function custom_blocks_render_block($block, $attributes) {
    // Include the block's index.php for rendering
    $block_path = plugin_dir_path(__FILE__) . "blocks/{$block}/index.php";
    if (file_exists($block_path)) {
        ob_start();
        include $block_path;
        return ob_get_clean();
    }
    error_log("Block rendering file not found: {$block_path}");
    return '<div>Block rendering error.</div>';
}
?>