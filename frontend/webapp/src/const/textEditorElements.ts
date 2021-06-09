interface StyleConfig {
  label: string;
  style: string;
  className?: string;
}

type StyleConfigList = StyleConfig[];

type GroupName =
  | 'INLINE_STYLE_BUTTONS'
  | 'BLOCK_TYPE_BUTTONS'
  | 'LINK_BUTTONS'
  | 'BLOCK_TYPE_DROPDOWN'
  | 'HISTORY_BUTTONS'
  | 'IMAGE_BUTTON';

export interface ToolbarConfig {
  display: GroupName[];
  extraProps?: object;
  INLINE_STYLE_BUTTONS: StyleConfigList;
  BLOCK_TYPE_DROPDOWN: StyleConfigList;
  BLOCK_TYPE_BUTTONS: StyleConfigList;
}

// GÓRA DO WYJEBANIA WRAZ Z TYM EDYTOREM

export const toolbarConfig: ToolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed). IMAGE_BUTTON
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Strikethrough', style: 'STRIKETHROUGH' },
    { label: 'Monospace', style: 'CODE', className: 'code-editor' },
  ],

  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'text-ediotr' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' },
  ],

  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Blockquote', style: 'blockquote' },
  ],
};
