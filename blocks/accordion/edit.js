/**
 * Accordion Block Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    RichText,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    SelectControl,
    Button,
    ColorPicker,
    BaseControl,
    TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Edit = ({ attributes, setAttributes }) => {
    const {
        accordionItems,
        allowMultiple,
        style,
        titleColor,
        backgroundColor,
        borderColor,
    } = attributes;

    const [activeItem, setActiveItem] = useState(null);

    const blockProps = useBlockProps({
        className: `wp-block-cgb-accordion style-${style}`,
        style: {
            '--accordion-title-color': titleColor,
            '--accordion-bg-color': backgroundColor,
            '--accordion-border-color': borderColor,
        },
    });

    // Generate unique ID for new items
    const generateId = () => {
        return 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    };

    // Add new accordion item
    const addAccordionItem = () => {
        const newItem = {
            id: generateId(),
            title: `Accordion Item ${accordionItems.length + 1}`,
            content: 'Add your content here...',
            isOpen: false,
        };
        setAttributes({
            accordionItems: [...accordionItems, newItem],
        });
    };

    // Remove accordion item
    const removeAccordionItem = (index) => {
        const newItems = accordionItems.filter((_, i) => i !== index);
        setAttributes({ accordionItems: newItems });
        
        // Reset active item if it was the removed one
        if (activeItem === index) {
            setActiveItem(null);
        } else if (activeItem > index) {
            setActiveItem(activeItem - 1);
        }
    };

    // Update accordion item
    const updateAccordionItem = (index, field, value) => {
        const newItems = [...accordionItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setAttributes({ accordionItems: newItems });
    };

    // Toggle accordion item in editor
    const toggleAccordionItem = (index) => {
        if (activeItem === index) {
            setActiveItem(null);
        } else {
            setActiveItem(index);
        }
    };

    // Handle drag and drop reordering
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(accordionItems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setAttributes({ accordionItems: items });
        
        // Update active item index after reordering
        if (activeItem === result.source.index) {
            setActiveItem(result.destination.index);
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Accordion Settings', 'custom-gutenberg-blocks')} initialOpen={true}>
                    <ToggleControl
                        label={__('Allow Multiple Open', 'custom-gutenberg-blocks')}
                        help={__('Allow multiple accordion items to be open at the same time', 'custom-gutenberg-blocks')}
                        checked={allowMultiple}
                        onChange={(value) => setAttributes({ allowMultiple: value })}
                    />
                    
                    <SelectControl
                        label={__('Style', 'custom-gutenberg-blocks')}
                        value={style}
                        options={[
                            { label: __('Default', 'custom-gutenberg-blocks'), value: 'default' },
                            { label: __('Bordered', 'custom-gutenberg-blocks'), value: 'bordered' },
                            { label: __('Minimal', 'custom-gutenberg-blocks'), value: 'minimal' },
                        ]}
                        onChange={(value) => setAttributes({ style: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Color Settings', 'custom-gutenberg-blocks')} initialOpen={false}>
                    <BaseControl label={__('Title Color', 'custom-gutenberg-blocks')}>
                        <ColorPicker
                            color={titleColor}
                            onChange={(value) => setAttributes({ titleColor: value })}
                        />
                    </BaseControl>
                    
                    <BaseControl label={__('Background Color', 'custom-gutenberg-blocks')}>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                    </BaseControl>
                    
                    <BaseControl label={__('Border Color', 'custom-gutenberg-blocks')}>
                        <ColorPicker
                            color={borderColor}
                            onChange={(value) => setAttributes({ borderColor: value })}
                        />
                    </BaseControl>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="accordion-items">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="accordion-container"
                            >
                                {accordionItems.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`accordion-item ${
                                                    activeItem === index ? 'is-open' : ''
                                                } ${snapshot.isDragging ? 'is-dragging' : ''}`}
                                            >
                                                <div className="accordion-header">
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="accordion-drag-handle"
                                                        title={__('Drag to reorder', 'custom-gutenberg-blocks')}
                                                    >
                                                        ⋮⋮
                                                    </div>
                                                    
                                                    <RichText
                                                        tagName="div"
                                                        className="accordion-title"
                                                        value={item.title}
                                                        onChange={(value) => updateAccordionItem(index, 'title', value)}
                                                        placeholder={__('Accordion title...', 'custom-gutenberg-blocks')}
                                                        allowedFormats={['core/bold', 'core/italic']}
                                                    />
                                                    
                                                    <div className="accordion-controls">
                                                        <Button
                                                            icon={activeItem === index ? 'arrow-up-alt2' : 'arrow-down-alt2'}
                                                            onClick={() => toggleAccordionItem(index)}
                                                            title={activeItem === index ? __('Collapse', 'custom-gutenberg-blocks') : __('Expand', 'custom-gutenberg-blocks')}
                                                            className="accordion-toggle"
                                                        />
                                                        
                                                        <Button
                                                            icon="trash"
                                                            onClick={() => removeAccordionItem(index)}
                                                            title={__('Remove item', 'custom-gutenberg-blocks')}
                                                            className="accordion-remove"
                                                            isDestructive
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {activeItem === index && (
                                                    <div className="accordion-content">
                                                        <RichText
                                                            tagName="div"
                                                            value={item.content}
                                                            onChange={(value) => updateAccordionItem(index, 'content', value)}
                                                            placeholder={__('Add accordion content...', 'custom-gutenberg-blocks')}
                                                            allowedFormats={[
                                                                'core/bold',
                                                                'core/italic',
                                                                'core/link',
                                                                'core/strikethrough',
                                                                'core/underline'
                                                            ]}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                
                <div className="accordion-add-item">
                    <Button
                        variant="secondary"
                        onClick={addAccordionItem}
                        icon="plus-alt"
                    >
                        {__('Add Accordion Item', 'custom-gutenberg-blocks')}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Edit;