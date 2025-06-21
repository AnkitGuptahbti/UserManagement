import { useState } from "react";

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
    // else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email))
    //   newErrors.email = "Invalid email format";
    if (!dob) newErrors.dob = "Date of birth is required";
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
          className="w-15 h-15 object-cover "
        />
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        value={name}
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Is Admin
      </label>

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="w-full border p-2 rounded"
      />
      {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

      <textarea
        rows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Short Bio"
        className="w-full border p-2 rounded"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}
