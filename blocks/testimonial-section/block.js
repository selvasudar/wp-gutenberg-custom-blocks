const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType('custom-blocks/testimonial-section', {
    title: 'Testimonial Section',
    icon: 'format-quote',
    category: 'common',
    attributes: {
        content: {
            type: 'string',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        return (
            <div className="custom-block-editor">
                <RichText
                    tagName="p"
                    value={attributes.content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder="Enter testimonial content..."
                />
            </div>
        );
    },
    save: () => null, // Dynamic block, rendered via PHP
});