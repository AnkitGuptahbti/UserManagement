import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { navLinks } from "../utils/constants";
import { Row, Col, Dropdown, Menu } from "antd";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu className="bg-white text-black w-40 rounded shadow-lg z-10">
      {user ? (
        <>
          <Menu.Item key="profile">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login">
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );

  const menuItems = [
    {
      key: 'profile',
      label: <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>,
    },
    {
      key: 'settings',
      label: <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>,
    },
    {
      key: 'logout',
      label: <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>,
    },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <Row className="container mx-auto" justify="space-between" align="middle">
        <Col>
          <Link
            to="/"
            className="text-xl font-bold text-blue-400 hover:text-blue-300"
          >
            User Management
          </Link>
        </Col>
        <Col>
          <Row align="middle" gutter={24} className="gap-6">
            {navLinks.map((link) => (
              <Col key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-blue-300 transition duration-200"
                >
                  {link.label}
                </Link>
              </Col>
            ))}
            {/* Account dropdown */}
            <Col>
              <Dropdown menu={{ items: menuItems }} trigger={["hover"]} placement="bottomRight">
                <button className="hover:text-blue-300 focus:outline-none">
                  Account ▾
                </button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </nav>
  );
}
