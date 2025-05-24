/**
 * Hero Section Block Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    ColorPalette,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl,
    Button,
    ColorPicker,
    BaseControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
    const {
        title,
        subtitle,
        buttonText,
        buttonUrl,
        backgroundImage,
        backgroundColor,
        textColor,
        alignment,
        height,
    } = attributes;

    const blockProps = useBlockProps({
        className: `wp-block-cgb-hero-section alignment-${alignment} height-${height}`,
        style: {
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundColor: backgroundColor,
            color: textColor,
        },
    });

    const onSelectImage = (media) => {
        setAttributes({
            backgroundImage: media.url,
        });
    };

    const removeImage = () => {
        setAttributes({
            backgroundImage: '',
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content Settings', 'custom-gutenberg-blocks')} initialOpen={true}>
                    <TextControl
                        label={__('Title', 'custom-gutenberg-blocks')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextControl
                        label={__('Subtitle', 'custom-gutenberg-blocks')}
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                    />
                    <TextControl
                        label={__('Button Text', 'custom-gutenberg-blocks')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <TextControl
                        label={__('Button URL', 'custom-gutenberg-blocks')}
                        value={buttonUrl}
                        onChange={(value) => setAttributes({ buttonUrl: value })}
                        type="url"
                    />
                </PanelBody>

                <PanelBody title={__('Layout Settings', 'custom-gutenberg-blocks')} initialOpen={false}>
                    <SelectControl
                        label={__('Text Alignment', 'custom-gutenberg-blocks')}
                        value={alignment}
                        options={[
                            { label: __('Left', 'custom-gutenberg-blocks'), value: 'left' },
                            { label: __('Center', 'custom-gutenberg-blocks'), value: 'center' },
                            { label: __('Right', 'custom-gutenberg-blocks'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                    <SelectControl
                        label={__('Height', 'custom-gutenberg-blocks')}
                        value={height}
                        options={[
                            { label: __('Small', 'custom-gutenberg-blocks'), value: 'small' },
                            { label: __('Medium', 'custom-gutenberg-blocks'), value: 'medium' },
                            { label: __('Large', 'custom-gutenberg-blocks'), value: 'large' },
                            { label: __('Full Screen', 'custom-gutenberg-blocks'), value: 'full' },
                        ]}
                        onChange={(value) => setAttributes({ height: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Background Settings', 'custom-gutenberg-blocks')} initialOpen={false}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={backgroundImage}
                            render={({ open }) => (
                                <div>
                                    <Button 
                                        onClick={open}
                                        variant="secondary"
                                        style={{ marginBottom: '10px' }}
                                    >
                                        {backgroundImage ? __('Change Image', 'custom-gutenberg-blocks') : __('Select Background Image', 'custom-gutenberg-blocks')}
                                    </Button>
                                    {backgroundImage && (
                                        <div>
                                            <img 
                                                src={backgroundImage} 
                                                alt={__('Background', 'custom-gutenberg-blocks')} 
                                                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                                            />
                                            <Button 
                                                onClick={removeImage}
                                                variant="secondary"
                                                isDestructive
                                            >
                                                {__('Remove Image', 'custom-gutenberg-blocks')}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    
                    <BaseControl label={__('Background Color', 'custom-gutenberg-blocks')}>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                    </BaseControl>
                </PanelBody>

                <PanelBody title={__('Text Color', 'custom-gutenberg-blocks')} initialOpen={false}>
                    <BaseControl label={__('Text Color', 'custom-gutenberg-blocks')}>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                        />
                    </BaseControl>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="hero-content">
                    {title && <h1 className="hero-title">{title}</h1>}
                    {subtitle && <p className="hero-subtitle">{subtitle}</p>}
                    {buttonText && buttonUrl && (
                        <div className="hero-button-wrapper">
                            <a href={buttonUrl} className="hero-button">
                                {buttonText}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Edit;