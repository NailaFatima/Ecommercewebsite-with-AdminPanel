import React from 'react';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { X } from 'lucide-react';
import { FilterOptions } from '../types';
import { categories, sizes, colors } from '../data/products';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.category, category]
      : filters.category.filter(c => c !== category);
    
    onFilterChange({ ...filters, category: newCategories });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked 
      ? [...filters.size, size]
      : filters.size.filter(s => s !== size);
    
    onFilterChange({ ...filters, size: newSizes });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked 
      ? [...filters.color, color]
      : filters.color.filter(c => c !== color);
    
    onFilterChange({ ...filters, color: newColors });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const activeFiltersCount = filters.category.length + filters.size.length + filters.color.length;

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Filters</h6>
        {activeFiltersCount > 0 && (
          <div>
            <Badge bg="primary" className="me-2">{activeFiltersCount}</Badge>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={onClearFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </Card.Header>
      
      <Card.Body>
        {/* Price Range */}
        <div className="mb-4">
          <h6 className="mb-3">Price Range</h6>
          <div className="row">
            <div className="col-6">
              <Form.Control
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                size="sm"
              />
            </div>
            <div className="col-6">
              <Form.Control
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h6 className="mb-3">Categories</h6>
          {categories.map(category => (
            <Form.Check
              key={category}
              type="checkbox"
              id={`category-${category}`}
              label={category}
              checked={filters.category.includes(category)}
              onChange={(e) => handleCategoryChange(category, e.target.checked)}
              className="mb-2"
            />
          ))}
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h6 className="mb-3">Sizes</h6>
          <div className="d-flex flex-wrap gap-2">
            {sizes.map(size => (
              <Form.Check
                key={size}
                type="checkbox"
                id={`size-${size}`}
                checked={filters.size.includes(size)}
                onChange={(e) => handleSizeChange(size, e.target.checked)}
                className="size-checkbox"
                label={
                  <Badge 
                    bg={filters.size.includes(size) ? 'primary' : 'outline-secondary'}
                    className="size-badge"
                  >
                    {size}
                  </Badge>
                }
              />
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <h6 className="mb-3">Colors</h6>
          {colors.map(color => (
            <Form.Check
              key={color}
              type="checkbox"
              id={`color-${color}`}
              label={color}
              checked={filters.color.includes(color)}
              onChange={(e) => handleColorChange(color, e.target.checked)}
              className="mb-2"
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductFilters;