
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Palette, Zap } from "lucide-react";

interface DisplayEmulatorProps {
  isRunning: boolean;
  fullSize?: boolean;
}

const DisplayEmulator = ({ isRunning, fullSize = false }: DisplayEmulatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameCount, setFrameCount] = useState(0);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas for GBA resolution (240x160)
    canvas.width = 240;
    canvas.height = 160;

    const drawFrame = () => {
      if (!isRunning) return;

      // Create a simple animated pattern for demo
      const imageData = ctx.createImageData(240, 160);
      const data = imageData.data;

      for (let y = 0; y < 160; y++) {
        for (let x = 0; x < 240; x++) {
          const index = (y * 240 + x) * 4;
          
          // Create a moving gradient pattern
          const time = frameCount * 0.1;
          const r = Math.sin(x * 0.02 + time) * 127 + 128;
          const g = Math.sin(y * 0.02 + time + 2) * 127 + 128;
          const b = Math.sin((x + y) * 0.01 + time + 4) * 127 + 128;
          
          data[index] = r;     // Red
          data[index + 1] = g; // Green
          data[index + 2] = b; // Blue
          data[index + 3] = 255; // Alpha
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setFrameCount(prev => prev + 1);
    };

    const interval = setInterval(drawFrame, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, [isRunning, frameCount]);

  useEffect(() => {
    if (isRunning) {
      const fpsInterval = setInterval(() => {
        setFps(Math.floor(Math.random() * 5) + 58); // Simulate FPS variation
      }, 1000);
      return () => clearInterval(fpsInterval);
    }
  }, [isRunning]);

  const displaySize = fullSize ? "w-full max-w-2xl" : "w-full max-w-md";

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-yellow-400" />
          Display Output
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="border-yellow-400 text-yellow-400">
            Mode 3 (Bitmap)
          </Badge>
          <Badge variant="outline" className="border-cyan-400 text-cyan-400">
            240x160
          </Badge>
          <Badge variant="outline" className={`${isRunning ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'}`}>
            {fps} FPS
          </Badge>
        </div>

        <div className={`mx-auto bg-black p-4 rounded-lg ${displaySize}`}>
          <canvas
            ref={canvasRef}
            className="w-full h-auto border border-slate-600 rounded"
            style={{
              imageRendering: 'pixelated',
              aspectRatio: '240/160'
            }}
          />
        </div>

        {!isRunning && (
          <div className="text-center text-slate-400">
            <Monitor className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Display inactive - Load a ROM and start emulation</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold">Resolution</span>
            </div>
            <div className="text-slate-400">240×160 pixels</div>
            <div className="text-slate-400">15-bit color</div>
          </div>
          
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="w-4 h-4 text-purple-400" />
              <span className="font-semibold">Colors</span>
            </div>
            <div className="text-slate-400">32,768 colors</div>
            <div className="text-slate-400">BGR555 format</div>
          </div>
          
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="font-semibold">Refresh</span>
            </div>
            <div className="text-slate-400">59.73 Hz</div>
            <div className="text-slate-400">VBlank sync</div>
          </div>
        </div>

        {fullSize && (
          <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
            <h4 className="font-semibold mb-2">Mode 3 Implementation Notes</h4>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Direct framebuffer access at 0x06000000</li>
              <li>• 16-bit pixels in BGR555 format</li>
              <li>• No sprites or background layers</li>
              <li>• Simple bitmap rendering for MVP</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DisplayEmulator;
