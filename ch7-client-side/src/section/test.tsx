import React, { useState } from 'react';
// import './index.css';

const Dashboard: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navbarClass = `l-navbar ${isNavOpen ? 'show' : ''}`;
  const headerClass = `header ${isNavOpen ? 'body-pd' : ''}`;
  const bodyClass = `content height-100 ${isNavOpen ? 'body-pd' : ''}`;
  const navClass = `nav ${isNavOpen ? 'show' : ''}`;
  const toggleIconClass = `bx ${isNavOpen ? 'bx-x' : 'bx-menu'}`;

  return (
    <div>
      <header className={headerClass} id="header">
        <div className="header_toggle" onClick={toggleNavbar}>
          <i className={toggleIconClass} id="header-toggle"></i>
        </div>
        <div className="header_right">
          <form className="header_search">
            <input
              className="header_search_input"
              type="text"
              placeholder="Search..."
            />
            <button className="header_search_button" type="submit">
              <i className="bx bx-search"></i>
            </button>
          </form>
          <div className="header_profile">
            <img src="img/avatar-illustrated-02.png" alt="" />
            <div className="profile_info">
              <span className="profile_name">John Doe</span>
              <span className="profile_role">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className={navbarClass} id="nav-bar">
        <nav className={navClass}>
          <div>
            <a href="index.html" className="nav_logo">
              <img src="img/Rectangle63.png" alt="" />
              <span className="nav_logo-name">BCR</span>
            </a>
            <div className="nav_list">
              <a href="index.html" className="nav_link">
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </a>
              <a href="user.html" className="nav_link active">
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Users</span>
              </a>
              <a href="cars.html" className="nav_link">
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Cars</span>
              </a>
            </div>
          </div>
          <a href="#" className="nav_link">
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>

      <div className={bodyClass}>
        <h4>User Components</h4>
      </div>
    </div>
  );
};

export default Dashboard;
