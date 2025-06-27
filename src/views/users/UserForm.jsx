import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { validateEmail } from "../../utils/validators";
import { Card, Col, Row, Typography } from "antd";

import FormField from "../../components/FormField";
import MainLayout from "../../layouts/Main";
import useUser from "../../hooks/useUser";
import Button from "../../components/Button";

export default function UserForm() {
  const { getUserBy_Id, editUser, addUser } = useUser();
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const isEdit = Boolean(userId);

  const config = [
    {
      key: "image",
      type: "image",
      label: "Profile Picture",
    },
    {
      key: "name",
      required: true,
      placeholder: "Enter your name",
      validate: (val) =>
        val.length < 3 ? "Name must be at least 3 characters" : null,
    },
    {
      key: "email",
      required: true,
      type: "email",
      placeholder: "Enter your email",
      validate: (val) => (!validateEmail(val) ? "Invalid email" : null),
    },
    {
      key: "password",
      required: !isEdit,
      type: "password",
      placeholder: isEdit
        ? "Leave blank to keep current password"
        : "Enter password",
      validate: (val) =>
        isEdit && !val ? null : val.length < 6 ? "Min 6 characters" : null,
    },
    { key: "dob", required: true, type: "date" },
    {
      key: "gender",
      type: "radio",
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      key: "role",
      type: "select",
      options: [
        { label: "User", value: "user" },
        { label: "Manager", value: "manager" },
        { label: "Admin", value: "admin" },
      ],
    },
    {
      key: "isAdmin",
      type: "checkbox",
      label: "Is Admin",
    },
    {
      key: "bio",
      type: "textarea",
      placeholder: "Short Bio",
    },
  ];

  const defaultInitialValues = {
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "male",
    isAdmin: false,
    role: "user",
    bio: "",
    image: "",
  };

  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const { values, errors, handleChange, handleSubmit, setValues } = useForm({
    config,
    initialValues,
    onSubmit: async (formData) => {
      if (isEdit) {
        await editUser(userId, formData);
      } else {
        await addUser(formData);
      }
      navigate("/");
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserBy_Id(userId);
        const populated = {
          ...defaultInitialValues,
          ...data,
          password: "",
        };
        setInitialValues(populated);
        setValues(populated);
      } catch (err) {
        console.error("Error fetching user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card>
            <Typography.Title level={2}>
              {isEdit ? "Edit User" : "Add New User"}
            </Typography.Title>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {config.map((field) => (
                <FormField
                  key={field.key}
                  field={field}
                  value={values[field.key]}
                  onChange={handleChange(field.key)}
                  error={errors[field.key]}
                />
              ))}

              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                htmlType="submit"
              >
                {isEdit ? "Update User" : "Create User"}
              </Button>
            </form>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
}
