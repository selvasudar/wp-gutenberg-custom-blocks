<?php
// Bottom CTA Section Block Rendering
$ctaText = isset($attributes['ctaText']) ? esc_html($attributes['ctaText']) : '';
$ctaLink = isset($attributes['ctaLink']) ? esc_url($attributes['ctaLink']) : '#';
?>
<div class="custom-block custom-bottom-cta-section">
    <?php if ($ctaText) : ?>
        <a href="<?php echo $ctaLink; ?>" class="cta-button"><?php echo $ctaText; ?></a>
    <?php else : ?>
        <p>Bottom CTA section placeholder.</p>
    <?php endif; ?>
</div>
?>