import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { FlexibleImageNodeView } from '../FlexibleImageNodeView';

type ImageAlign = 'left' | 'center' | 'right';

function buildImageStyle(width: string, align: ImageAlign) {
  const styles = [`width:${width}`, 'height:auto', 'max-width:100%'];

  if (align === 'left') {
    styles.push('float:left', 'margin:0.35rem 1.25rem 1rem 0');
  } else if (align === 'right') {
    styles.push('float:right', 'margin:0.35rem 0 1rem 1.25rem');
  } else {
    styles.push('display:block', 'margin:1rem auto');
  }

  return styles.join('; ');
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setFlexibleImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string;
        align?: ImageAlign;
      }) => ReturnType;
      updateFlexibleImage: (options: { width?: string; align?: ImageAlign }) => ReturnType;
    };
  }
}

export const FlexibleImage = Image.extend({
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('data-width') || element.style.width || '100%',
        renderHTML: (attributes) => ({
          'data-width': attributes.width,
        }),
      },
      align: {
        default: 'center',
        parseHTML: (element) => element.getAttribute('data-align') || 'center',
        renderHTML: (attributes) => ({
          'data-align': attributes.align,
        }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const width = String(HTMLAttributes.width || '100%');
    const align = (String(HTMLAttributes.align || 'center') as ImageAlign);
    const rest = { ...HTMLAttributes };
    delete rest.width;
    delete rest.align;

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, rest, {
        style: buildImageStyle(width, align),
        'data-width': width,
        'data-align': align,
      }),
    ];
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFlexibleImage:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              width: '100%',
              align: 'center',
              ...options,
            },
          }),
      updateFlexibleImage:
        (options) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, options),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(FlexibleImageNodeView);
  },
});
