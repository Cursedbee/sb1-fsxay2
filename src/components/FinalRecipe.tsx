import React from 'react';
import { Clock, ChefHat } from 'lucide-react';

interface FinalRecipeProps {
  selections: {
    method: string;
    protein: string;
    vegetable: string;
    spice: string;
  };
}

const FinalRecipe: React.FC<FinalRecipeProps> = ({ selections }) => {
  const { method, protein, vegetable, spice } = selections;
  const recipeName = `${spice} ${method} ${protein} with ${vegetable}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="aspect-video w-full relative">
        <img
          src={`https://source.unsplash.com/featured/?${encodeURIComponent(recipeName)},dish`}
          alt={recipeName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h2 className="text-white text-3xl font-bold p-6">{recipeName}</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" />
            <span className="text-gray-600">30-45 mins</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="text-orange-500" />
            <span className="text-gray-600">Intermediate</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>{protein}</li>
              <li>{vegetable}</li>
              <li>{spice} and other seasonings to taste</li>
              <li>Oil for {method.toLowerCase()}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Instructions</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Prepare {protein} by cutting into even-sized pieces</li>
              <li>Clean and cut {vegetable} into appropriate sizes</li>
              <li>Season {protein} with {spice} and let it marinate for 15 minutes</li>
              <li>{method} the {protein} until properly cooked</li>
              <li>Add {vegetable} and cook until tender</li>
              <li>Adjust seasoning to taste and serve hot</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalRecipe;