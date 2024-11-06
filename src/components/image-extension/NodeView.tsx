/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef, useState } from 'react'
import { Resizable } from 're-resizable'
import { Rnd } from 'react-rnd'

interface ImageProps extends NodeViewProps {
  node: any
  updateAttributes: (attrs: Record<string, any>) => void
}

export const AlignLeftIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 3h18v2H3zm0 8h12v2H3zm0 8h18v2H3z"/>
  </svg>
);

export const AlignCenterIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 3h18v2H3zm3 8h12v2H6zm-3 8h18v2H3z"/>
  </svg>
);

export const AlignRightIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 3h18v2H3zm6 8h12v2H9zm-6 8h18v2H3z"/>
  </svg>
);

export const FloatIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M13 9h8v2h-8zm0 4h8v2h-8zm0 4h8v2h-8zM3 9h8v8H3z"/>
  </svg>
);

export const LockIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
  </svg>
);

export const NodeView: React.FC<ImageProps> = ({ 
  node,
  updateAttributes,
}) => {
  const [selected, setSelected] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLElement | null>(null);

  const handleResize = (_: any, __: any, ref: HTMLElement) => {
    updateAttributes({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height)
    })
  }

  const handleDrag = (_: any, data: { x: number; y: number }) => {
    updateAttributes({ 
      left: data.x,
      top: data.y 
    })
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelected(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    editorRef.current = document.querySelector('.ProseMirror');
  }, []);

  const Component = node.attrs.float ? Rnd : Resizable
  const componentProps = node.attrs.float ? {
    position: { x: node.attrs.left, y: node.attrs.top },
    onDragStop: handleDrag,
    enableResizing: true,
    onResize: handleResize,
    maxWidth: '100%',
    bounds: editorRef.current === null ? undefined : editorRef.current,
  } : {
    size: { 
      width: node.attrs.width || 'auto',
      height: node.attrs.height || 'auto'
    },
    onResizeStop: handleResize,
    lockAspectRatio: true,
    minWidth: 100,
    minHeight: 100,
    maxWidth: '100%',
    style: {
      margin: node.attrs.align === 'left' ? '0 auto 0 0' :
             node.attrs.align === 'right' ? '0 0 0 auto' :
             '0 auto'
    }
  }

  const renderControls = () => {
    if (!selected) return null;
    
    return (
      <div className="image-controls">
        <button 
          className={`align-btn ${node.attrs.align === 'left' ? 'active' : ''}`}
          onClick={() => updateAttributes({ align: 'left' })}
        >
          <AlignLeftIcon />
        </button>
        <button 
          className={`align-btn ${node.attrs.align === 'center' ? 'active' : ''}`}
          onClick={() => updateAttributes({ align: 'center' })}
        >
          <AlignCenterIcon />
        </button>
        <button 
          className={`align-btn ${node.attrs.align === 'right' ? 'active' : ''}`}
          onClick={() => updateAttributes({ align: 'right' })}
        >
          <AlignRightIcon />
        </button>
        <button 
          className="float-btn"
          onClick={() => {
            const newFloat = !node.attrs.float;
            updateAttributes({ 
              float: newFloat,
              left: newFloat ? 0 : undefined,
              top: newFloat ? 0 : undefined
            })
          }}
        >
          {node.attrs.float ? <LockIcon /> : <FloatIcon />}
        </button>
      </div>
    );
  };

  return (
    <NodeViewWrapper 
      ref={containerRef}
      className={`image-node ${selected ? 'selected' : ''}`}
      style={{
        display: 'block',
        position: 'relative',
        cursor: 'default',
      }}
      onClick={() => setSelected(true)}
    >
      {renderControls()}
      {!node.attrs.float && (
        <div 
          className="drag-handle"
          data-drag-handle
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            cursor: 'move',
            zIndex: 1,
          }}
        />
      )}
      <Component {...componentProps}>
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          title={node.attrs.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          draggable={false}
        />
      </Component>
    </NodeViewWrapper>
  )
} 