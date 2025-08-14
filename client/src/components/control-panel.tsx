import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, SkipForward, RotateCcw, Lightbulb, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ControlPanelProps {
  onStartSimulation: (cardSequence: string, target: number) => void;
  onNextStep: () => void;
  onReset: () => void;
  onLoadExample: () => void;
  isRunning: boolean;
  isCompleted: boolean;
  canNextStep: boolean;
}

export function ControlPanel({
  onStartSimulation,
  onNextStep,
  onReset,
  onLoadExample,
  isRunning,
  isCompleted,
  canNextStep
}: ControlPanelProps) {
  const [cardSequence, setCardSequence] = useState('2, 3, 5, 8, 13, 15, 18, 20, 23, 25');
  const [target, setTarget] = useState(8);
  const { toast } = useToast();

  const handleStartSimulation = () => {
    try {
      onStartSimulation(cardSequence, target);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid input",
        variant: "destructive"
      });
    }
  };

  const handleLoadExample = () => {
    setCardSequence('2, 3, 5, 8, 13, 15, 18, 20, 23, 25');
    setTarget(8);
    onLoadExample();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Settings className="text-primary mr-3" size={20} />
            Control Panel
          </h2>
          
          <div className="space-y-6">
            {/* Card Sequence Input */}
            <div>
              <Label htmlFor="cardSequence" className="text-sm font-medium text-gray-700 mb-2 block">
                Card Sequence (sorted, comma-separated)
              </Label>
              <Textarea
                id="cardSequence"
                value={cardSequence}
                onChange={(e) => setCardSequence(e.target.value)}
                className="resize-none"
                rows={3}
                placeholder="e.g., 2, 3, 5, 8, 13, 15, 18, 20, 23, 25"
              />
              <p className="text-xs text-gray-500 mt-1">Enter numbers in ascending order</p>
            </div>

            {/* Target Number Input */}
            <div>
              <Label htmlFor="target" className="text-sm font-medium text-gray-700 mb-2 block">
                Target Number
              </Label>
              <Input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                placeholder="Enter target number"
              />
            </div>

            {/* Control Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleStartSimulation}
                className="w-full"
                disabled={isRunning}
              >
                <Play className="mr-2" size={16} />
                Start Simulation
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={onNextStep}
                  variant="outline"
                  className="bg-warning hover:bg-orange-600 text-white border-warning"
                  disabled={!canNextStep}
                >
                  <SkipForward className="mr-1" size={14} />
                  Next Step
                </Button>
                <Button 
                  onClick={onReset}
                  variant="outline"
                  className="bg-gray-500 hover:bg-gray-600 text-white border-gray-500"
                >
                  <RotateCcw className="mr-1" size={14} />
                  Reset
                </Button>
              </div>
            </div>

            {/* Example Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button 
                onClick={handleLoadExample}
                variant="outline"
                className="w-full"
              >
                <Lightbulb className="mr-2" size={16} />
                Load Example (8 in [2,3,5,8,13,15,18,20,23,25])
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Steps */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-medium mr-3">?</span>
            Algorithm Steps
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
              <p className="text-gray-700">Find middle card (odd: center, even: last of first half)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
              <p className="text-gray-700">Compare middle card with target number</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
              <p className="text-gray-700">Remove cards based on comparison result</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">4</span>
              <p className="text-gray-700">Repeat until found or no cards remain</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
