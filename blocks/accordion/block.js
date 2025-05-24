/**
 * Accordion Block
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';

// Register the block
registerBlockType('cgb/accordion', {
    title: __('Accordion', 'custom-gutenberg-blocks'),
    description: __('Create expandable accordion sections with dynamic tabs.', 'custom-gutenberg-blocks'),
    category: 'design',
    icon: 'list-view',
    keywords: [__('accordion'), __('tabs'), __('collapse'), __('faq')],
    supports: {
        html: false,
        anchor: true,
        className: true,
    },
    attributes: {
        accordionItems: {
            type: 'array',
            default: [
                {
                    id: 'item-1',
                    title: 'First Accordion Item',
                    content: 'This is the content for the first accordion item. You can add any text here.',
                    isOpen: false
                }
            ]
        },
        allowMultiple: {
            type: 'boolean',
            default: false
        },
        style: {
            type: 'string',
            default: 'default'
        },
        titleColor: {
            type: 'string',
            default: '#333333'
        },
        backgroundColor: {
            type: 'string',
            default: '#f8f9fa'
        },
        borderColor: {
            type: 'string',
            default: '#dee2e6'
        }
    },
    edit: Edit,
    save: () => {
        // Server-side rendering - return null
        return null;
    },
});