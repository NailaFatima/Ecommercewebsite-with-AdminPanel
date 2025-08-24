import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button, Form, Pagination } from 'react-bootstrap';
import { Grid, List, Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { products } from '../data/products';
import { FilterOptions, SortOption } from '../types';

const PRODUCTS_PER_PAGE = 9;

const ProductListingPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 200]
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      // Size filter
      if (filters.size.length > 0 && !filters.size.some(size => product.sizes.includes(size))) {
        return false;
      }

      // Color filter
      if (filters.color.length > 0 && !filters.color.some(color => product.colors.includes(color))) {
        return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popularity':
        default:
          return b.reviews - a.reviews;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleClearFilters = () => {
    setFilters({
      category: [],
      size: [],
      color: [],
      priceRange: [0, 200]
    });
    setCurrentPage(1);
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 mb-3">Shop All Products</h1>
          <p className="text-muted">
            Discover our latest collection of premium apparel
          </p>
        </Col>
      </Row>

      {/* Controls */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="d-flex align-items-center gap-2">
            <Button
              variant={showFilters ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="d-flex align-items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
            
            <div className="d-flex border rounded">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="border-0"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="border-0"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </Col>
        
        <Col md={6}>
          <div className="d-flex align-items-center justify-content-md-end gap-2">
            <span className="text-muted small">
              Showing {currentProducts.length} of {filteredAndSortedProducts.length} products
            </span>
            
            <Form.Select
              size="sm"
              style={{ width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="popularity">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Filters Sidebar */}
        {showFilters && (
          <Col lg={3} className="mb-4">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </Col>
        )}

        {/* Products Grid */}
        <Col lg={showFilters ? 9 : 12}>
          {currentProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found</h5>
              <p className="text-muted">Try adjusting your filters</p>
              <Button variant="primary" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <Row className="g-4">
                {currentProducts.map(product => (
                  <Col 
                    key={product.id} 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={viewMode === 'grid' ? 4 : 12}
                  >
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination>
                    <Pagination.Prev 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    />
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListingPage;