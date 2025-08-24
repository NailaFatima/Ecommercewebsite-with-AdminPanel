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
  UserX, 
  UserCheck,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { mockCustomers } from '../../data/adminData';
import { Customer } from '../../types/admin';

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    return matchesSearch;
  });

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const toggleCustomerStatus = (customerId: string) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId
        ? { ...customer, isActive: !customer.isActive }
        : customer
    ));
  };

  const CustomerDetailsModal: React.FC<{
    show: boolean;
    onHide: () => void;
    customer: Customer | null;
  }> = ({ show, onHide, customer }) => {
    if (!customer) return null;

    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Customer Details - {customer.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6>Personal Information</h6>
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <strong className="me-2">Name:</strong> {customer.name}
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Mail size={16} className="me-2" />
                  <strong className="me-2">Email:</strong> {customer.email}
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Phone size={16} className="me-2" />
                  <strong className="me-2">Phone:</strong> {customer.phone}
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Calendar size={16} className="me-2" />
                  <strong className="me-2">Registered:</strong> {customer.registrationDate.toLocaleDateString()}
                </div>
              </div>

              <h6>Account Status</h6>
              <Badge bg={customer.isActive ? 'success' : 'danger'} className="mb-3">
                {customer.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Col>
            <Col md={6}>
              <h6>Order Statistics</h6>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Orders:</span>
                  <strong>{customer.totalOrders}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Spent:</span>
                  <strong>${customer.totalSpent.toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Average Order Value:</span>
                  <strong>${(customer.totalSpent / customer.totalOrders).toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Last Order:</span>
                  <strong>
                    {customer.lastOrderDate ? customer.lastOrderDate.toLocaleDateString() : 'Never'}
                  </strong>
                </div>
              </div>

              <h6>Customer Tier</h6>
              <Badge bg={
                customer.totalSpent > 500 ? 'warning' :
                customer.totalSpent > 200 ? 'info' : 'secondary'
              }>
                {customer.totalSpent > 500 ? 'Gold' :
                 customer.totalSpent > 200 ? 'Silver' : 'Bronze'}
              </Badge>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-2">
            <Button
              variant={customer.isActive ? 'outline-danger' : 'outline-success'}
              size="sm"
              onClick={() => {
                toggleCustomerStatus(customer.id);
                onHide();
              }}
            >
              {customer.isActive ? (
                <>
                  <UserX size={14} className="me-2" />
                  Deactivate
                </>
              ) : (
                <>
                  <UserCheck size={14} className="me-2" />
                  Activate
                </>
              )}
            </Button>
            <Button variant="outline-primary" size="sm">
              <Mail size={14} className="me-2" />
              Send Email
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
          <h1 className="h3 mb-1">Customer Management</h1>
          <p className="text-muted mb-0">Manage customer accounts and relationships</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary">
            Export Customers
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{customers.length}</h3>
              <p className="text-muted mb-0">Total Customers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{customers.filter(c => c.isActive).length}</h3>
              <p className="text-muted mb-0">Active Customers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">
                ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(0)}
              </h3>
              <p className="text-muted mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">
                ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(0)}
              </h3>
              <p className="text-muted mb-0">Avg. Customer Value</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Button variant="outline-secondary" className="w-100">
                <Filter size={16} className="me-2" />
                Advanced Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Customers Table */}
      <Card>
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div>
                      <div className="fw-semibold">{customer.name}</div>
                      <small className="text-muted">ID: {customer.id}</small>
                    </div>
                  </td>
                  <td>
                    <div>{customer.email}</div>
                    <small className="text-muted">{customer.phone}</small>
                  </td>
                  <td>{customer.totalOrders}</td>
                  <td>${customer.totalSpent.toFixed(2)}</td>
                  <td>
                    {customer.lastOrderDate ? customer.lastOrderDate.toLocaleDateString() : 'Never'}
                  </td>
                  <td>
                    <Badge bg={customer.isActive ? 'success' : 'danger'}>
                      {customer.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        variant={customer.isActive ? 'outline-danger' : 'outline-success'}
                        size="sm"
                        onClick={() => toggleCustomerStatus(customer.id)}
                      >
                        {customer.isActive ? <UserX size={14} /> : <UserCheck size={14} />}
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <Mail size={14} />
                      </Button>
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

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        show={!!selectedCustomer}
        onHide={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CustomerManagement;