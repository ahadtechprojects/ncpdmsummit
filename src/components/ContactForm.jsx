import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Briefcase, Image as ImageIcon } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"; // ✅ no storage needed

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    photoFile: null,
    photo: null, // preview only
    photoBase64: "", // base64 string for Firestore
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = async (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm({
            ...form,
            photoFile: file,
            photo: URL.createObjectURL(file), // preview
            photoBase64: reader.result, // base64 string
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone Number is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.designation.trim())
      newErrors.designation = "Designation is required.";
    if (!form.photoFile) newErrors.photo = "Please upload a photo.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      // Save user data directly in Firestore (with base64 photo)
      const docRef = await addDoc(collection(db, "users"), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        designation: form.designation,
        photo: form.photoBase64, // ✅ storing base64 string instead of URL
        createdAt: new Date(),
      });

      navigate(`/qr/${docRef.id}`);
    } catch (error) {
      console.error("Error saving user:", error);
      setErrors({ submit: "Something went wrong. Try again." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-red-200"
    >
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
        Enter Your Details
      </h2>

      {/* Name */}
      <div>
        <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-red-500">
          <User className="text-red-500 mr-3" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-red-500">
          <Phone className="text-red-500 mr-3" size={20} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-red-500">
          <Mail className="text-red-500 mr-3" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Designation */}
      <div>
        <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-red-500">
          <Briefcase className="text-red-500 mr-3" size={20} />
          <input
            type="text"
            name="designation"
            placeholder="Designation / Role"
            value={form.designation}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>
        {errors.designation && (
          <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
        )}
      </div>

      {/* Photo Upload */}
      <div>
        <label className="flex items-center border rounded-lg p-3 cursor-pointer focus-within:ring-2 focus-within:ring-red-500">
          <ImageIcon className="text-red-500 mr-3" size={20} />
          <span className="text-gray-600">
            {form.photo ? "Photo Selected ✅" : "Upload Photo"}
          </span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
      >
        Generate QR Code
      </button>
      {errors.submit && (
        <p className="text-red-500 text-center">{errors.submit}</p>
      )}
    </form>
  );
}
