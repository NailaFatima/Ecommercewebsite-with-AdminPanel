import React from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <ShoppingBag size={64} className="text-muted mb-3" />
          <h2>Your cart is empty</h2>
          <p className="text-muted mb-4">Add some products to get started</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Start Shopping
          </Button>
        </div>
      </Container>
    );
  }

  const shippingCost = state.total > 75 ? 0 : 9.99;
  const tax = state.total * 0.08;
  const finalTotal = state.total + shippingCost + tax;

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Shopping Cart ({state.itemCount} items)</h4>
            </Card.Header>
            <Card.Body>
              {state.items.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className={index > 0 ? 'border-top pt-3 mt-3' : ''}>
                  <Row>
                    <Col md={3}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-100 rounded"
                        style={{ height: '120px', objectFit: 'cover' }}
                      />
                    </Col>
                    <Col md={9}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1">{item.product.name}</h6>
                          <small className="text-muted">
                            Size: {item.size} | Color: {item.color}
                          </small>
                        </div>
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </Button>
                          <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, item.size, item.color, Math.max(1, parseInt(e.target.value) || 1))}
                            className="mx-2 text-center"
                            style={{ width: '60px' }}
                            min="1"
                            size="sm"
                          />
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        
                        <div className="text-end">
                          <div className="fw-bold">${(item.product.price * item.quantity).toFixed(2)}</div>
                          <small className="text-muted">${item.product.price} each</small>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold h5">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              
              {shippingCost > 0 && (
                <Alert variant="info" className="mt-3">
                  <small>Add ${(75 - state.total).toFixed(2)} more for free shipping!</small>
                </Alert>
              )}
              
              <div className="d-grid gap-2 mt-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h6>Why shop with us?</h6>
              <ul className="list-unstyled small">
                <li>✓ Free shipping on orders $75+</li>
                <li>✓ 30-day easy returns</li>
                <li>✓ Secure payment processing</li>
                <li>✓ Quality guarantee</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;