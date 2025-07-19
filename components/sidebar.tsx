"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Filter, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories as rawCategories, filters } from "@/data/dummydb";

export interface FilterState {
  priceRange: [number, number];
  color: string[];
  length: string[];
  texture: string[];
  type: string[];
  category?: string;
}

const categories = ["All Products", ...rawCategories]; // ✅ prepend default

export function Sidebar({
  onFilterChange,
}: {
  onFilterChange?: (filters: FilterState) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    browse: true,
    price: true,
    color: true,
    length: false,
    texture: false,
    type: false,
  });

  const [filtersState, setFiltersState] = useState<FilterState>({
    priceRange: [10, 200],
    color: [],
    length: [],
    texture: [],
    type: [],
    category: "All Products", // ✅ default
  });

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filtersState);
    }
  }, [filtersState, onFilterChange]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (
    section: keyof Omit<FilterState, "priceRange" | "category">,
    label: string
  ) => {
    setFiltersState((prev) => {
      const list = prev[section];
      const newList = list.includes(label)
        ? list.filter((item) => item !== label)
        : [...list, label];
      return { ...prev, [section]: newList };
    });
  };

  const handleCategorySelect = (category: string) => {
    setFiltersState((prev) => ({
      ...prev,
      category,
    }));
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Categories Section */}
      <div className="bg-pink-50 text-pink-900 rounded-lg shadow-sm border border-pink-200 p-4">
        <button
          onClick={() => toggleSection("browse")}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-lg font-semibold">Browse by</h3>
          {expandedSections.browse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {expandedSections.browse && (
          <div className="mt-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  filtersState.category === category
                    ? "bg-pink-200 text-pink-900 font-semibold"
                    : "text-pink-700 hover:bg-pink-100 hover:text-pink-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-pink-50 text-pink-900 rounded-lg shadow-sm border border-pink-200 p-4">
        <div className="flex items-center gap-2 mb-4 text-pink-700">
          <Filter size={18} />
          <h3 className="text-lg font-semibold">Filter by</h3>
        </div>

        {/* Price Range */}
        <SectionToggle
          label="Price Range"
          isOpen={expandedSections.price}
          onClick={() => toggleSection("price")}
        >
          <Slider
            value={filtersState.priceRange}
            onValueChange={(val: [number, number]) =>
              setFiltersState((prev) => ({ ...prev, priceRange: val }))
            }
            max={200}
            min={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-pink-600">
            <span>${filtersState.priceRange[0]}</span>
            <span>${filtersState.priceRange[1]}</span>
          </div>
        </SectionToggle>

        {/* Dynamic filter groups */}
        <FilterGroup
          label="Color"
          values={filters.color}
          selected={filtersState.color}
          isOpen={expandedSections.color}
          toggle={() => toggleSection("color")}
          onChange={(label) => handleCheckboxChange("color", label)}
        />

        <FilterGroup
          label="Length"
          values={filters.length}
          selected={filtersState.length}
          isOpen={expandedSections.length}
          toggle={() => toggleSection("length")}
          onChange={(label) => handleCheckboxChange("length", label)}
        />

        <FilterGroup
          label="Texture"
          values={filters.texture}
          selected={filtersState.texture}
          isOpen={expandedSections.texture}
          toggle={() => toggleSection("texture")}
          onChange={(label) => handleCheckboxChange("texture", label)}
        />

        {/* <FilterGroup
          label="Type"
          values={filters.type}
          selected={filtersState.type}
          isOpen={expandedSections.type}
          toggle={() => toggleSection("type")}
          onChange={(label) => handleCheckboxChange("type", label)}
        /> */}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full justify-between border-pink-300 text-white bg-pink-700 hover:bg-pink-100 hover:text-pink-700"
        >
          <span className="flex items-center gap-2">
            <Filter size={18} /> Filters & Categories
          </span>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-40">
          <div className="fixed inset-y-0 left-0 w-80 bg-pink-50 text-pink-900 overflow-y-auto p-4 border-r border-pink-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters & Categories</h2>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
                <X size={20} />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-4">
        <SidebarContent />
      </div>
    </>
  );
}

// Reusable components
function SectionToggle({
  label,
  isOpen,
  onClick,
  children,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-medium">{label}</h4>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function FilterOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={label} className="text-sm text-pink-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

function FilterGroup({
  label,
  values,
  selected,
  isOpen,
  toggle,
  onChange,
}: {
  label: string;
  values: string[];
  selected: string[];
  isOpen: boolean;
  toggle: () => void;
  onChange: (label: string) => void;
}) {
  return (
    <SectionToggle label={label} isOpen={isOpen} onClick={toggle}>
      {values.map((value) => (
        <FilterOption
          key={value}
          label={value}
          checked={selected.includes(value)}
          onChange={() => onChange(value)}
        />
      ))}
    </SectionToggle>
  );
}
