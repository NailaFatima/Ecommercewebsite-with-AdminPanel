import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, 
  //Row,
 // Col,
  Navbar, 
  Nav, 
  Offcanvas, 
  Button, 
  Dropdown,
  Badge
} from 'react-bootstrap';
import { 
  Menu, 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  User
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { state, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: Home, label: 'Dashboard', permission: '*' },
    { path: '/admin/products', icon: Package, label: 'Products', permission: 'products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders', permission: 'orders' },
    { path: '/admin/customers', icon: Users, label: 'Customers', permission: 'customers' },
    { path: '/admin/transactions', icon: CreditCard, label: 'Transactions', permission: 'transactions' },
    { path: '/admin/invoices', icon: FileText, label: 'Invoices', permission: 'invoices' },
    { path: '/admin/inventory', icon: Package, label: 'Inventory', permission: 'inventory' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics', permission: 'analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings', permission: 'settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
  };

  const SidebarContent = () => (
    <div className="h-100 d-flex flex-column">
      <div className="p-3 border-bottom">
        <h5 className="mb-0 text-primary fw-bold">StyleHub Admin</h5>
        <small className="text-muted">Management Panel</small>
      </div>
      
      <Nav className="flex-column flex-grow-1 p-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Nav.Link
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setShowSidebar(false);
              }}
              className={`d-flex align-items-center py-2 px-3 mb-1 rounded ${
                isActiveRoute(item.path) ? 'bg-primary text-white' : 'text-dark'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <IconComponent size={18} className="me-3" />
              {item.label}
            </Nav.Link>
          );
        })}
      </Nav>
      
      <div className="p-3 border-top">
        <div className="d-flex align-items-center mb-2">
          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
               style={{ width: '32px', height: '32px' }}>
            <User size={16} className="text-white" />
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold small">{state.user?.username}</div>
            <div className="text-muted small">{state.user?.role.replace('_', ' ')}</div>
          </div>
        </div>
        <Button variant="outline-danger" size="sm" onClick={handleLogout} className="w-100">
          <LogOut size={14} className="me-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      {/* Top Navigation */}
      <Navbar bg="white" className="border-bottom shadow-sm">
        <Container fluid>
          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setShowSidebar(true)}
              className="d-lg-none me-2"
            >
              <Menu size={18} />
            </Button>
            <Navbar.Brand className="mb-0 h1 text-primary fw-bold">
              StyleHub Admin
            </Navbar.Brand>
          </div>
          
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-secondary" size="sm" className="position-relative">
              <Bell size={16} />
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                3
              </Badge>
            </Button>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center">
                <User size={16} className="me-2" />
                {state.user?.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/admin/profile')}>
                  Profile Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <LogOut size={14} className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      <div className="d-flex">
        {/* Desktop Sidebar */}
        <div className="d-none d-lg-block bg-light border-end" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <SidebarContent />
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <div className="flex-grow-1" style={{ minHeight: 'calc(100vh - 56px)' }}>
          <Container fluid className="p-4">
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;