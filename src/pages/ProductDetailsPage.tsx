import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Form, Alert } from 'react-bootstrap';
import { ArrowLeft, Heart, Share2, Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = products.find(p => p.id === id);
  
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Button
          variant="link"
          className="text-decoration-none p-0"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="me-2" />
          Back to Products
        </Button>
      </div>

      {/* Alert for successful add to cart */}
      {showAlert && (
        <Alert variant="success" className="mb-4" dismissible onClose={() => setShowAlert(false)}>
          Product added to cart successfully!
        </Alert>
      )}

      <Row>
        {/* Product Images */}
        <Col lg={6}>
          <div className="mb-4">
            <div 
              className={`position-relative overflow-hidden rounded ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
              style={{ height: '500px' }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-100 h-100 object-fit-cover transition-transform ${isZoomed ? 'scale-150' : ''}`}
                style={{ 
                  transition: 'transform 0.3s ease',
                  transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
              />
              
              {/* Badges */}
              <div className="position-absolute top-0 start-0 p-3">
                {product.isNew && <Badge bg="success" className="me-2">New</Badge>}
                {product.isSale && <Badge bg="danger">Sale</Badge>}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="d-flex gap-2 mt-3">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`border rounded cursor-pointer ${selectedImage === index ? 'border-primary' : 'border-light'}`}
                    onClick={() => setSelectedImage(index)}
                    style={{ width: '80px', height: '80px' }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-100 h-100 object-fit-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>

        {/* Product Details */}
        <Col lg={6}>
          <div className="ps-lg-4">
            {/* Product Title and Rating */}
            <div className="mb-3">
              <h1 className="h3 mb-2">{product.name}</h1>
              <div className="d-flex align-items-center mb-2">
                <div className="d-flex align-items-center me-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? '#ffc107' : 'none'}
                      className="text-warning me-1"
                    />
                  ))}
                  <span className="ms-1">{product.rating}</span>
                </div>
                <small className="text-muted">({product.reviews} reviews)</small>
              </div>
              <p className="text-muted mb-0">{product.category}</p>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="d-flex align-items-center">
                <h2 className="h4 mb-0 text-primary fw-bold">${product.price}</h2>
                {product.originalPrice && (
                  <span className="text-muted text-decoration-line-through ms-3 h5">
                    ${product.originalPrice}
                  </span>
                )}
                {product.isSale && (
                  <Badge bg="danger" className="ms-2">
                    {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h6>Description</h6>
              <p className="text-muted">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h6>Features</h6>
              <ul className="list-unstyled">
                {product.features.map((feature, index) => (
                  <li key={index} className="mb-1">
                    <small className="text-muted">• {feature}</small>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
              <h6>Size</h6>
              <div className="d-flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="px-3"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-4">
              <h6>Color</h6>
              <div className="d-flex gap-2 flex-wrap">
                {product.colors.map(color => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className="px-3"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <h6>Quantity</h6>
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="mx-2 text-center"
                  style={{ width: '80px' }}
                  min="1"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2 d-md-flex mb-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button variant="outline-secondary" size="lg">
                <Heart size={20} />
              </Button>
              <Button variant="outline-secondary" size="lg">
                <Share2 size={20} />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border-top pt-4">
              <small className="text-muted">
                <strong>Free shipping</strong> on orders over $75<br />
                <strong>30-day returns</strong> and exchanges<br />
                <strong>Size guide</strong> available
              </small>
            </div>
          </div>
        </Col>
      </Row>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-5 pt-5 border-top">
          <h3 className="mb-4">You might also like</h3>
          <Row className="g-4">
            {relatedProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductDetailsPage;