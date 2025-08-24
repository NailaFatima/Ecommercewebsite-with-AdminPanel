import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Form, 
  Badge, 
  Modal,
  InputGroup,
  Pagination,
  Dropdown
} from 'react-bootstrap';
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  Truck,
  Package,
  CheckCircle
} from 'lucide-react';
import { mockOrders } from '../../data/adminData';
import { AdminOrder } from '../../types/admin';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const updateOrderStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: newStatus, updatedAt: new Date() }
        : order
    ));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const OrderDetailsModal: React.FC<{
    show: boolean;
    onHide: () => void;
    order: AdminOrder | null;
  }> = ({ show, onHide, order }) => {
    if (!order) return null;

    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {order.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6>Customer Information</h6>
              <p className="mb-1"><strong>Name:</strong> {order.customerName}</p>
              <p className="mb-1"><strong>Email:</strong> {order.customerEmail}</p>
              <p className="mb-1"><strong>Phone:</strong> {order.shippingAddress.phone}</p>
              
              <h6 className="mt-4">Shipping Address</h6>
              <p className="mb-1">{order.shippingAddress.name}</p>
              <p className="mb-1">{order.shippingAddress.address}</p>
              <p className="mb-1">{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
            </Col>
            <Col md={6}>
              <h6>Order Information</h6>
              <p className="mb-1"><strong>Order Date:</strong> {order.orderDate.toLocaleDateString()}</p>
              <p className="mb-1"><strong>Status:</strong> 
                <Badge bg={getStatusBadgeVariant(order.status)} className="ms-2">
                  {order.status}
                </Badge>
              </p>
              <p className="mb-1"><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p className="mb-1"><strong>Payment Status:</strong> 
                <Badge bg={order.paymentStatus === 'completed' ? 'success' : 'warning'} className="ms-2">
                  {order.paymentStatus}
                </Badge>
              </p>
            </Col>
          </Row>

          <h6 className="mt-4">Order Items</h6>
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="rounded me-2"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      {item.productName}
                    </div>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.color}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end mt-3">
            <h5><strong>Total: ${order.total.toFixed(2)}</strong></h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-2">
            <Dropdown>
              <Dropdown.Toggle variant="primary" size="sm">
                Update Status
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {statusOptions.map(status => (
                  <Dropdown.Item
                    key={status}
                    onClick={() => {
                      updateOrderStatus(order.id, status as AdminOrder['status']);
                      onHide();
                    }}
                    disabled={order.status === status}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="outline-primary" size="sm">
              <Download size={14} className="me-2" />
              Download Invoice
            </Button>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Order Management</h1>
          <p className="text-muted mb-0">Track and manage customer orders</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary">
            <Download size={16} className="me-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search orders by ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Button variant="outline-secondary" className="w-100">
                <Filter size={16} className="me-2" />
                Date Range
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Orders Table */}
      <Card>
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-semibold">{order.id}</td>
                  <td>
                    <div>{order.customerName}</div>
                    <small className="text-muted">{order.customerEmail}</small>
                  </td>
                  <td>{order.items.length} item(s)</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <Badge bg={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={order.paymentStatus === 'completed' ? 'success' : 'warning'}>
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td>{order.orderDate.toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={14} />
                      </Button>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                          <Package size={14} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => updateOrderStatus(order.id, 'processing')}>
                            <Package size={14} className="me-2" />
                            Mark Processing
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => updateOrderStatus(order.id, 'shipped')}>
                            <Truck size={14} className="me-2" />
                            Mark Shipped
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => updateOrderStatus(order.id, 'delivered')}>
                            <CheckCircle size={14} className="me-2" />
                            Mark Delivered
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
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

      {/* Order Details Modal */}
      <OrderDetailsModal
        show={!!selectedOrder}
        onHide={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderManagement;