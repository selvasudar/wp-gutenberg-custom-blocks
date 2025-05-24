<?php
/**
 * Accordion Block
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class AccordionBlock {
    
    public function __construct() {
        add_action('init', array($this, 'register_block'));
    }
    
    public function register_block() {
        // Register the block
        register_block_type(
            CGB_PLUGIN_PATH . 'blocks/accordion/block.json',
            array(
                'render_callback' => array($this, 'render_block'),
            )
        );
    }
    
    public function render_block($attributes, $content) {
        // Extract attributes with defaults
        $accordionItems = isset($attributes['accordionItems']) ? $attributes['accordionItems'] : array();
        $allowMultiple = isset($attributes['allowMultiple']) ? $attributes['allowMultiple'] : false;
        $style = isset($attributes['style']) ? $attributes['style'] : 'default';
        $titleColor = isset($attributes['titleColor']) ? $attributes['titleColor'] : '#333333';
        $backgroundColor = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '#f8f9fa';
        $borderColor = isset($attributes['borderColor']) ? $attributes['borderColor'] : '#dee2e6';
        
        // If no items, return empty
        if (empty($accordionItems)) {
            return '';
        }
        
        // Generate unique ID for this accordion instance
        $accordion_id = 'accordion-' . wp_generate_uuid4();
        
        // Build CSS classes
        $classes = array('wp-block-cgb-accordion');
        $classes[] = 'style-' . $style;
        
        // Build inline styles
        $styles = array();
        $styles[] = '--accordion-title-color: ' . esc_attr($titleColor);
        $styles[] = '--accordion-bg-color: ' . esc_attr($backgroundColor);
        $styles[] = '--accordion-border-color: ' . esc_attr($borderColor);
        
        $style_attr = 'style="' . implode('; ', $styles) . '"';
        
        // Start output buffering
        ob_start();
        ?>
        <div class="<?php echo esc_attr(implode(' ', $classes)); ?>" <?php echo $style_attr; ?> data-allow-multiple="<?php echo $allowMultiple ? 'true' : 'false'; ?>" id="<?php echo esc_attr($accordion_id); ?>">
            <div class="accordion-container">
                <?php foreach ($accordionItems as $index => $item): ?>
                    <?php
                    $item_id = isset($item['id']) ? $item['id'] : 'item-' . $index;
                    $title = isset($item['title']) ? $item['title'] : '';
                    $content = isset($item['content']) ? $item['content'] : '';
                    $isOpen = isset($item['isOpen']) ? $item['isOpen'] : false;
                    ?>
                    <div class="accordion-item <?php echo $isOpen ? 'is-open' : ''; ?>" data-item-id="<?php echo esc_attr($item_id); ?>">
                        <div class="accordion-header" role="button" tabindex="0" aria-expanded="<?php echo $isOpen ? 'true' : 'false'; ?>" aria-controls="<?php echo esc_attr($accordion_id . '-content-' . $index); ?>">
                            <div class="accordion-title">
                                <?php echo wp_kses_post($title); ?>
                            </div>
                        </div>
                        <div class="accordion-content" id="<?php echo esc_attr($accordion_id . '-content-' . $index); ?>" role="region" aria-labelledby="<?php echo esc_attr($accordion_id . '-header-' . $index); ?>">
                            <div>
                                <?php echo wp_kses_post($content); ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <script>
        (function() {
            // Accordion functionality
            const accordion = document.getElementById('<?php echo esc_js($accordion_id); ?>');
            if (!accordion) return;
            
            const allowMultiple = accordion.dataset.allowMultiple === 'true';
            const headers = accordion.querySelectorAll('.accordion-header');
            
            headers.forEach(function(header) {
                header.addEventListener('click', function() {
                    const item = header.closest('.accordion-item');
                    const isOpen = item.classList.contains('is-open');
                    
                    if (!allowMultiple) {
                        // Close all other items
                        accordion.querySelectorAll('.accordion-item').forEach(function(otherItem) {
                            if (otherItem !== item) {
                                otherItem.classList.remove('is-open');
                                const otherHeader = otherItem.querySelector('.accordion-header');
                                if (otherHeader) {
                                    otherHeader.setAttribute('aria-expanded', 'false');
                                }
                            }
                        });
                    }
                    
                    // Toggle current item
                    if (isOpen) {
                        item.classList.remove('is-open');
                        header.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('is-open');
                        header.setAttribute('aria-expanded', 'true');
                    }
                });
                
                // Keyboard support
                header.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            });
        })();
        </script>
        <?php
        
        return ob_get_clean();
    }
}

// Initialize the block
new AccordionBlock();