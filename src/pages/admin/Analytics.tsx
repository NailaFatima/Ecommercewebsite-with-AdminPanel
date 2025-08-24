import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Calendar,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockSalesData, mockProducts } from '../../data/adminData';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7days');
  
  const salesData = mockSalesData;
  
  const topProducts = mockProducts
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)
    .map(product => ({
      name: product.name,
      sales: Math.floor(Math.random() * 100) + 20,
      revenue: Math.floor(Math.random() * 5000) + 1000
    }));

  const categoryData = [
    { name: 'T-Shirts', value: 35, color: '#0d6efd' },
    { name: 'Jeans', value: 25, color: '#198754' },
    { name: 'Shirts', value: 20, color: '#ffc107' },
    { name: 'Hoodies', value: 15, color: '#dc3545' },
    { name: 'Others', value: 5, color: '#6c757d' }
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    change: string;
    changeType: 'positive' | 'negative';
  }> = ({ title, value, icon: Icon, color, change, changeType }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="text-muted mb-1 small">{title}</p>
            <h3 className="mb-0">{value}</h3>
            <small className={`text-${changeType === 'positive' ? 'success' : 'danger'}`}>
              {change} from last period
            </small>
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
          <h1 className="h3 mb-1">Analytics & Reports</h1>
          <p className="text-muted mb-0">Track your business performance and insights</p>
        </div>
        <div className="d-flex gap-2">
          <Form.Select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </Form.Select>
          <Button variant="outline-primary">
            <Download size={16} className="me-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <StatCard
            title="Total Revenue"
            value="$24,580"
            icon={DollarSign}
            color="success"
            change="+12.5%"
            changeType="positive"
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Total Orders"
            value="1,247"
            icon={ShoppingCart}
            color="primary"
            change="+8.2%"
            changeType="positive"
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="New Customers"
            value="89"
            icon={Users}
            color="info"
            change="+15.3%"
            changeType="positive"
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            icon={TrendingUp}
            color="warning"
            change="-2.1%"
            changeType="negative"
          />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        {/* Sales Trend */}
        <Col lg={8}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Sales Trend</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0d6efd" 
                    strokeWidth={3}
                    name="Revenue ($)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#198754" 
                    strokeWidth={3}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Category Distribution */}
        <Col lg={4}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Sales by Category</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Top Products */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Top Selling Products</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#0d6efd" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Revenue by Products */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Revenue by Products</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#198754" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Insights */}
      <Row className="g-4 mt-4">
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">Customer Insights</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Returning Customers:</span>
                <strong>68%</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Average Order Value:</span>
                <strong>$89.50</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Customer Lifetime Value:</span>
                <strong>$245.80</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Churn Rate:</span>
                <strong>12%</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">Inventory Insights</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Products:</span>
                <strong>156</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Low Stock Items:</span>
                <strong className="text-warning">8</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Out of Stock:</span>
                <strong className="text-danger">3</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Inventory Turnover:</span>
                <strong>4.2x</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">Performance Metrics</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Gross Margin:</span>
                <strong>45%</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Return Rate:</span>
                <strong>2.8%</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Fulfillment Rate:</span>
                <strong>98.5%</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Customer Satisfaction:</span>
                <strong>4.6/5</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;