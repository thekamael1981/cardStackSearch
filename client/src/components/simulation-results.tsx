import { Card, CardContent } from '@/components/ui/card';
import { Flag } from 'lucide-react';
import { SimulationResult } from '@shared/schema';

interface SimulationResultsProps {
  result: SimulationResult | null;
  isVisible: boolean;
}

export function SimulationResults({ result, isVisible }: SimulationResultsProps) {
  if (!isVisible || !result) return null;

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Flag className="text-success mr-3" size={20} />
          Simulation Results
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-lg p-4 border-l-4 ${
            result.found 
              ? 'bg-green-50 border-success' 
              : 'bg-red-50 border-error'
          }`}>
            <h4 className={`font-medium mb-2 ${
              result.found ? 'text-success' : 'text-error'
            }`}>
              Search Result
            </h4>
            <p className="text-sm text-gray-700">
              {result.found ? (
                <>Target number <span className="font-bold">{result.target}</span> found successfully!</>
              ) : (
                <>Target number <span className="font-bold">{result.target}</span> not found in the deck.</>
              )}
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-primary">
            <h4 className="font-medium text-primary mb-2">Statistics</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Total comparisons: <span className="font-bold">{result.totalComparisons}</span></p>
              <p>Total steps: <span className="font-bold">{result.totalSteps}</span></p>
              <p>Search efficiency: <span className="font-bold">{result.efficiency}%</span></p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-secondary">
          <h4 className="font-medium text-yellow-800 mb-2">Search Path</h4>
          <p className="text-sm text-gray-700">
            {result.searchPath.join(' → ')} {result.found ? '(Found!)' : '(Not Found)'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
