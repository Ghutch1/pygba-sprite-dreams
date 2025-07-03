
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Activity } from "lucide-react";

interface CPUDisplayProps {
  isRunning: boolean;
}

const CPUDisplay = ({ isRunning }: CPUDisplayProps) => {
  const [registers, setRegisters] = useState({
    R0: 0x00000000,
    R1: 0x00000001,
    R2: 0x00000002,
    R3: 0x00000003,
    R4: 0x00000004,
    R5: 0x00000005,
    R6: 0x00000006,
    R7: 0x00000007,
    R8: 0x00000008,
    R9: 0x00000009,
    R10: 0x0000000A,
    R11: 0x0000000B,
    R12: 0x0000000C,
    SP: 0x03007F00,
    LR: 0x08000000,
    PC: 0x08000000,
  });

  const [cpuState, setCpuState] = useState({
    mode: "ARM",
    cycles: 0,
    frequency: "16.78 MHz",
    instruction: "MOV R0, #0x00"
  });

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCpuState(prev => ({
          ...prev,
          cycles: prev.cycles + Math.floor(Math.random() * 10) + 1,
          instruction: getRandomInstruction()
        }));
        
        setRegisters(prev => ({
          ...prev,
          PC: prev.PC + 4,
          R0: prev.R0 + Math.floor(Math.random() * 16)
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const getRandomInstruction = () => {
    const instructions = [
      "MOV R0, #0x10",
      "ADD R1, R0, #4",
      "LDR R2, [R1]",
      "STR R3, [R2, #8]",
      "B 0x08000100",
      "SUB R4, R5, R6",
      "CMP R0, #0xFF"
    ];
    return instructions[Math.floor(Math.random() * instructions.length)];
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            ARM7TDMI CPU State
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className={`w-4 h-4 ${isRunning ? 'text-green-400 animate-pulse' : 'text-red-400'}`} />
                <span className={isRunning ? 'text-green-400' : 'text-red-400'}>
                  {isRunning ? 'Running' : 'Halted'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mode:</span>
                  <Badge variant="outline" className="border-purple-400 text-purple-400">
                    {cpuState.mode}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cycles:</span>
                  <span className="font-mono">{cpuState.cycles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frequency:</span>
                  <span className="font-mono">{cpuState.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current:</span>
                  <span className="font-mono text-cyan-400">{cpuState.instruction}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle>Registers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(registers).map(([reg, value]) => (
              <div key={reg} className="bg-slate-700/50 p-3 rounded-lg">
                <div className="text-sm text-slate-400">{reg}</div>
                <div className="font-mono text-cyan-400">
                  0x{value.toString(16).toUpperCase().padStart(8, '0')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle>Supported Instructions (MVP)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Data Processing</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• MOV - Move data</li>
                <li>• ADD - Addition</li>
                <li>• SUB - Subtraction</li>
                <li>• CMP - Compare</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Memory & Control</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• LDR - Load from memory</li>
                <li>• STR - Store to memory</li>
                <li>• B - Branch</li>
                <li>• BL - Branch with link</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CPUDisplay;
