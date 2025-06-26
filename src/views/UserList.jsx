import { Link } from "react-router-dom";
import { Table, Avatar, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export default function UserList({ users, onDelete }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, user) => (
        <div className="flex items-center gap-2">
          <Avatar src={user.image || "https://via.placeholder.com/40"} />
          <span className="font-medium">{user.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <span className="capitalize">{role}</span>,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "",
      key: "actions",
      render: (_, user) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit">
              <Link to={`/user/edit/${user.id}`}>Edit</Link>
            </Menu.Item>
            <Menu.Item key="delete" danger onClick={() => onDelete(user.id)}>
              Delete
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <MoreOutlined className="cursor-pointer text-gray-600 hover:text-black" />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        // pagination={true}
        pagination={{ pageSize: 10 }}
        bordered
        size="small"
      />
    </div>
  );
}
