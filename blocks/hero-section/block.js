const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType('custom-blocks/hero-section', {
    title: 'Hero Section',
    icon: 'format-image',
    category: 'common',
    keywords: ['hero', 'section', 'banner', 'custom'], // Added keywords for searchability
    attributes: {
        title: {
            type: 'string',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        return (
            <div className="custom-block-editor">
                <RichText
                    tagName="h2"
                    value={attributes.title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder="Enter hero title..."
                />
            </div>
        );
    },
    save: () => null, // Dynamic block, rendered via PHP
});