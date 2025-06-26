import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

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
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [gender, setGender] = useState(initialGender);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [role, setRole] = useState(initialRole);
  const [bio, setBio] = useState(initialBio);
  const [dob, setDob] = useState(initialDob);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialImage);
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const formData = {
      name,
      email,
      password,
      gender,
      isAdmin,
      role,
      bio,
      dob,
      image: imagePreview,
    };
    onSubmit(formData);
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
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors((prev) => ({ ...prev, name: "" }));
        }}
        placeholder="Enter your name"
        error={errors.name}
      />

      <Input
        name="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        placeholder="Enter your email"
        error={errors.email}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
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
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            name="gender"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />{" "}
          Female
        </label>
      </div>

      {/* Role */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
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
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Is Admin
      </label>

      <Input
        name="dob"
        label="Date of Birth"
        type="date"
        value={dob}
        onChange={(e) => {
          setDob(e.target.value);
          setErrors((prev) => ({ ...prev, dob: "" }));
        }}
        error={errors.dob}
      />

      <textarea
        rows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Short Bio"
        className="w-full border p-2 rounded"
      />

      <Button type="submit">{buttonText}</Button>
      
    </form>
  );
}
