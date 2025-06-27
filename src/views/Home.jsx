import { Row, Col, Typography, Button, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import UserList from "./users/UserList";
import Main from "../layouts/Main";

const { Title } = Typography;

export default function Home() {
  const { users, loading, removeUser } = useUser();

  return (
    <Main>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Row
            justify="space-between"
            align="middle"
            style={{ margin: "1rem 0", border: "1px solid #ddd", padding: "8px" }}
          > 
            <Col>
              <Title level={4} style={{ margin: 0 }}>
                Users
              </Title>
            </Col>
            <Col>
              <Link to="/users/new">
                <Button type="primary">+ Add User</Button>
              </Link>
            </Col>
          </Row>

          {loading ? (
            <Row justify="center" style={{ marginTop: "2rem" }}>
              <Spin tip="Loading users..." />
            </Row>
          ) : (
            <UserList users={users} onDelete={removeUser} />
          )}
        </Col>
      </Row>
    </Main>
  );
}
