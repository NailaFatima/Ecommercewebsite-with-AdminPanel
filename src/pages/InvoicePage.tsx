import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Download, Printer, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoicePage: React.FC = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  
  const order = state.currentOrder;

  if (!order) {
    navigate('/');
    return null;
  }

  const generatePDF = async () => {
    const element = document.getElementById('invoice-content');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`invoice-${order.id}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewOrder = () => {
    clearCart();
    navigate('/');
  };

  return (
    <Container className="py-4">
      {/* Success Message */}
      <div className="text-center mb-4">
        <CheckCircle size={64} className="text-success mb-3" />
        <h2 className="text-success">Payment Successful!</h2>
        <p className="text-muted">Thank you for your order. Your invoice is ready below.</p>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-4 d-print-none">
        <Button variant="primary" onClick={generatePDF}>
          <Download size={16} className="me-2" />
          Download PDF
        </Button>
        <Button variant="outline-primary" onClick={handlePrint}>
          <Printer size={16} className="me-2" />
          Print Invoice
        </Button>
        <Button variant="success" onClick={handleNewOrder}>
          Continue Shopping
        </Button>
      </div>

      {/* Invoice Content */}
      <Card id="invoice-content" className="shadow">
        <Card.Body className="p-5">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-5">
            <div>
              <h1 className="h2 text-primary fw-bold mb-1">StyleHub</h1>
              <p className="text-muted mb-0">Premium Apparel Store</p>
            </div>
            <div className="text-end">
              <h3 className="h4 mb-1">INVOICE</h3>
              <p className="mb-1"><strong>Invoice #:</strong> {order.id}</p>
              <p className="mb-1"><strong>Date:</strong> {order.orderDate.toLocaleDateString()}</p>
              <p className="mb-0"><strong>Payment Method:</strong> {order.paymentMethod}</p>
            </div>
          </div>

          {/* Customer Info */}
          <Row className="mb-5">
            <Col md={6}>
              <h5 className="mb-3">Bill To:</h5>
              <p className="mb-1"><strong>{order.customerInfo.name}</strong></p>
              <p className="mb-1">{order.customerInfo.email}</p>
              <p className="mb-1">{order.customerInfo.phone}</p>
              <p className="mb-1">{order.customerInfo.address}</p>
              <p className="mb-0">{order.customerInfo.city}, {order.customerInfo.zipCode}</p>
            </Col>
            <Col md={6}>
              <h5 className="mb-3">Ship To:</h5>
              <p className="mb-1"><strong>{order.customerInfo.name}</strong></p>
              <p className="mb-1">{order.customerInfo.address}</p>
              <p className="mb-0">{order.customerInfo.city}, {order.customerInfo.zipCode}</p>
            </Col>
          </Row>

          {/* Order Items */}
          <div className="mb-4">
            <h5 className="mb-3">Order Details:</h5>
            <Table responsive className="border">
              <thead className="bg-light">
                <tr>
                  <th>Item</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Unit Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="rounded me-3"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="mb-0">{item.product.name}</h6>
                          <small className="text-muted">{item.product.category}</small>
                        </div>
                      </div>
                    </td>
                    <td>{item.size}</td>
                    <td>{item.color}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">${item.product.price.toFixed(2)}</td>
                    <td className="text-end">${(item.product.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Totals */}
          <Row>
            <Col md={6}></Col>
            <Col md={6}>
              <Table borderless className="mb-0">
                <tbody>
                  <tr>
                    <td className="text-end"><strong>Subtotal:</strong></td>
                    <td className="text-end">${order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="text-end"><strong>Shipping:</strong></td>
                    <td className="text-end">
                      {order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) > 75 
                        ? 'FREE' 
                        : '$9.99'
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end"><strong>Tax (8%):</strong></td>
                    <td className="text-end">
                      ${(order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 0.08).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-top">
                    <td className="text-end"><h5><strong>Total:</strong></h5></td>
                    <td className="text-end"><h5><strong>${order.total.toFixed(2)}</strong></h5></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Footer */}
          <hr className="my-4" />
          <div className="row">
            <div className="col-md-6">
              <h6>Thank you for your business!</h6>
              <p className="small text-muted mb-0">
                If you have any questions about this invoice, please contact us at support@stylehub.com
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <h6>Delivery Information</h6>
              <p className="small text-muted mb-0">
                Estimated delivery: 3-5 business days<br />
                Tracking information will be sent to your email
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Navigation */}
      <div className="text-center mt-4 d-print-none">
        <Button variant="outline-secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={16} className="me-2" />
          Back to Shop
        </Button>
      </div>
    </Container>
  );
};

export default InvoicePage;