import React from 'react';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Package,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockDashboardStats, mockSalesData, mockProducts, mockOrders } from '../../data/adminData';

const AdminDashboard: React.FC = () => {
  const stats = mockDashboardStats;
  const salesData = mockSalesData;
  const lowStockProducts = mockProducts.filter(p => p.stock <= p.lowStockThreshold);
  const recentOrders = mockOrders.slice(0, 5);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    trend?: { value: number; isPositive: boolean };
  }> = ({ title, value, icon: Icon, color, trend }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="text-muted mb-1 small">{title}</p>
            <h3 className="mb-0">{value}</h3>
            {trend && (
              <div className={`d-flex align-items-center mt-1 small ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
                {trend.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span className="ms-1">{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className={`rounded-circle d-flex align-items-center justify-content-center bg-${color}`}
               style={{ width: '48px', height: '48px' }}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Button variant="primary">
          View Reports
        </Button>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="success"
            trend={{ value: 12.5, isPositive: true }}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            color="primary"
            trend={{ value: 8.2, isPositive: true }}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={Users}
            color="info"
            trend={{ value: 15.3, isPositive: true }}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Total Sales"
            value={stats.totalSales}
            icon={TrendingUp}
            color="warning"
            trend={{ value: 3.1, isPositive: false }}
          />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        {/* Sales Chart */}
        <Col lg={8}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Sales Overview</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#0d6efd" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#198754" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col lg={4}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm">
                  <Package size={16} className="me-2" />
                  Add New Product
                </Button>
                <Button variant="outline-success" size="sm">
                  <ShoppingCart size={16} className="me-2" />
                  Process Orders
                </Button>
                <Button variant="outline-info" size="sm">
                  <Users size={16} className="me-2" />
                  Manage Customers
                </Button>
                <Button variant="outline-warning" size="sm">
                  <TrendingUp size={16} className="me-2" />
                  View Analytics
                </Button>
              </div>
              
              {/* Alerts */}
              <div className="mt-4">
                <h6 className="text-muted mb-3">Alerts</h6>
                <div className="d-flex align-items-center p-2 bg-warning bg-opacity-10 rounded mb-2">
                  <AlertTriangle size={16} className="text-warning me-2" />
                  <small>{stats.lowStockProducts} products low in stock</small>
                </div>
                <div className="d-flex align-items-center p-2 bg-info bg-opacity-10 rounded">
                  <ShoppingCart size={16} className="text-info me-2" />
                  <small>{stats.pendingOrders} orders pending</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Recent Orders */}
        <Col lg={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Button variant="outline-primary" size="sm">View All</Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-semibold">{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <Badge bg={
                          order.status === 'delivered' ? 'success' :
                          order.status === 'shipped' ? 'info' :
                          order.status === 'processing' ? 'warning' :
                          order.status === 'cancelled' ? 'danger' : 'secondary'
                        }>
                          {order.status}
                        </Badge>
                      </td>
                      <td>{order.orderDate.toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Low Stock Products */}
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Low Stock Alert</h5>
            </Card.Header>
            <Card.Body>
              {lowStockProducts.length === 0 ? (
                <p className="text-muted mb-0">All products are well stocked!</p>
              ) : (
                <div className="space-y-3">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="d-flex align-items-center justify-content-between p-2 bg-light rounded">
                      <div>
                        <div className="fw-semibold small">{product.name}</div>
                        <div className="text-muted small">Stock: {product.stock}</div>
                      </div>
                      <Badge bg="warning">Low</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;