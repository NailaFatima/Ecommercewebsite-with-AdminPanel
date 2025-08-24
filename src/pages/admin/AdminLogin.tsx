import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <Lock size={24} className="text-white" />
                  </div>
                  <h2 className="h4 mb-1">Admin Login</h2>
                  <p className="text-muted">Sign in to your admin account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                        className="ps-5"
                      />
                      <User size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="ps-5 pe-5"
                      />
                      <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <Button
                        variant="link"
                        className="position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="mt-4 pt-4 border-top">
                  <div className="text-center">
                    <small className="text-muted">Demo Credentials:</small>
                    <div className="mt-2">
                      <small className="d-block"><strong>Super Admin:</strong> admin / admin123</small>
                      <small className="d-block"><strong>Manager:</strong> manager / manager123</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;