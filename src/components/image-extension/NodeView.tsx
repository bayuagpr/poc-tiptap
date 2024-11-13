/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";
import { Resizable } from "re-resizable";
import { Rnd } from "react-rnd";
import { Box, IconButton, Image, Flex } from "@chakra-ui/react";

interface ImageProps extends NodeViewProps {
  node: any;
  updateAttributes: (attrs: Record<string, any>) => void;
}

export const AlignLeftIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 3h18v2H3zm0 8h12v2H3zm0 8h18v2H3z" />
  </svg>
);

export const AlignCenterIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 3h18v2H3zm3 8h12v2H6zm-3 8h18v2H3z" />
  </svg>
);

export const AlignRightIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 3h18v2H3zm6 8h12v2H9zm-6 8h18v2H3z" />
  </svg>
);

export const FloatIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M13 9h8v2h-8zm0 4h8v2h-8zm0 4h8v2h-8zM3 9h8v8H3z" />
  </svg>
);

export const LockIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
  </svg>
);

export const NodeView: React.FC<ImageProps> = ({ node, updateAttributes }) => {
  const [selected, setSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const editorRef = useRef<HTMLElement | null>(null);

  const handleResize = (_: any, __: any, ref: HTMLElement) => {
    updateAttributes({
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
  };

  const handleDrag = (_: any, data: { x: number; y: number }) => {
    updateAttributes({
      left: data.x,
      top: data.y,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    editorRef.current = document.querySelector(".ProseMirror");
  }, []);

  useEffect(() => {
    if (node.attrs.float && node.attrs.translateY) {
      setTimeout(() => {
        const element = imageRef.current;
        if (element) {
           // Simulate mousedown, mousemove, and mouseup events
           const mouseDown = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            clientX: 0,
            clientY: 0
          });
          
          const mouseMove = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            clientX: 0,
            clientY: 0
          });
          
          const mouseUp = new MouseEvent('mouseup', {
            bubbles: true,
            cancelable: true,
            clientX: 0,
            clientY: 0
          });

          element.dispatchEvent(mouseDown);
          element.dispatchEvent(mouseMove);
          element.dispatchEvent(mouseUp);
        }
      }, 0);
    }
  }, [node.attrs.float, node.attrs.translateY]);

  const Component = node.attrs.float ? Rnd : Resizable;
  const componentProps = node.attrs.float
    ? {
        position: { x: node.attrs.left, y: node.attrs.top },
        onDragStop: handleDrag,
        enableResizing: true,
        onResize: handleResize,
        maxWidth: "100%",
        bounds: editorRef.current === null ? undefined : editorRef.current,
        size: {
          width: node.attrs.width || "auto",
          height: "auto",
        },
        style: {
          zIndex: 10,
        },
      }
    : {
        size: {
          width: node.attrs.width || "auto",
          height: "auto",
        },
        onResizeStop: handleResize,
        lockAspectRatio: true,
        maxWidth: "100%",
        style: {
          margin:
            node.attrs.align === "left"
              ? "0 auto 0 0"
              : node.attrs.align === "right"
              ? "0 0 0 auto"
              : "0 auto",
        },
      };

  const renderControls = () => {
    if (!selected) return null;

    return (
      <Flex className="image-controls" gap={1}>
        <IconButton
          aria-label="Align left"
          icon={<AlignLeftIcon />}
          size="sm"
          colorScheme="gray"
          variant={node.attrs.align === "left" ? "solid" : "ghost"}
          onClick={() => updateAttributes({ align: "left" })}
        />
        <IconButton
          aria-label="Align center"
          icon={<AlignCenterIcon />}
          size="sm"
          colorScheme="gray"
          variant={node.attrs.align === "center" ? "solid" : "ghost"}
          onClick={() => updateAttributes({ align: "center" })}
        />
        <IconButton
          aria-label="Align right"
          icon={<AlignRightIcon />}
          size="sm"
          colorScheme="gray"
          variant={node.attrs.align === "right" ? "solid" : "ghost"}
          onClick={() => updateAttributes({ align: "right" })}
        />
        <IconButton
          aria-label="Toggle float"
          icon={node.attrs.float ? <LockIcon /> : <FloatIcon />}
          size="sm"
          colorScheme="gray"
          variant={node.attrs.float ? "solid" : "ghost"}
          onClick={() => {
            const newFloat = !node.attrs.float;
            updateAttributes({
              float: newFloat,
              left: newFloat ? 0 : undefined,
              top: newFloat ? 0 : undefined,
            });
            if (newFloat) {
              setTimeout(() => {
                const element = containerRef.current?.querySelector(".react-draggable");
                const style = element?.getAttribute("style");
                const transform = style?.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
                if (transform) {
                  const translateX = parseInt(transform[1]);
                  const translateY = parseInt(transform[2]); 
                  updateAttributes({
                    translateX,
                    translateY,
                  });
                }
              }, 100);
            }
          }}
        />
      </Flex>
    );
  };

  return (
    <NodeViewWrapper
      ref={containerRef}
      className={`image-node ${selected ? "selected" : ""}`}
      onClick={() => setSelected(true)}
    >
      <Box position="relative">
        {renderControls()}
        {!node.attrs.float && (
          <Box
            className="drag-handle"
            data-drag-handle
            position="absolute"
            top={0}
            left={0}
            right={0}
            height={
              containerRef.current?.querySelector("img")?.clientHeight +
                "px" || "100px"
            }
            cursor="move"
            zIndex={1}
          />
        )}
      </Box>

      <Component {...componentProps}>
        <Image
          ref={imageRef}
          src={node.attrs.src}
          alt={node.attrs.alt}
          title={node.attrs.title}
          w="100%"
          h="100%"
          objectFit="contain"
          draggable={false}
        />
      </Component>
    </NodeViewWrapper>
  );
};
