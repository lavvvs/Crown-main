

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories, filters } from "@/data/dummydb";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    browse: true,
    price: true,
    color: true,
    length: false,
    texture: false,
    type: false,
  });
  const [priceRange, setPriceRange] = useState([15, 94]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Browse by Categories */}
      <div className="bg-pink-50 text-pink-900 rounded-lg shadow-sm border border-pink-200 p-4">
        <button
          onClick={() => toggleSection("browse")}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-lg font-semibold">Browse by</h3>
          {expandedSections.browse ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {expandedSections.browse && (
          <div className="mt-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                className="block w-full text-left px-3 py-2 text-sm text-pink-700 hover:bg-pink-100 hover:text-pink-900 rounded-md transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter by */}
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
            value={priceRange}
            onValueChange={setPriceRange}
            max={200}
            min={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-pink-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </SectionToggle>

        {/* Color */}
        <SectionToggle
          label="Color"
          isOpen={expandedSections.color}
          onClick={() => toggleSection("color")}
        >
          {filters.color.map((color) => (
            <FilterOption key={color} label={color} />
          ))}
        </SectionToggle>

        {/* Length */}
        <SectionToggle
          label="Length"
          isOpen={expandedSections.length}
          onClick={() => toggleSection("length")}
        >
          {filters.length.map((length) => (
            <FilterOption key={length} label={length} />
          ))}
        </SectionToggle>

        {/* Texture */}
        <SectionToggle
          label="Texture"
          isOpen={expandedSections.texture}
          onClick={() => toggleSection("texture")}
        >
          {filters.texture.map((texture) => (
            <FilterOption key={texture} label={texture} />
          ))}
        </SectionToggle>

        {/* Type */}
        <SectionToggle
          label="Type"
          isOpen={expandedSections.type}
          onClick={() => toggleSection("type")}
        >
          {filters.type.map((type) => (
            <FilterOption key={type} label={type} />
          ))}
        </SectionToggle>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full justify-between border-pink-300 text-white bg-pink-700 hover:bg-pink-100 hover:text-pink-700"
        >
          <span className="flex items-center gap-2">
            <Filter size={18} />
            Filters & Categories
          </span>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-40 ">
          <div className="fixed inset-y-0 left-0 w-80 bg-pink-50 text-pink-900 overflow-y-auto p-4 border-r border-pink-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold ">Filters & Categories</h2>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
              >
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

// 🔸 Reusable Toggle Section Component
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

// 🔸 Reusable Checkbox Option
function FilterOption({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} />
      <label htmlFor={label} className="text-sm text-pink-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
