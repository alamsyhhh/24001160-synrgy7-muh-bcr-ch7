import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeaderSection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Sign In');
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userDataString && token) {
      setButtonLabel('Sign Out');
    } else {
      setButtonLabel('Sign In');
    }
  }, []);

  const handleButtonClick = () => {
    if (buttonLabel === 'Sign In') {
      navigate('/signIn');
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user) {
        setUsername(user.username);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowModal(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <header id="header">
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a href="/">
            <img
              src="https://res.cloudinary.com/dmuuypm2t/image/upload/v1710400256/logo_g0diue.png"
              alt=""
              className="fluid"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                BCR
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <div className="navbar-nav ms-auto">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="#our-services"
                >
                  Our Services
                </a>
                <a className="nav-link" href="#why-us">
                  Why Us
                </a>
                <a className="nav-link" href="#testimonial">
                  Testimonial
                </a>
                <a className="nav-link" href="#faq">
                  FAQ
                </a>
                <button className="btn btn-success" onClick={handleButtonClick}>
                  {buttonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout, {username ? username : 'User'}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default HeaderSection;
