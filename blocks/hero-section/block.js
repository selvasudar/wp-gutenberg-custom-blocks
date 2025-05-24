/**
 * Hero Section Block
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';

// Register the block
registerBlockType('cgb/hero-section', {
    title: __('Hero Section', 'custom-gutenberg-blocks'),
    description: __('A customizable hero section with title, subtitle, button, and background options.', 'custom-gutenberg-blocks'),
    category: 'design',
    icon: 'cover-image',
    keywords: [__('hero'), __('banner'), __('header'), __('cta')],
    supports: {
        html: false,
        anchor: true,
        className: true,
    },
    attributes: {
        title: {
            type: 'string',
            default: 'Hero Title'
        },
        subtitle: {
            type: 'string',
            default: 'Your compelling subtitle goes here'
        },
        buttonText: {
            type: 'string',
            default: 'Call to Action'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        backgroundImage: {
            type: 'string',
            default: ''
        },
        backgroundColor: {
            type: 'string',
            default: '#000000'
        },
        textColor: {
            type: 'string',
            default: '#ffffff'
        },
        alignment: {
            type: 'string',
            default: 'center'
        },
        height: {
            type: 'string',
            default: 'medium'
        }
    },
    edit: Edit,
    save: () => {
        // Server-side rendering - return null
        return null;
    },
});