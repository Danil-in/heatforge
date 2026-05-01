import { useRef } from 'react';
import { useEmberCanvas } from '@/hooks/useEmberCanvas';

export default function EmberMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEmberCanvas(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  );
}
