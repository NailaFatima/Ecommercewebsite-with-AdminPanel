import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm product-card position-relative overflow-hidden">
      {/* Badges */}
      <div className="position-absolute top-0 start-0 z-3 p-2">
        {product.isNew && (
          <Badge bg="success" className="me-1">New</Badge>
        )}
        {product.isSale && (
          <Badge bg="danger">Sale</Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button 
        variant="light" 
        size="sm" 
        className="position-absolute top-0 end-0 z-3 m-2 rounded-circle border-0 shadow-sm"
      >
        <Heart size={16} />
      </Button>

      {/* Product Image */}
      <div className="product-image-container overflow-hidden">
        <Card.Img 
          variant="top" 
          src={product.images[0]} 
          alt={product.name}
          className="product-image"
          style={{ height: '250px', objectFit: 'cover' }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <small className="text-muted">{product.category}</small>
        </div>
        
        <Card.Title className="h6 mb-2">
          <Link 
            to={`/product/${product.id}`} 
            className="text-decoration-none text-dark stretched-link"
          >
            {product.name}
          </Link>
        </Card.Title>

        <div className="d-flex align-items-center mb-2">
          <div className="d-flex align-items-center me-2">
            <Star size={14} fill="#ffc107" className="text-warning me-1" />
            <small>{product.rating}</small>
          </div>
          <small className="text-muted">({product.reviews} reviews)</small>
        </div>

        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="h6 mb-0 fw-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <small className="text-muted text-decoration-line-through ms-2">
                  ${product.originalPrice}
                </small>
              )}
            </div>
          </div>
          
          <div className="mt-2">
            <small className="text-muted">
              Sizes: {product.sizes.slice(0, 3).join(', ')}
              {product.sizes.length > 3 && '...'}
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;