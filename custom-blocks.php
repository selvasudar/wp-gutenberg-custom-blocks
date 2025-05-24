<?php
/**
 * Plugin Name: Custom Gutenberg Blocks
 * Plugin URI: https://yourwebsite.com/
 * Description: A collection of custom Gutenberg blocks for WordPress.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yourwebsite.com/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: custom-gutenberg-blocks
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('CGB_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CGB_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('CGB_PLUGIN_VERSION', '1.0.0');

class CustomGutenbergBlocks {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
    }
    
    public function init() {
        // Load text domain for translations
        load_plugin_textdomain('custom-gutenberg-blocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        // Register blocks
        $this->register_blocks();
    }
    
    public function register_blocks() {
        // Register hero section block
        if (file_exists(CGB_PLUGIN_PATH . 'blocks/hero-section/hero-section.php')) {
            require_once CGB_PLUGIN_PATH . 'blocks/hero-section/hero-section.php';
        }
        
        // Register accordion block
        if (file_exists(CGB_PLUGIN_PATH . 'blocks/accordion/accordion.php')) {
            require_once CGB_PLUGIN_PATH . 'blocks/accordion/accordion.php';
        }
    }
    
    public function enqueue_block_editor_assets() {
        // Get asset file for dependencies
        $asset_file = CGB_PLUGIN_PATH . 'build/index.asset.php';
        $asset = file_exists($asset_file) ? include $asset_file : array(
            'dependencies' => array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components'),
            'version' => CGB_PLUGIN_VERSION
        );
        
        // Enqueue block editor scripts
        $script_registered = wp_enqueue_script(
            'custom-gutenberg-blocks-editor',
            CGB_PLUGIN_URL . 'build/index.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );
        
        // Add some debug info
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('CGB Plugin: Script registered: ' . ($script_registered ? 'yes' : 'no'));
            error_log('CGB Plugin: Script URL: ' . CGB_PLUGIN_URL . 'build/index.js');
            error_log('CGB Plugin: Asset file exists: ' . (file_exists($asset_file) ? 'yes' : 'no'));
        }
        
        // Enqueue block editor styles if they exist
        if (file_exists(CGB_PLUGIN_PATH . 'build/index.css')) {
            wp_enqueue_style(
                'custom-gutenberg-blocks-editor',
                CGB_PLUGIN_URL . 'build/index.css',
                array('wp-edit-blocks'),
                $asset['version']
            );
        }
    }
    
    public function enqueue_frontend_assets() {
        // Only enqueue frontend styles if they exist
        if (file_exists(CGB_PLUGIN_PATH . 'build/style-index.css')) {
            wp_enqueue_style(
                'custom-gutenberg-blocks-frontend',
                CGB_PLUGIN_URL . 'build/style-index.css',
                array(),
                CGB_PLUGIN_VERSION
            );
        } elseif (file_exists(CGB_PLUGIN_PATH . 'blocks/hero-section/style.css')) {
            wp_enqueue_style(
                'custom-gutenberg-blocks-frontend',
                CGB_PLUGIN_URL . 'blocks/hero-section/style.css',
                array(),
                CGB_PLUGIN_VERSION
            );
        }
    }
}

// Initialize the plugin
new CustomGutenbergBlocks();