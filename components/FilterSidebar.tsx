import { useState } from 'react';

interface Filters {
  categories: string[];
  priceRange: [number, number];
}

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
  maxPrice: number;
}

const FilterSidebar = ({ onFilterChange, maxPrice }: FilterSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(maxPrice);

  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange: [priceMin, priceMax],
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceMin(0);
    setPriceMax(maxPrice);
    onFilterChange({ categories: [], priceRange: [0, maxPrice] });
  };

  const categories = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
  ];

  return (
    <div className="w-full md:w-64 p-4 bg-gray-50 dark:bg-gray-800 rounded-sm">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Category</h4>
        {categories.map(cat => (
          <label key={cat.value} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.value)}
              onChange={() => {
                setSelectedCategories(prev =>
                  prev.includes(cat.value) ? prev.filter(c => c !== cat.value) : [...prev, cat.value]
                );
              }}
              className="rounded"
            />
            <span className="text-sm">{cat.label}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-sm"
            placeholder="Min"
          />
          <span>-</span>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-black text-white py-2 rounded-sm text-sm hover:bg-gray-800 transition"
        >
          Apply
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 border border-black py-2 rounded-sm text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
