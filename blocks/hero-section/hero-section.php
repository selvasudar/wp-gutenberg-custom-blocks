<?php
/**
 * Hero Section Block
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class HeroSectionBlock {
    
    public function __construct() {
        add_action('init', array($this, 'register_block'));
    }
    
    public function register_block() {
        // Register the block
        register_block_type(
            CGB_PLUGIN_PATH . 'blocks/hero-section/block.json',
            array(
                'render_callback' => array($this, 'render_block'),
            )
        );
    }
    
    public function render_block($attributes, $content) {
        // Extract attributes with defaults
        $title = isset($attributes['title']) ? $attributes['title'] : '';
        $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
        $buttonText = isset($attributes['buttonText']) ? $attributes['buttonText'] : '';
        $buttonUrl = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '';
        $backgroundImage = isset($attributes['backgroundImage']) ? $attributes['backgroundImage'] : '';
        $backgroundColor = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#000000';
        $textColor = isset($attributes['textColor']) ? $attributes['textColor'] : '#ffffff';
        $alignment = isset($attributes['alignment']) ? $attributes['alignment'] : 'center';
        $height = isset($attributes['height']) ? $attributes['height'] : 'medium';
        
        // Build CSS classes
        $classes = array('wp-block-cgb-hero-section');
        $classes[] = 'alignment-' . $alignment;
        $classes[] = 'height-' . $height;
        
        // Build inline styles
        $styles = array();
        if ($backgroundImage) {
            $styles[] = 'background-image: url(' . esc_url($backgroundImage) . ')';
        }
        $styles[] = 'background-color: ' . esc_attr($backgroundColor);
        $styles[] = 'color: ' . esc_attr($textColor);
        
        $style_attr = !empty($styles) ? 'style="' . implode('; ', $styles) . '"' : '';
        
        // Start output buffering
        ob_start();
        ?>
        <div class="<?php echo esc_attr(implode(' ', $classes)); ?>" <?php echo $style_attr; ?>>
            <div class="hero-content">
                <?php if ($title): ?>
                    <h1 class="hero-title"><?php echo esc_html($title); ?></h1>
                <?php endif; ?>
                
                <?php if ($subtitle): ?>
                    <p class="hero-subtitle"><?php echo esc_html($subtitle); ?></p>
                <?php endif; ?>
                
                <?php if ($buttonText && $buttonUrl): ?>
                    <div class="hero-button-wrapper">
                        <a href="<?php echo esc_url($buttonUrl); ?>" class="hero-button">
                            <?php echo esc_html($buttonText); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
        
        return ob_get_clean();
    }
}

// Initialize the block
new HeroSectionBlock();