# Custom Gutenberg Blocks

A WordPress plugin that provides custom Gutenberg blocks for enhanced content creation.

## Features

- **Hero Section Block**: A customizable hero section with title, subtitle, call-to-action button, and background options
- Modern, responsive design
- Easy-to-use interface in the WordPress block editor
- Customizable colors, alignments, and heights
- Background image support

## Installation

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The custom blocks will appear in the Gutenberg block editor

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WordPress development environment

### Setup

1. Clone or download the plugin
2. Navigate to the plugin directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Build Process

- **Development build with watch mode:**
  ```bash
  npm run dev
  ```

- **Production build:**
  ```bash
  npm run build
  ```

### File Structure

```
custom-gutenberg-blocks/
├── blocks/
│   └── hero-section/
│       ├── block.js          # Block registration
│       ├── edit.js           # Block editor component
│       ├── style.css         # Block styles
│       ├── block.json        # Block configuration
│       └── hero-section.php  # Server-side rendering
├── build/                    # Compiled output
├── package.json             # Dependencies and scripts
├── webpack.config.js        # Build configuration
└── custom-gutenberg-blocks.php # Main plugin file
```

## Block Features

### Hero Section Block

The Hero Section block includes:

- **Content Settings:**
  - Title text
  - Subtitle text
  - Button text and URL

- **Layout Settings:**
  - Text alignment (left, center, right)
  - Height options (small, medium, large, full screen)

- **Background Settings:**
  - Background image upload
  - Background color picker

- **Styling Options:**
  - Text color customization
  - Responsive design
  - Hover effects

## Adding New Blocks

To add a new custom block:

1. Create a new folder in the `blocks/` directory
2. Add the required files (block.js, edit.js, style.css, block.json, [blockname].php)
3. Register the new block in the main plugin file
4. Update the webpack configuration if needed
5. Build the project

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This plugin is licensed under the GPL v2 or later.

## Changelog

### 1.0.0
- Initial release
- Hero Section block
- Basic plugin structure