const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, TextControl } = wp.blockEditor;
const { PanelBody } = wp.components;

registerBlockType('custom-blocks/bottom-cta-section', {
    title: 'Bottom CTA Section',
    icon: 'button',
    category: 'common',
    attributes: {
        ctaText: {
            type: 'string',
            default: 'Call to Action',
        },
        ctaLink: {
            type: 'string',
            default: '#',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        return (
            <div className="custom-block-editor">
                <InspectorControls>
                    <PanelBody title="CTA Settings">
                        <TextControl
                            label="CTA Link"
                            value={attributes.ctaLink}
                            onChange={(value) => setAttributes({ ctaLink: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <RichText
                    tagName="span"
                    value={attributes.ctaText}
                    onChange={(value) => setAttributes({ ctaText: value })}
                    placeholder="Enter CTA text..."
                />
            </div>
        );
    },
    save: () => null, // Dynamic block, rendered via PHP
});