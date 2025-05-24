<?php
// Testimonial Section Block Rendering
$content = isset($attributes['content']) ? esc_html($attributes['content']) : '';
?>
<div class="custom-block custom-testimonial-section">
    <?php if ($content) : ?>
        <p><?php echo $content; ?></p>
    <?php else : ?>
        <p>Testimonial section placeholder.</p>
    <?php endif; ?>
</div>
?>