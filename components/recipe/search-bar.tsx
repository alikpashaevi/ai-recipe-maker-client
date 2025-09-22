
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";

interface SearchBarProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  onGenerateRecipe: () => void;
  isLoading: boolean;
}

const SearchBar = ({
  ingredients,
  onIngredientsChange,
  onGenerateRecipe,
  isLoading,
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddIngredient = () => {
    if (inputValue.trim() !== "") {
      onIngredientsChange([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search by ingredient
        </Button>
      )}
      {isOpen && (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter an ingredient"
            className="w-full"
          />
          <Button onClick={handleAddIngredient}>Add</Button>
          <Button onClick={() => setIsOpen(false)} variant="ghost">
            <X className="h-6 w-6" />
          </Button>
        </div>
      )}
      <div className="mt-2">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800 mr-2 mb-2"
          >
            {ingredient}
            <button
              onClick={() => handleRemoveIngredient(index)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {isOpen && ingredients.length > 0 && (
        <Button onClick={onGenerateRecipe} disabled={isLoading} className="mt-4">
          {isLoading ? "Generating..." : "Generate Recipe"}
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
