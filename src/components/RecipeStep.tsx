import React from 'react';
import { LucideIcon } from 'lucide-react';

interface RecipeStepProps {
  title: string;
  icon: LucideIcon;
  options: string[];
  onSelect: (value: string) => void;
  type?: string;
  currentStep: number;
  direction: 'next' | 'prev';
}

const RecipeStep: React.FC<RecipeStepProps> = ({ 
  title, 
  options, 
  onSelect, 
  type, 
  direction 
}) => {
  const getMethodImage = (method: string) => {
    const images = {
      'Air Fryer': 'https://images.unsplash.com/photo-1626509653291-18d9a934b9db?auto=format&fit=crop&q=80',
      'Oven': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80',
      'Stove': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80',
      'Barbecue': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'
    };
    
    return type === 'method' ? images[method as keyof typeof images] : `https://source.unsplash.com/featured/?${encodeURIComponent(method)},food`;
  };

  return (
    <div className={`max-w-4xl mx-auto transform-gpu ${direction === 'next' ? 'cube-next' : 'cube-prev'}`}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={getMethodImage(option)}
                alt={option}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold transform group-hover:translate-x-2 transition-transform duration-300">
                {option}
              </h3>
              <p className="text-sm text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {type === 'method' && `Perfect for ${option === 'Air Fryer' ? 'crispy' : option === 'Oven' ? 'roasted' : option === 'Stove' ? 'quick' : 'smoky'} dishes`}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeStep;