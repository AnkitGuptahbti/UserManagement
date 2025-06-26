import { useState } from "react";
import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateEmail } from "../utils/validators";

export default function Form({
  initialName = "",
  initialEmail = "",
  gender: initialGender = "male",
  isAdmin: initialIsAdmin = false,
  role: initialRole = "user",
  bio: initialBio = "",
  dob: initialDob = "",
  image: initialImage = "",
  onSubmit,
  buttonText = "Add User",
}) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialImage);

  const { values, errors, handleChange, handleSubmit, setValues } = useForm({
    config: {
      name: {
        required: true,
        label: "Name",
        validate: (val) =>
          val.length < 3 ? "Name must be at least 3 characters" : null,
      },
      email: {
        required: true,
        label: "Email",
        validate: (val) => (!validateEmail(val) ? "Invalid email" : null),
      },
      password: {
        required: true,
        label: "Password",
        validate: (val) => (val.length < 6 ? "Min 6 characters" : null),
      },
      dob: { required: true, label: "Date of Birth" },
    },
    initialValues: {
      name: initialName,
      email: initialEmail,
      password: "",
      gender: initialGender,
      isAdmin: initialIsAdmin,
      role: initialRole,
      bio: initialBio,
      dob: initialDob,
    },
    onSubmit: (data) => {
      onSubmit({
        ...data,
        image: imagePreview,
      });
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-15 h-15 object-cover rounded-full"
        />
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        className="w-full border p-2 rounded"
      />

      <Input
        name="name"
        label="Full Name"
        value={values.name}
        onChange={handleChange("name")}
        placeholder="Enter your name"
        error={errors.name}
      />

      <Input
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange("email")}
        placeholder="Enter your email"
        error={errors.email}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        value={values.password}
        onChange={handleChange("password")}
        placeholder="Enter password"
        error={errors.password}
      />

      {/* Gender */}
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            value="male"
            name="gender"
            checked={values.gender === "male"}
            onChange={() => setValues((prev) => ({ ...prev, gender: "male" }))}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            name="gender"
            checked={values.gender === "female"}
            onChange={() =>
              setValues((prev) => ({ ...prev, gender: "female" }))
            }
          />{" "}
          Female
        </label>
      </div>

      {/* Role */}
      <select
        value={values.role}
        onChange={handleChange("role")}
        className="w-full border p-2 rounded"
      >
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      {/* Is Admin */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={values.isAdmin}
          onChange={handleChange("isAdmin")}
        />
        Is Admin
      </label>

      <Input
        name="dob"
        label="Date of Birth"
        type="date"
        value={values.dob}
        onChange={handleChange("dob")}
        error={errors.dob}
      />

      <textarea
        rows={3}
        value={values.bio}
        onChange={handleChange("bio")}
        placeholder="Short Bio"
        className="w-full border p-2 rounded"
      />

      <Button
        className="bg-blue-600 text-white px-2 py-1 rounded"
        htmlType="submit"
      >
        {buttonText}
      </Button>
    </form>
  );
}
