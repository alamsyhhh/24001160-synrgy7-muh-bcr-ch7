import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../utils/localStorageUtils';
import Search from '../../components/Admin/searchCarComponent';

interface DashboardProps {
  activePage: 'dashboard' | 'cars';
  content: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ activePage, content }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const user = getItemFromLocalStorage('user');

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/signIn');
  };

  const navbarClass = `l-navbar ${isNavOpen ? 'showw' : ''}`;
  const headerClass = `header ${isNavOpen ? 'body-pd' : ''}`;
  const bodyClass = `content height-100 ${isNavOpen ? 'body-pd' : ''}`;
  const navClass = `nav ${isNavOpen ? 'showw' : ''}`;
  const toggleIconClass = `bx ${isNavOpen ? 'bx-x' : 'bx-menu'}`;

  return (
    <div>
      <header className={headerClass} id="header">
        <div className="header_toggle" onClick={toggleNavbar}>
          <i className={toggleIconClass} id="header-toggle"></i>
        </div>
        <div className="header_right">
          <Search
            onSearch={(value) => {
              navigate(`/cardashboard?name=${value}`);
            }}
          />
          <div className="header_profile">
            <img src="img/avatar-illustrated-02.png" alt="" />
            <div className="profile_info">
              <span className="profile_name">{user?.username}</span>
              <span className="profile_role">{user?.role}</span>
            </div>
          </div>
        </div>
      </header>

      <div className={navbarClass} id="nav-bar">
        <nav className={navClass}>
          <div>
            <Link to="/dashboard" className="nav_logo">
              <img src="img/Rectangle63.png" alt="" />
              <span className="nav_logo-name">BCR</span>
            </Link>
            <div className="nav_list">
              <Link
                to="/dashboard"
                className={`nav_link ${
                  activePage === 'dashboard' ? 'active' : ''
                }`}
              >
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </Link>
              <Link to="#" className="nav_link">
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Users</span>
              </Link>
              <Link
                to="/cardashboard"
                className={`nav_link ${activePage === 'cars' ? 'active' : ''}`}
              >
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Cars</span>
              </Link>
            </div>
          </div>
          <Link to="/" className="nav_link" onClick={handleSignOut}>
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </Link>
        </nav>
      </div>

      <div className={bodyClass}>{content}</div>
    </div>
  );
};

export default Dashboard;
