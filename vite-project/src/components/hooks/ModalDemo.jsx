import { useState, useEffect, useRef } from 'react';
import './Modal.css';

// Basic Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={`modal-content modal-${size}`} ref={modalRef}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <p>{message}</p>
      <div className="modal-actions">
        <button className="button secondary" onClick={onClose}>
          {cancelText}
        </button>
        <button className="button danger" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

// Form Modal
const FormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Form" size="medium">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            className="input"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button">
            Send Message
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Image Gallery Modal
const ImageModal = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev]);

  if (!isOpen || !images[currentIndex]) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Image ${currentIndex + 1} of ${images.length}`} size="large">
      <div className="image-gallery">
        <button className="gallery-nav gallery-prev" onClick={onPrev}>
          ‹
        </button>
        <img 
          src={images[currentIndex].url} 
          alt={images[currentIndex].alt}
          className="gallery-image"
        />
        <button className="gallery-nav gallery-next" onClick={onNext}>
          ›
        </button>
      </div>
      <div className="gallery-info">
        <p><strong>{images[currentIndex].title}</strong></p>
        <p>{images[currentIndex].description}</p>
      </div>
    </Modal>
  );
};

// Nested Modal Example
const NestedModal = ({ isOpen, onClose }) => {
  const [showInnerModal, setShowInnerModal] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Outer Modal" size="medium">
        <p>This is the outer modal. You can open another modal from here!</p>
        <button className="button" onClick={() => setShowInnerModal(true)}>
          Open Inner Modal
        </button>
        <div className="modal-actions">
          <button className="button secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={showInnerModal} 
        onClose={() => setShowInnerModal(false)} 
        title="Inner Modal" 
        size="small"
      >
        <p>This is a nested modal! It appears on top of the outer modal.</p>
        <div className="modal-actions">
          <button className="button" onClick={() => setShowInnerModal(false)}>
            Close Inner Modal
          </button>
        </div>
      </Modal>
    </>
  );
};

const ModalDemo = () => {
  const [basicModal, setBasicModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  const images = [
    {
      url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Beautiful Landscape',
      alt: 'Mountain landscape',
      description: 'A stunning mountain landscape with clear blue skies.'
    },
    {
      url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Ocean Waves',
      alt: 'Ocean waves',
      description: 'Peaceful ocean waves crashing on the shore.'
    },
    {
      url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Forest Path',
      alt: 'Forest path',
      description: 'A serene path through a lush green forest.'
    }
  ];

  const handleConfirm = () => {
    alert('Action confirmed!');
    setConfirmModal(false);
  };

  const handleFormSubmit = (formData) => {
    setMessages(prev => [...prev, formData]);
    setFormModal(false);
    alert('Message sent successfully!');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setImageModal(true);
  };

  return (
    <div className="demo-container">
      <h2 className="demo-title">Modal Components</h2>
      
      <div className="demo-description">
        <p><strong>Modals</strong> are overlay windows that appear on top of the main content. They're perfect for forms, confirmations, image galleries, and any content that needs focused user attention.</p>
      </div>

      <div className="code-block">
        {`const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};`}
      </div>

      <div className="grid">
        {/* Basic Modal */}
        <div className="demo-section">
          <h3>1. Basic Modal</h3>
          <button className="button" onClick={() => setBasicModal(true)}>
            Open Basic Modal
          </button>
          
          <Modal 
            isOpen={basicModal} 
            onClose={() => setBasicModal(false)} 
            title="Basic Modal"
          >
            <p>This is a basic modal with some content.</p>
            <p>You can close it by:</p>
            <ul>
              <li>Clicking the X button</li>
              <li>Pressing the Escape key</li>
              <li>Clicking outside the modal</li>
            </ul>
            <div className="modal-actions">
              <button className="button" onClick={() => setBasicModal(false)}>
                Close Modal
              </button>
            </div>
          </Modal>
        </div>

        {/* Confirmation Modal */}
        <div className="demo-section">
          <h3>2. Confirmation Modal</h3>
          <button className="button danger" onClick={() => setConfirmModal(true)}>
            Delete Item
          </button>
          
          <ConfirmModal
            isOpen={confirmModal}
            onClose={() => setConfirmModal(false)}
            onConfirm={handleConfirm}
            title="Confirm Deletion"
            message="Are you sure you want to delete this item? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
          />
        </div>

        {/* Form Modal */}
        <div className="demo-section">
          <h3>3. Form Modal</h3>
          <button className="button" onClick={() => setFormModal(true)}>
            Contact Us
          </button>
          
          <FormModal
            isOpen={formModal}
            onClose={() => setFormModal(false)}
            onSubmit={handleFormSubmit}
          />
          
          {messages.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Submitted Messages:</h4>
              {messages.map((msg, index) => (
                <div key={index} className="card">
                  <p><strong>{msg.name}</strong> ({msg.email})</p>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Gallery Modal */}
        <div className="demo-section">
          <h3>4. Image Gallery Modal</h3>
          <div className="image-thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className="thumbnail"
                onClick={() => openImageModal(index)}
              />
            ))}
          </div>
          <p><small>Click on any image to open the gallery modal</small></p>
          
          <ImageModal
            isOpen={imageModal}
            onClose={() => setImageModal(false)}
            images={images}
            currentIndex={currentImageIndex}
            onNext={nextImage}
            onPrev={prevImage}
          />
        </div>

        {/* Nested Modal */}
        <div className="demo-section">
          <h3>5. Nested Modals</h3>
          <button className="button" onClick={() => setNestedModal(true)}>
            Open Nested Modal
          </button>
          
          <NestedModal
            isOpen={nestedModal}
            onClose={() => setNestedModal(false)}
          />
        </div>

        {/* Modal Sizes */}
        <div className="demo-section">
          <h3>6. Different Modal Sizes</h3>
          <div className="flex">
            <button 
              className="button" 
              onClick={() => setBasicModal(true)}
            >
              Small Modal
            </button>
            <button 
              className="button secondary" 
              onClick={() => setFormModal(true)}
            >
              Medium Modal
            </button>
            <button 
              className="button" 
              onClick={() => setImageModal(true)}
            >
              Large Modal
            </button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Modal Best Practices</h3>
        <div className="grid">
          <div className="card">
            <h4>✅ Accessibility</h4>
            <ul>
              <li>Focus management (trap focus in modal)</li>
              <li>Keyboard navigation (Escape to close)</li>
              <li>ARIA labels and roles</li>
              <li>Screen reader announcements</li>
            </ul>
          </div>
          
          <div className="card">
            <h4>🎨 UX Guidelines</h4>
            <ul>
              <li>Clear close options (X, Escape, backdrop)</li>
              <li>Prevent body scrolling when open</li>
              <li>Smooth animations</li>
              <li>Appropriate sizing for content</li>
            </ul>
          </div>
          
          <div className="card">
            <h4>⚡ Performance</h4>
            <ul>
              <li>Lazy load modal content</li>
              <li>Portal rendering for z-index issues</li>
              <li>Cleanup event listeners</li>
              <li>Avoid too many nested modals</li>
            </ul>
          </div>
          
          <div className="card">
            <h4>🔧 Implementation</h4>
            <ul>
              <li>Use React Portals for complex apps</li>
              <li>State management for modal stack</li>
              <li>Custom hooks for modal logic</li>
              <li>Consistent styling system</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert info">
        <h4>Key Points:</h4>
        <ul>
          <li>Always provide multiple ways to close modals</li>
          <li>Prevent background scrolling when modal is open</li>
          <li>Use proper z-index stacking for nested modals</li>
          <li>Handle keyboard navigation and focus management</li>
          <li>Consider using React Portals for complex applications</li>
          <li>Clean up event listeners to prevent memory leaks</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalDemo;