import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerBarber } from "../../services/barberService";

// Icons (you can replace these with your preferred icon library)
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ShopIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    barberName: "",
    email: "",
    phone: "",
    password: "",
    salonName: "",
    latitude: "",
    longitude: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation helper functions
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "barberName":
        if (!value.trim()) {
          error = "Barber name is required";
        } else if (value.trim().length < 5) {
          error = "Name must be at least 5 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = "Name can only contain letters and spaces";
        }
        break;
        
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
        
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(value.replace(/[\s\-\(\)]/g, ""))) {
          error = "Please enter a valid phone number (10 digits only)";
        }
        break;
        
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        break;
        
      case "salonName":
        if (!value.trim()) {
          error = "Salon name is required";
        } else if (value.trim().length < 2) {
          error = "Salon name must be at least 2 characters";
        }
        break;
        
      case "latitude":
        if (value && (isNaN(value) || parseFloat(value) < -90 || parseFloat(value) > 90)) {
          error = "Latitude must be between -90 and 90";
        }
        break;
        
      case "longitude":
        if (value && (isNaN(value) || parseFloat(value) < -180 || parseFloat(value) > 180)) {
          error = "Longitude must be between -180 and 180";
        }
        break;
        
      case "image":
        if (value && !value.type.startsWith("image/")) {
          error = "Please select a valid image file";
        } else if (value && value.size > 5 * 1024 * 1024) {
          error = "Image file size must be less than 5MB";
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Update form data
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (name === "phone") {
      // Filter phone input to only allow digits
      const filteredValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: filteredValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Validate field and update errors
    const error = validateField(name, name === "image" ? files[0] : (name === "phone" ? value.replace(/[^0-9]/g, "") : value));
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name, value, files } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field on blur
    const error = validateField(name, name === "image" ? files[0] : value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouched({
      barberName: true,
      email: true,
      phone: true,
      password: true,
      salonName: true,
      latitude: true,
      longitude: true,
      image: true,
    });
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setMessage("❌ Please fix the validation errors before submitting.");
      return;
    }
    
    setLoading(true);
    setMessage("");

    try {
      const response = await registerBarber(formData);
      if (response.success) {
        setMessage(`✅ ${response.message || "Registration successful!"}`);
        // Reset form after successful registration
        setFormData({
          barberName: "",
          email: "",
          phone: "",
          password: "",
          salonName: "",
          latitude: "",
          longitude: "",
          image: null,
        });
        setErrors({});
        setTouched({});
      }
    } catch (error) {
      // console.error("Error:", error);
      if (error.response?.status === 400) {
        setMessage("⚠️ Barber already exists with this email or phone.");
      } else {
        setMessage("❌ Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ... (rest of your JSX form)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">

      <div className="relative w-full max-w-3xl">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
              <UserIcon />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Create Barber Account</h1>
            <p className="text-purple-100 text-sm">Join our platform and start your barber journey</p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Barber Name */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Barber Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon />
                      </div>
                      <input
                        type="text"
                        name="barberName"
                        placeholder="Enter your full name"
                        value={formData.barberName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.barberName && touched.barberName
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50'
                            : !errors.barberName && touched.barberName && formData.barberName
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.barberName && touched.barberName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.barberName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EmailIcon />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.email && touched.email
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50'
                            : !errors.email && touched.email && formData.email
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter 10-digit phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.phone && touched.phone
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50'
                            : !errors.phone && touched.phone && formData.phone
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon />
                      </div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.password && touched.password
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50'
                            : !errors.password && touched.password && formData.password
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password}
                      </p>
                    )}
                    {!errors.password && touched.password && formData.password && (
                      <p className="text-green-600 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Password looks good!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Information Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1">
                  Business Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Salon Name */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Salon Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ShopIcon />
                      </div>
                      <input
                        type="text"
                        name="salonName"
                        placeholder="Enter your salon name"
                        value={formData.salonName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.salonName && touched.salonName
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50'
                            : !errors.salonName && touched.salonName && formData.salonName
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.salonName && touched.salonName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0  computed-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.salonName}
                      </p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      {/* Location Icon */}
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-3.866 0-7 3.134-7 7 0 2.761 4.239 7 7 7s7-4.239 7-7c0-3.866-3.134-7-7-7z"
                          />
                        </svg>
                      </div>
                                    
                      {/* Address Input */}
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your salon address"
                        value={formData.address}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s{2,}/g, " "); // removes extra spaces
                          setFormData((prev) => ({ ...prev, address: value }));
                        }}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.address && touched.address
                            ? "border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50"
                            : !errors.address && touched.address && formData.address
                            ? "border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50"
                            : "border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white"
                        }`}
                      />
                    </div>
                      
                    {/* Error Message */}
                    {errors.address && touched.address && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.address}
                      </p>
                    )}
                  </div>

                  

                  {/* Salon Image */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Salon Image
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon />
                      </div>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${
                          errors.image && touched.image
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50 file:bg-red-50 file:text-red-700'
                            : !errors.image && touched.image && formData.image
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50 file:bg-green-50 file:text-green-700'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100'
                        }`}
                      />
                    </div>
                    {errors.image && touched.image && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.image}
                      </p>
                    )}
                    {!errors.image && touched.image && formData.image && (
                      <p className="text-green-600 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Image selected successfully!
                      </p>
                    )}
                  </div>

                  {/* Latitude */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LocationIcon />
                      </div>
                      <input
                        type="number"
                        step="any"
                        name="latitude"
                        placeholder="Enter latitude coordinates"
                        value={formData.latitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.latitude && touched.latitude
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50'
                            : !errors.latitude && touched.latitude && formData.latitude
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.latitude && touched.latitude && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.latitude}
                      </p>
                    )}
                  </div>

                  {/* Longitude */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LocationIcon />
                      </div>
                      <input
                        type="number"
                        step="any"
                        name="longitude"
                        placeholder="Enter longitude coordinates"
                        value={formData.longitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                          errors.longitude && touched.longitude
                            ? 'border-red-300 focus:ring-red-500 bg-red-50 focus:bg-red-50'
                            : !errors.longitude && touched.longitude && formData.longitude
                            ? 'border-green-300 focus:ring-green-500 bg-green-50 focus:bg-green-50'
                            : 'border-gray-300 focus:ring-purple-500 bg-gray-50 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.longitude && touched.longitude && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.longitude}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || Object.keys(errors).some(key => errors[key])}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 "></div>
                      Creating Account...
                    </div>
                  ) : Object.keys(errors).some(key => errors[key]) ? (
                    "Please fix errors to continue"
                  ) : (
                    "Create Barber Account"
                  )}
                </button>
              </div>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-center font-medium text-sm ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : message.includes('⚠️')
                  ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/Dashboard")}
                  className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
