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
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Upload,
  Download
} from 'lucide-react';
import { mockProducts } from '../../data/adminData';
import { AdminProduct } from '../../types/admin';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const categories = ['T-Shirts', 'Jeans', 'Shirts', 'Hoodies', 'Dresses', 'Shorts'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const toggleProductStatus = (productId: string) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, isActive: !product.isActive }
        : product
    ));
  };

  const deleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const ProductModal: React.FC<{ 
    show: boolean; 
    onHide: () => void; 
    product?: AdminProduct | null;
  }> = ({ show, onHide, product }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      price: product?.price || 0,
      originalPrice: product?.originalPrice || 0,
      category: product?.category || '',
      description: product?.description || '',
      stock: product?.stock || 0,
      lowStockThreshold: product?.lowStockThreshold || 10,
      sizes: product?.sizes || [],
      colors: product?.colors || [],
      features: product?.features || [],
      isActive: product?.isActive ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      onHide();
    };

    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{product ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Original Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value)})}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Low Stock Threshold</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({...formData, lowStockThreshold: parseInt(e.target.value)})}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active Product"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Product Management</h1>
          <p className="text-muted mb-0">Manage your product catalog</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary">
            <Upload size={16} className="me-2" />
            Bulk Import
          </Button>
          <Button variant="outline-secondary">
            <Download size={16} className="me-2" />
            Export
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="me-2" />
            Add Product
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Button variant="outline-secondary" className="w-100">
                <Filter size={16} className="me-2" />
                More Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Products Table */}
      <Card>
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="rounded me-3"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div>
                        <div className="fw-semibold">{product.name}</div>
                        <small className="text-muted">ID: {product.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <div>${product.price}</div>
                    {product.originalPrice && (
                      <small className="text-muted text-decoration-line-through">
                        ${product.originalPrice}
                      </small>
                    )}
                  </td>
                  <td>
                    <div className={product.stock <= product.lowStockThreshold ? 'text-warning' : ''}>
                      {product.stock}
                    </div>
                    {product.stock <= product.lowStockThreshold && (
                      <Badge bg="warning" className="small">Low Stock</Badge>
                    )}
                  </td>
                  <td>
                    <Badge bg={product.isActive ? 'success' : 'secondary'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setEditingProduct(product)}>
                          <Edit size={14} className="me-2" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => toggleProductStatus(product.id)}>
                          {product.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                          <span className="ms-2">
                            {product.isActive ? 'Deactivate' : 'Activate'}
                          </span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => deleteProduct(product.id)}
                          className="text-danger"
                        >
                          <Trash2 size={14} className="me-2" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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

      {/* Modals */}
      <ProductModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
      
      <ProductModal
        show={!!editingProduct}
        onHide={() => setEditingProduct(null)}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductManagement;