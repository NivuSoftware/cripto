import type { MouseEvent as ReactMouseEvent } from 'react';
import { GripVertical, MoveHorizontal, Trash2 } from 'lucide-react';
import {
  NodeViewWrapper,
  type NodeViewProps,
} from '@tiptap/react';

type ImageAlign = 'left' | 'center' | 'right';

function getWrapperClassName(align: ImageAlign, selected: boolean) {
  const selectionClass = selected
    ? 'ring-2 ring-[#f7931a] shadow-[0_0_30px_rgba(247,147,26,0.18)]'
    : 'ring-1 ring-white/10';

  const alignmentClass =
    align === 'left'
      ? 'float-left mr-5 mt-2 mb-4'
      : align === 'right'
        ? 'float-right ml-5 mt-2 mb-4'
        : 'mx-auto my-4';

  return `group/image relative block rounded-2xl bg-black/70 ${selectionClass} ${alignmentClass}`;
}

export function FlexibleImageNodeView({
  node,
  selected,
  updateAttributes,
  deleteNode,
  editor,
}: NodeViewProps) {
  const width = typeof node.attrs.width === 'string' ? node.attrs.width : '100%';
  const align = (node.attrs.align || 'center') as ImageAlign;
  const editable = editor.isEditable;

  const handleResizeStart = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const wrapper = (event.currentTarget.closest('[data-flexible-image-wrapper]') as HTMLDivElement | null);
    const editorRoot = wrapper?.closest('.ProseMirror') as HTMLElement | null;

    if (!wrapper || !editorRoot) {
      return;
    }

    const initialX = event.clientX;
    const editorWidth = editorRoot.getBoundingClientRect().width || 1;
    const initialWidth = Number.parseFloat(String(width).replace('%', '')) || 100;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const deltaPercent = (deltaX / editorWidth) * 100;
      const nextWidth = Math.min(100, Math.max(20, initialWidth + deltaPercent));
      updateAttributes({ width: `${Math.round(nextWidth)}%` });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <NodeViewWrapper
      data-flexible-image-wrapper
      style={{ width }}
      className={getWrapperClassName(align, selected)}
    >
      {editable && (
        <div className="absolute left-2 top-2 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-2 py-1 text-[11px] text-white backdrop-blur-md">
          <button
            type="button"
            data-drag-handle
            className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-gray-200 hover:bg-white/10"
            title="Arrastra para mover la imagen"
          >
            <GripVertical className="h-3.5 w-3.5" />
            Mover
          </button>
          <span className="text-gray-400">{width}</span>
        </div>
      )}

      <img
        src={node.attrs.src}
        alt={node.attrs.alt ?? ''}
        title={node.attrs.title ?? ''}
        draggable={false}
        className="block w-full rounded-2xl object-cover"
      />

      {editable && selected && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3">
            <div className="rounded-full border border-[#f7931a]/30 bg-black/80 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#f7b45f] backdrop-blur-md">
              Arrastra la esquina para cambiar tamano
            </div>
          </div>

          <button
            type="button"
            onMouseDown={handleResizeStart}
            className="absolute bottom-2 right-2 z-20 inline-flex h-9 w-9 cursor-ew-resize items-center justify-center rounded-full border border-[#f7931a]/30 bg-black/85 text-[#f7b45f] shadow-lg hover:bg-black"
            title="Arrastra para redimensionar"
          >
            <MoveHorizontal className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => deleteNode()}
            className="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10 text-red-200 hover:border-red-400"
            title="Eliminar imagen"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </>
      )}
    </NodeViewWrapper>
  );
}
