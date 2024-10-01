"use client";

import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

type PredictionType = {
  prediction: number | null;
  confidence: number | null;
  explanations: string[];
};

export type { PredictionType };

export function Canvas({
  onSubmit,
  onClear,
}: {
  onSubmit: (formData: FormData) => Promise<void>;
  onClear: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Prevent scrolling on touch devices
  const isTouchDevice = useMediaQuery({ query: "(pointer: coarse)" });
  if (isTouchDevice) {
    document.body.style.overflow = isDrawing ? "hidden" : "auto";
  }

  const paintAt = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    x = Math.floor(x / 10) * 10;
    y = Math.floor(y / 10) * 10;

    if (x < 0 || y < 0 || x >= 280 || y >= 280) {
      return;
    }

    const thickness = 2;

    ctx.fillStyle = "black";
    for (let i = 0; i < thickness; i++) {
      for (let j = 0; j < thickness; j++) {
        ctx.fillRect(x + i * 10, y + j * 10, 10, 10);
      }
    }
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setIsDrawing(true);
        const { offsetX, offsetY } = event.nativeEvent;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        ctx.lineWidth = 20;

        paintAt(ctx, offsetX, offsetY);
      }
    }
  };

  const startDrawingTouch = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setIsDrawing(true);
        const { clientX, clientY } = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        ctx.lineWidth = 20;

        paintAt(ctx, offsetX, offsetY);
      }
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { offsetX, offsetY } = event.nativeEvent;

        paintAt(ctx, offsetX, offsetY);
      }
    }
  };

  const drawTouch = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { clientX, clientY } = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        paintAt(ctx, offsetX, offsetY);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      onClear();
    }
  };

  const submitCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const file = new File([blob], "canvas-image.png", { type: blob.type });

        const formData = new FormData();
        formData.append("file", file);
        onSubmit(formData);
      }, "image/png"); // You can specify the image type and quality here
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 place-items-center">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawingTouch}
        onTouchMove={drawTouch}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        width={280}
        height={280}
        className="border border-solid border-black dark:invert col-span-2 md:col-span-4"
      />

      <button
        className="mt-4 mr-6 md:col-start-2 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-30"
        onClick={submitCanvas}
      >
        Submit{" "}
      </button>
      <button
        className="mt-4 ml-6 md:col-start-3 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-30"
        onClick={clearCanvas}
      >
        Clear
      </button>
    </div>
  );
}
