import { HelpCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardDeck } from '@/components/card-deck';
import { ControlPanel } from '@/components/control-panel';
import { StepHistory } from '@/components/step-history';
import { SimulationResults } from '@/components/simulation-results';
import { useBinarySearch } from '@/hooks/use-binary-search';

export default function Home() {
  const {
    target,
    steps,
    currentStep,
    isRunning,
    isCompleted,
    result,
    startSimulation,
    nextStep,
    reset,
    loadExample
  } = useBinarySearch();

  const currentStepData = steps[currentStep] || null;
  const canNextStep = isRunning && currentStep < steps.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Layers className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Binary Search Card Simulator</h1>
                <p className="text-sm text-gray-600">Visualize Andi's card searching algorithm</p>
              </div>
            </div>
            <Button variant="ghost" className="text-gray-700">
              <HelpCircle className="mr-2" size={16} />
              Help
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              onStartSimulation={startSimulation}
              onNextStep={nextStep}
              onReset={reset}
              onLoadExample={loadExample}
              isRunning={isRunning}
              isCompleted={isCompleted}
              canNextStep={canNextStep}
            />
          </div>

          {/* Main Visualization */}
          <div className="lg:col-span-2">
            <CardDeck
              currentStep={currentStepData}
              target={target}
              totalSteps={steps.length > 0 ? steps.length - 1 : 0}
              stepNumber={currentStep}
            />

            <div className="mt-6">
              <StepHistory steps={steps} currentStep={currentStep} />
            </div>

            <SimulationResults result={result} isVisible={isCompleted} />
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <HelpCircle size={20} />
        </Button>
      </div>
    </div>
  );
}
