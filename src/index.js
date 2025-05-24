/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies - Dynamically import all blocks
 */
const requireBlock = require.context('../blocks', true, /block\.json$/);

requireBlock.keys().forEach((blockJsonPath) => {
    const metadata = requireBlock(blockJsonPath);

    // Derive block directory path
    const blockDir = blockJsonPath.replace('./', '').replace('/block.json', '');
    
    // Dynamically import the edit component
    const edit = require(`../blocks/${blockDir}/edit`).default;

    registerBlockType(metadata.name, {
        ...metadata,
        edit,
        save: () => null, // Assume server-side rendering
    });
});
