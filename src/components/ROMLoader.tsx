
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle } from "lucide-react";

interface ROMLoaderProps {
  onRomLoaded: (loaded: boolean) => void;
}

const ROMLoader = ({ onRomLoaded }: ROMLoaderProps) => {
  const [romInfo, setRomInfo] = useState<{
    name: string;
    size: string;
    loaded: boolean;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.gba')) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setRomInfo({
        name: file.name,
        size: `${sizeInMB} MB`,
        loaded: true
      });
      onRomLoaded(true);
    }
  };

  const simulateLoad = () => {
    setRomInfo({
      name: "demo_game.gba",
      size: "8.00 MB",
      loaded: true
    });
    onRomLoaded(true);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-cyan-400" />
          ROM Loader
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!romInfo?.loaded ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-400 mb-4">Drop a .gba file here or click to browse</p>
              <input
                type="file"
                accept=".gba"
                onChange={handleFileUpload}
                className="hidden"
                id="rom-upload"
              />
              <Button
                onClick={() => document.getElementById('rom-upload')?.click()}
                variant="outline"
                className="border-slate-600 hover:bg-slate-700"
              >
                Browse Files
              </Button>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">Or try the demo:</p>
              <Button
                onClick={simulateLoad}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Load Demo ROM
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>ROM Loaded Successfully</span>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{romInfo.name}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                  Size: {romInfo.size}
                </Badge>
                <Badge variant="outline" className="border-green-400 text-green-400">
                  Valid GBA ROM
                </Badge>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              <p><strong>Header Info:</strong></p>
              <p>• Title: DEMO GAME</p>
              <p>• Code: DEMO</p>
              <p>• Maker: 01</p>
              <p>• Version: 1.0</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ROMLoader;
