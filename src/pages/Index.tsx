
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CPUDisplay from "@/components/CPUDisplay";
import MemoryMap from "@/components/MemoryMap";
import DisplayEmulator from "@/components/DisplayEmulator";
import ROMLoader from "@/components/ROMLoader";
import { Play, Pause, RotateCcw, Cpu, HardDrive, Monitor } from "lucide-react";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [romLoaded, setRomLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            GBA Emulator
          </h1>
          <p className="text-xl text-slate-300">
            Python-based Game Boy Advance Emulator MVP
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              ARM7TDMI CPU
            </Badge>
            <Badge variant="outline" className="border-purple-400 text-purple-400">
              Mode 3 Display
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-400">
              Python MVP
            </Badge>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Emulator Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                disabled={!romLoaded}
                className={`${
                  isRunning 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } transition-all duration-200`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Interface */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="cpu" className="data-[state=active]:bg-slate-700">
              <Cpu className="w-4 h-4 mr-2" />
              CPU
            </TabsTrigger>
            <TabsTrigger value="memory" className="data-[state=active]:bg-slate-700">
              <HardDrive className="w-4 h-4 mr-2" />
              Memory
            </TabsTrigger>
            <TabsTrigger value="display" className="data-[state=active]:bg-slate-700">
              <Monitor className="w-4 h-4 mr-2" />
              Display
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ROMLoader onRomLoaded={setRomLoaded} />
              <DisplayEmulator isRunning={isRunning} />
            </div>
          </TabsContent>

          <TabsContent value="cpu">
            <CPUDisplay isRunning={isRunning} />
          </TabsContent>

          <TabsContent value="memory">
            <MemoryMap />
          </TabsContent>

          <TabsContent value="display">
            <DisplayEmulator isRunning={isRunning} fullSize />
          </TabsContent>
        </Tabs>

        {/* Architecture Overview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle>MVP Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-cyan-400">ROM Loader</h3>
                <p className="text-sm text-slate-400">Load .gba files into memory</p>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-purple-400">CPU Emulation</h3>
                <p className="text-sm text-slate-400">ARM7TDMI processor</p>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 bg-green-500/20 rounded-full flex items-center justify-center">
                  <HardDrive className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-green-400">Memory Map</h3>
                <p className="text-sm text-slate-400">GBA memory regions</p>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-yellow-400">Display</h3>
                <p className="text-sm text-slate-400">Mode 3 bitmap</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
