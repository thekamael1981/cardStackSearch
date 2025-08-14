import { Card, CardContent } from '@/components/ui/card';
import { History } from 'lucide-react';
import { SimulationStep } from '@shared/schema';

interface StepHistoryProps {
  steps: SimulationStep[];
  currentStep: number;
}

export function StepHistory({ steps, currentStep }: StepHistoryProps) {
  const getStepIcon = (step: SimulationStep, index: number) => {
    if (index > currentStep) return 'bg-gray-300 text-white';
    
    switch (step.action) {
      case 'initial':
        return 'bg-gray-500 text-white';
      case 'compare':
        return 'bg-warning text-white';
      case 'remove_above':
      case 'remove_below':
        return 'bg-primary text-white';
      case 'found':
        return 'bg-success text-white';
      case 'not_found':
        return 'bg-error text-white';
      default:
        return 'bg-gray-300 text-white';
    }
  };

  const getStepBackgroundClass = (step: SimulationStep, index: number) => {
    if (index > currentStep) return 'bg-gray-50 opacity-50';
    
    switch (step.action) {
      case 'compare':
        return 'bg-orange-50 border-l-4 border-warning';
      case 'found':
        return 'bg-green-50 border-l-4 border-success';
      case 'not_found':
        return 'bg-red-50 border-l-4 border-error';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <History className="text-secondary mr-3" size={20} />
          Step History
        </h3>
        
        {steps.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {steps.slice(0, currentStep + 1).map((step, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-4 p-3 rounded-lg transition-all ${getStepBackgroundClass(step, index)}`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${getStepIcon(step, index)}`}>
                  {index}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 break-words">
                    {index === 0 ? (
                      <><span className="font-medium">Initial:</span> {step.description}</>
                    ) : (
                      <><span className="font-medium">Step {index}:</span> {step.description}</>
                    )}
                  </p>
                  {step.cards.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1 break-all">
                      Cards: [{step.cards.join(', ')}]
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-3 opacity-50">⏱️</div>
            <p className="text-sm">No simulation steps yet. Start the simulation to see the progress.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
