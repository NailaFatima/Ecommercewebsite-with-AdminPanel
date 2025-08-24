import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

const CheckoutPage: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  if (state.items.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Your cart is empty. Please add items before checkout.
          <Button variant="primary" className="ms-2" onClick={() => navigate('/')}>
            Shop Now
          </Button>
        </Alert>
      </Container>
    );
  }

  const shippingCost = state.total > 75 ? 0 : 9.99;
  const tax = state.total * 0.08;
  const finalTotal = state.total + shippingCost + tax;

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};
    
    if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Email is invalid';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.city.trim()) newErrors.city = 'City is required';
    if (!customerInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate('/payment', { 
        state: { customerInfo, orderTotal: finalTotal }
      });
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col lg={7}>
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0">Shipping Information</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <div className="mb-3">
                  <Form.Label>Street Address *</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </div>

                <Row>
                  <Col md={8} className="mb-3">
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label>ZIP Code *</Form.Label>
                    <Form.Control
                      type="text"
                      value={customerInfo.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      isInvalid={!!errors.zipCode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.zipCode}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg">
                    Continue to Payment
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              {state.items.map((item) => (
                <div 
                  key={`${item.product.id}-${item.size}-${item.color}`} 
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="rounded me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0">{item.product.name}</h6>
                      <small className="text-muted">
                        {item.size} | {item.color} | Qty: {item.quantity}
                      </small>
                    </div>
                  </div>
                  <span className="fw-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <hr />
              
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
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h6>Secure Checkout</h6>
              <p className="small text-muted mb-0">
                Your payment information is encrypted and secure. We use industry-standard 
                SSL technology to protect your data.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;