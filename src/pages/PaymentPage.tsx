import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  upiId: string;
  bankName: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setOrder } = useCart();
  
  const { customerInfo, orderTotal } = location.state || {};
  
  const [activeTab, setActiveTab] = useState('card');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    bankName: ''
  });
  const [errors, setErrors] = useState<Partial<PaymentInfo>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (!customerInfo) {
    navigate('/checkout');
    return null;
  }

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    let formattedValue = value;
    
    // Format card number
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    }

    setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateCardPayment = () => {
    const newErrors: Partial<PaymentInfo> = {};
    
    if (!paymentInfo.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (paymentInfo.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!paymentInfo.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format';
    }
    
    if (!paymentInfo.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentInfo.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    
    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUPIPayment = () => {
    const newErrors: Partial<PaymentInfo> = {};
    
    if (!paymentInfo.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!/@/.test(paymentInfo.upiId)) {
      newErrors.upiId = 'Invalid UPI ID format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNetBanking = () => {
    const newErrors: Partial<PaymentInfo> = {};
    
    if (!paymentInfo.bankName) {
      newErrors.bankName = 'Please select a bank';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = false;
    
    switch (activeTab) {
      case 'card':
        isValid = validateCardPayment();
        break;
      case 'upi':
        isValid = validateUPIPayment();
        break;
      case 'netbanking':
        isValid = validateNetBanking();
        break;
    }
    
    if (!isValid) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = 'ORD' + Date.now();
      const order = {
        id: orderId,
        items: state.items,
        total: orderTotal,
        customerInfo,
        paymentMethod: activeTab === 'card' ? 'Credit Card' : activeTab === 'upi' ? 'UPI' : 'Net Banking',
        orderDate: new Date()
      };
      
      setOrder(order);
      navigate('/invoice');
    }, 3000);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4 className="mb-0 d-flex align-items-center">
                <Lock className="me-2" size={20} />
                Secure Payment
              </h4>
            </Card.Header>
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab || 'card')}
                className="mb-4"
              >
                <Tab 
                  eventKey="card" 
                  title={
                    <div className="d-flex align-items-center">
                      <CreditCard size={16} className="me-2" />
                      Credit/Debit Card
                    </div>
                  }
                >
                  <Form onSubmit={handlePayment}>
                    <div className="mb-3">
                      <Form.Label>Card Number *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        maxLength={19}
                        isInvalid={!!errors.cardNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardNumber}
                      </Form.Control.Feedback>
                    </div>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label>Expiry Date *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          maxLength={5}
                          isInvalid={!!errors.expiryDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.expiryDate}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label>CVV *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                          maxLength={3}
                          isInvalid={!!errors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cvv}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>

                    <div className="mb-3">
                      <Form.Label>Cardholder Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        value={paymentInfo.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        isInvalid={!!errors.cardName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardName}
                      </Form.Control.Feedback>
                    </div>

                    <Button 
                      type="submit" 
                      variant="success" 
                      size="lg" 
                      className="w-100"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing Payment...' : `Pay $${orderTotal?.toFixed(2)}`}
                    </Button>
                  </Form>
                </Tab>

                <Tab 
                  eventKey="upi" 
                  title={
                    <div className="d-flex align-items-center">
                      <Smartphone size={16} className="me-2" />
                      UPI
                    </div>
                  }
                >
                  <Form onSubmit={handlePayment}>
                    <div className="mb-4">
                      <Form.Label>UPI ID *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="yourname@upi"
                        value={paymentInfo.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                        isInvalid={!!errors.upiId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.upiId}
                      </Form.Control.Feedback>
                    </div>

                    <Button 
                      type="submit" 
                      variant="success" 
                      size="lg" 
                      className="w-100"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing Payment...' : `Pay $${orderTotal?.toFixed(2)}`}
                    </Button>
                  </Form>
                </Tab>

                <Tab 
                  eventKey="netbanking" 
                  title={
                    <div className="d-flex align-items-center">
                      <Building2 size={16} className="me-2" />
                      Net Banking
                    </div>
                  }
                >
                  <Form onSubmit={handlePayment}>
                    <div className="mb-4">
                      <Form.Label>Select Bank *</Form.Label>
                      <Form.Select
                        value={paymentInfo.bankName}
                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                        isInvalid={!!errors.bankName}
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.bankName}
                      </Form.Control.Feedback>
                    </div>

                    <Button 
                      type="submit" 
                      variant="success" 
                      size="lg" 
                      className="w-100"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Redirecting to Bank...' : `Pay $${orderTotal?.toFixed(2)}`}
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>

          {/* Security Info */}
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <Lock className="me-2 text-success" size={20} />
                <h6 className="mb-0">Your payment is secure</h6>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <small className="text-muted">
                    ✓ 256-bit SSL encryption<br />
                    ✓ PCI DSS compliant<br />
                    ✓ No payment data stored
                  </small>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">
                    ✓ 24/7 fraud monitoring<br />
                    ✓ Secure payment gateway<br />
                    ✓ Money-back guarantee
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;