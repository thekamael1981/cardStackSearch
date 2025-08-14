import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { SimulationStep } from '@shared/schema';

interface CardDeckProps {
  currentStep: SimulationStep | null;
  target: number | null;
  totalSteps: number;
  stepNumber: number;
}

export function CardDeck({ currentStep, target, totalSteps, stepNumber }: CardDeckProps) {
  const getCardStyle = (cardValue: number) => {
    if (!currentStep) return 'card-available';
    
    if (currentStep.action === 'found' && cardValue === currentStep.selectedCard) {
      return 'card-found';
    }
    
    if (currentStep.selectedCard === cardValue) {
      return 'card-selected';
    }
    
    return 'card-available';
  };

  const getCardBorderClass = (cardValue: number) => {
    if (!currentStep) return 'border-2 border-transparent';
    
    if (currentStep.action === 'found' && cardValue === currentStep.selectedCard) {
      return 'border-2 border-green-300';
    }
    
    if (currentStep.selectedCard === cardValue) {
      return 'border-4 border-yellow-300';
    }
    
    return 'border-2 border-transparent';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Search className="text-primary mr-3" size={20} />
            Card Deck Visualization
          </h2>
          <div className="text-sm text-gray-600">
            Step {stepNumber} / {totalSteps}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <span className="text-gray-600">Target:</span>
              <span className="ml-2 font-semibold text-primary">{target || '-'}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Cards Remaining:</span>
              <span className="ml-2 font-semibold text-gray-900">{currentStep?.cards.length || 0}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Comparisons:</span>
              <span className="ml-2 font-semibold text-warning">{currentStep?.comparisons || 0}</span>
            </div>
          </div>
        </div>

        {/* Card Deck Display */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Card Deck</h3>
          
          {currentStep && currentStep.cards.length > 0 ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {currentStep.cards.map((cardValue, index) => (
                <div
                  key={`${cardValue}-${index}`}
                  className={`
                    ${getCardStyle(cardValue)} 
                    text-white w-16 h-20 rounded-lg 
                    flex items-center justify-center 
                    font-bold text-lg shadow-md hover:shadow-lg 
                    transition-all duration-300
                    ${getCardBorderClass(cardValue)}
                  `}
                >
                  {cardValue}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3 opacity-50">🃏</div>
              <p className="text-sm">No cards to display. Start a simulation to see the deck.</p>
            </div>
          )}
          
          {/* Legend */}
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm flex-wrap gap-2">
            <div className="flex items-center">
              <div className="w-4 h-4 card-available rounded mr-2"></div>
              <span className="text-gray-600">Available Cards</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 card-selected border-2 border-yellow-300 rounded mr-2"></div>
              <span className="text-gray-600">Selected Middle Card</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 card-found rounded mr-2"></div>
              <span className="text-gray-600">Found</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 card-removed rounded mr-2"></div>
              <span className="text-gray-600">Removed</span>
            </div>
          </div>
        </div>

        {/* Current Step Description */}
        {currentStep && (
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-primary">
            <h4 className="font-medium text-primary mb-2 flex items-center">
              <span className="w-4 h-4 bg-primary rounded-full mr-2"></span>
              Current Step
            </h4>
            <p className="text-gray-700 text-sm">{currentStep.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
