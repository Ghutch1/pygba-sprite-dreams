
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HardDrive, Database, Zap } from "lucide-react";

const MemoryMap = () => {
  const memoryRegions = [
    {
      name: "BIOS",
      start: "0x00000000",
      end: "0x00003FFF",
      size: "16 KB",
      usage: 0,
      color: "text-red-400",
      description: "System BIOS (read-only)"
    },
    {
      name: "EWRAM",
      start: "0x02000000",
      end: "0x0203FFFF",
      size: "256 KB",
      usage: 15,
      color: "text-green-400",
      description: "External work RAM"
    },
    {
      name: "IWRAM",
      start: "0x03000000",
      end: "0x03007FFF",
      size: "32 KB",
      usage: 45,
      color: "text-blue-400",
      description: "Internal work RAM (fast)"
    },
    {
      name: "I/O Registers",
      start: "0x04000000",
      end: "0x040003FE",
      size: "1 KB",
      usage: 25,
      color: "text-yellow-400",
      description: "Hardware control registers"
    },
    {
      name: "Palette RAM",
      start: "0x05000000",
      end: "0x050003FF",
      size: "1 KB",
      usage: 80,
      color: "text-purple-400",
      description: "Color palette memory"
    },
    {
      name: "VRAM",
      start: "0x06000000",
      end: "0x06017FFF",
      size: "96 KB",
      usage: 60,
      color: "text-cyan-400",
      description: "Video RAM (display data)"
    },
    {
      name: "Game ROM",
      start: "0x08000000",
      end: "0x09FFFFFF",
      size: "32 MB",
      usage: 35,
      color: "text-orange-400",
      description: "Cartridge ROM space"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-green-400" />
            GBA Memory Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {memoryRegions.map((region, index) => (
              <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${region.color}`}>{region.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {region.size}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{region.description}</p>
                    <div className="font-mono text-xs text-slate-500">
                      {region.start} - {region.end}
                    </div>
                  </div>
                  <div className="w-full md:w-32">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Usage</span>
                      <span>{region.usage}%</span>
                    </div>
                    <Progress value={region.usage} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Database className="w-4 h-4 text-cyan-400" />
              Memory Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total RAM:</span>
              <span>288 KB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Used:</span>
              <span className="text-green-400">156 KB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Free:</span>
              <span>132 KB</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-yellow-400" />
              Access Speed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">IWRAM:</span>
              <span className="text-green-400">1 cycle</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">EWRAM:</span>
              <span className="text-yellow-400">3 cycles</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">ROM:</span>
              <span className="text-red-400">4-8 cycles</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm">MVP Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Basic read/write logic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>ROM loading support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Stubbed BIOS calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Minimal I/O registers</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemoryMap;
