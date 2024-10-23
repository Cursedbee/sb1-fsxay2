import React, { useState } from 'react';
import { ChefHat, Beef, Carrot, Utensils, ArrowRight, RotateCcw, ArrowLeft } from 'lucide-react';
import RecipeStep from './components/RecipeStep';
import { methods, proteins, vegetables, spices } from './data/ingredients';
import FinalRecipe from './components/FinalRecipe';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [selections, setSelections] = useState({
    method: '',
    protein: '',
    vegetable: '',
    spice: ''
  });

  const resetSelections = () => {
    setSelections({ method: '', protein: '', vegetable: '', spice: '' });
    setCurrentStep(0);
    setDirection('next');
  };

  const handleSelection = (type: string, value: string) => {
    setDirection('next');
    setSelections(prev => ({ ...prev, [type]: value }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setDirection('prev');
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep);
    const currentType = steps[currentStep].type;
    setSelections(prev => ({ ...prev, [currentType]: '' }));
  };

  const steps = [
    {
      title: 'Choose Your Cooking Method',
      icon: ChefHat,
      options: methods,
      type: 'method'
    },
    {
      title: 'Select Protein',
      icon: Beef,
      options: proteins,
      type: 'protein'
    },
    {
      title: 'Pick Vegetables',
      icon: Carrot,
      options: vegetables,
      type: 'vegetable'
    },
    {
      title: 'Add Spices',
      icon: Utensils,
      options: spices,
      type: 'spice'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Recipe Builder</h1>
          <p className="text-gray-600">Create your perfect dish step by step</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            {steps.map((step, index) => (
              <React.Fragment key={step.type}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-orange-500 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <step.icon size={24} />
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight 
                    className={`transition-colors duration-300 ${
                      index < currentStep ? 'text-orange-500' : 'text-gray-300'
                    }`} 
                    size={20} 
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {currentStep > 0 && currentStep < steps.length && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-orange-500 hover:text-orange-600 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to {steps[currentStep - 1].title}</span>
            </button>
          </div>
        )}

        <div className="cube-container">
          {currentStep < steps.length ? (
            <RecipeStep
              {...steps[currentStep]}
              onSelect={(value) => handleSelection(steps[currentStep].type, value)}
              currentStep={currentStep}
              direction={direction}
            />
          ) : (
            <div className={`max-w-2xl mx-auto ${direction === 'next' ? 'cube-next' : 'cube-prev'}`}>
              <FinalRecipe selections={selections} />
              <button
                onClick={resetSelections}
                className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                <RotateCcw size={20} />
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;