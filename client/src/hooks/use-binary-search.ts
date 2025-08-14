import { useState, useCallback } from 'react';
import { SimulationStep, SimulationResult } from '@shared/schema';

export function useBinarySearch() {
  const [cards, setCards] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const parseCardSequence = useCallback((input: string): number[] => {
    try {
      const numbers = input
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => parseInt(s, 10))
        .filter(n => !isNaN(n) && n > 0);
      
      // Verify sorted order
      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < numbers[i - 1]) {
          throw new Error('Cards must be in ascending order');
        }
      }
      
      return numbers;
    } catch (error) {
      throw new Error('Invalid card sequence format');
    }
  }, []);

  const findMiddleIndex = useCallback((length: number): number => {
    if (length % 2 === 1) {
      // Odd: exact center (0-based: (length-1)/2)
      return Math.floor(length / 2);
    } else {
      // Even: last of first half (0-based: length/2 - 1)
      return Math.floor(length / 2) - 1;
    }
  }, []);

  const generateAllSteps = useCallback((initialCards: number[], targetNum: number): SimulationStep[] => {
    const allSteps: SimulationStep[] = [];
    let currentCards = [...initialCards];
    let stepCount = 0;
    let comparisons = 0;
    const searchPath: number[] = [];

    // Initial step
    allSteps.push({
      stepNumber: stepCount,
      cards: [...currentCards],
      action: 'initial',
      description: `Initial state: ${currentCards.length} cards remaining. Target number is ${targetNum}.`,
      comparisons: 0
    });

    while (currentCards.length > 0) {
      stepCount++;
      const middleIndex = findMiddleIndex(currentCards.length);
      const middleCard = currentCards[middleIndex];
      searchPath.push(middleCard);

      // Comparison step
      allSteps.push({
        stepNumber: stepCount,
        cards: [...currentCards],
        selectedCard: middleCard,
        selectedIndex: middleIndex,
        action: 'compare',
        description: `Selected middle card: ${middleCard} (position ${middleIndex + 1} of ${currentCards.length}). ${
          currentCards.length % 2 === 1 
            ? 'Odd count: choosing exact center.'
            : 'Even count: choosing last of first half.'
        }`,
        comparisons: comparisons + 1
      });

      comparisons++;

      if (middleCard === targetNum) {
        // Found!
        allSteps.push({
          stepNumber: stepCount + 1,
          cards: [...currentCards],
          selectedCard: middleCard,
          selectedIndex: middleIndex,
          action: 'found',
          description: `Target ${targetNum} found! The search is complete.`,
          comparisons
        });
        break;
      } else if (middleCard < targetNum) {
        // Remove middle card and all cards above (left side)
        const removedCards = currentCards.slice(0, middleIndex + 1);
        currentCards = currentCards.slice(middleIndex + 1);
        
        allSteps.push({
          stepNumber: stepCount + 1,
          cards: [...currentCards],
          action: 'remove_above',
          description: `${middleCard} < ${targetNum}, removing ${middleCard} and all cards above it. Removed: [${removedCards.join(', ')}]. ${currentCards.length} cards remaining.`,
          comparisons
        });
      } else {
        // Remove middle card and all cards below (right side)
        const removedCards = currentCards.slice(middleIndex);
        currentCards = currentCards.slice(0, middleIndex);
        
        allSteps.push({
          stepNumber: stepCount + 1,
          cards: [...currentCards],
          action: 'remove_below',
          description: `${middleCard} > ${targetNum}, removing ${middleCard} and all cards below it. Removed: [${removedCards.join(', ')}]. ${currentCards.length} cards remaining.`,
          comparisons
        });
      }

      stepCount++;
    }

    // If we exit the loop without finding the target
    if (currentCards.length === 0 && allSteps[allSteps.length - 1].action !== 'found') {
      allSteps.push({
        stepNumber: stepCount,
        cards: [],
        action: 'not_found',
        description: `Target ${targetNum} not found. No cards remaining.`,
        comparisons
      });
    }

    return allSteps;
  }, [findMiddleIndex]);

  const startSimulation = useCallback((cardSequence: string, targetNum: number) => {
    try {
      const parsedCards = parseCardSequence(cardSequence);
      const allSteps = generateAllSteps(parsedCards, targetNum);
      
      setCards(parsedCards);
      setTarget(targetNum);
      setSteps(allSteps);
      setCurrentStep(0);
      setIsRunning(true);
      setIsCompleted(false);
      setResult(null);
    } catch (error) {
      throw error;
    }
  }, [parseCardSequence, generateAllSteps]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
    
    if (currentStep === steps.length - 2) {
      // Completing simulation
      const lastStep = steps[steps.length - 1];
      const found = lastStep.action === 'found';
      const searchPath = steps
        .filter(step => step.selectedCard !== undefined)
        .map(step => step.selectedCard!);
      
      const efficiency = Math.round((lastStep.comparisons / cards.length) * 100);
      
      setResult({
        found,
        target: target!,
        totalSteps: steps.length - 1,
        totalComparisons: lastStep.comparisons,
        searchPath,
        efficiency
      });
      
      setIsCompleted(true);
      setIsRunning(false);
    }
  }, [currentStep, steps, cards.length, target]);

  const reset = useCallback(() => {
    setCards([]);
    setTarget(null);
    setSteps([]);
    setCurrentStep(0);
    setIsRunning(false);
    setIsCompleted(false);
    setResult(null);
  }, []);

  const loadExample = useCallback(() => {
    const exampleCards = "2, 3, 5, 8, 13, 15, 18, 20, 23, 25";
    const exampleTarget = 8;
    
    try {
      startSimulation(exampleCards, exampleTarget);
    } catch (error) {
      console.error('Failed to load example:', error);
    }
  }, [startSimulation]);

  return {
    cards,
    target,
    steps,
    currentStep,
    isRunning,
    isCompleted,
    result,
    startSimulation,
    nextStep,
    reset,
    loadExample,
    parseCardSequence
  };
}
