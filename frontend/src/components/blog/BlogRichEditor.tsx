import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Underline as UnderlineIcon,
} from 'lucide-react';
import { FlexibleImage } from './extensions/FlexibleImage';

interface BlogRichEditorProps {
  content: Record<string, unknown>;
  editable?: boolean;
  placeholder?: string;
  onChange?: (content: Record<string, unknown>) => void;
  onUploadImage?: (file: File) => Promise<{ url: string }>;
}

export function BlogRichEditor({
  content,
  editable = true,
  placeholder = 'Escribe aqui tu historia...',
  onChange,
  onUploadImage,
}: BlogRichEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<{
    width: string;
    align: 'left' | 'center' | 'right';
  } | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editable,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: !editable,
        autolink: true,
      }),
      FlexibleImage.configure({
        inline: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content as JSONContent,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none min-h-[340px] focus:outline-none prose-headings:text-white prose-p:text-gray-200 prose-strong:text-white prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-li:pl-1 prose-li:text-gray-200 prose-li:marker:text-[#f7931a] prose-blockquote:border-[#f7931a]/35 prose-blockquote:text-gray-300 prose-a:text-[#f7b45f] prose-img:rounded-2xl prose-img:shadow-[0_0_20px_rgba(247,147,26,0.18)]',
      },
    },
    onUpdate({ editor: currentEditor }) {
      onChange?.((currentEditor.getJSON() as Record<string, unknown>) ?? { type: 'doc', content: [] });
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const syncSelectedImage = () => {
      if (!editor.isActive('image')) {
        setSelectedImage(null);
        return;
      }

      const attributes = editor.getAttributes('image');
      setSelectedImage({
        width: String(attributes.width || '100%'),
        align: (attributes.align || 'center') as 'left' | 'center' | 'right',
      });
    };

    syncSelectedImage();
    editor.on('selectionUpdate', syncSelectedImage);
    editor.on('transaction', syncSelectedImage);

    return () => {
      editor.off('selectionUpdate', syncSelectedImage);
      editor.off('transaction', syncSelectedImage);
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const current = JSON.stringify(editor.getJSON());
    const next = JSON.stringify(content);

    if (current !== next) {
      editor.commands.setContent(content as JSONContent, false);
    }
  }, [content, editor]);

  const promptForLink = () => {
    if (!editor || !editable) {
      return;
    }

    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Ingresa la URL del enlace', previousUrl ?? 'https://');

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  const handlePickImage = () => {
    imageInputRef.current?.click();
  };

  const handleImageFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !editor || !onUploadImage) {
      return;
    }

    try {
      const uploadedImage = await onUploadImage(file);
      editor
        .chain()
        .focus()
        .setFlexibleImage({ src: uploadedImage.url, alt: file.name, width: '100%', align: 'center' })
        .run();
    } finally {
      event.target.value = '';
    }
  };

  const updateSelectedImage = (attributes: { width?: string; align?: 'left' | 'center' | 'right' }) => {
    if (!editor || !selectedImage) {
      return;
    }

    editor.chain().focus().updateFlexibleImage(attributes).run();
  };

  return (
    <div className="rounded-[24px] border border-[#f7931a]/15 bg-[#090909]/90">
      {editable && editor && (
        <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            label="Negrita"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            label="Italica"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            label="Subrayado"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            label="Titulo 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            label="Titulo 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={editor.isActive('paragraph')}
            label="Parrafo"
          >
            <Pilcrow className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            label="Lista"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            label="Lista numerada"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            label="Cita"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            label="Alinear izquierda"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            label="Centrar"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            label="Alinear derecha"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            label="Justificar"
          >
            <AlignJustify className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={promptForLink} active={editor.isActive('link')} label="Enlace">
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={handlePickImage} label="Imagen">
            <ImagePlus className="h-4 w-4" />
          </ToolbarButton>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              void handleImageFileChange(event);
            }}
          />
        </div>
      )}

      {editable && selectedImage && (
        <div className="border-b border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="mb-3 flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.28em] text-[#f7931a]">Imagen seleccionada</p>
            <p className="text-sm text-gray-300">
              Arrastra la imagen para reubicarla en el post o tira de la esquina inferior derecha para cambiar su tamano.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Ancho: {selectedImage.width}
              </span>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={Number.parseInt(selectedImage.width.replace('%', ''), 10) || 100}
                onChange={(event) => updateSelectedImage({ width: `${event.target.value}%` })}
                className="w-full accent-[#f7931a]"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <ToolbarButton
                onClick={() => updateSelectedImage({ align: 'left' })}
                active={selectedImage.align === 'left'}
                label="Alinear izquierda"
              >
                <AlignLeft className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => updateSelectedImage({ align: 'center' })}
                active={selectedImage.align === 'center'}
                label="Centrar imagen"
              >
                <AlignCenter className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => updateSelectedImage({ align: 'right' })}
                active={selectedImage.align === 'right'}
                label="Alinear derecha"
              >
                <AlignRight className="h-4 w-4" />
              </ToolbarButton>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 py-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  active = false,
  label,
  onClick,
  children,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition ${
        active
          ? 'border-[#f7931a] bg-[#f7931a]/15 text-[#f7b45f]'
          : 'border-white/10 bg-white/5 text-gray-300 hover:border-[#f7931a]/30 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}
