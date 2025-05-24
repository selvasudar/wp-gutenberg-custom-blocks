<?php
// Hero Section Block Rendering
$title = isset($attributes['title']) ? esc_html($attributes['title']) : '';
?>
<div class="custom-block custom-hero-section">
    <?php if ($title) : ?>
        <h2><?php echo $title; ?></h2>
    <?php else : ?>
        <p>Hero section placeholder.</p>
    <?php endif; ?>
</div>
?>