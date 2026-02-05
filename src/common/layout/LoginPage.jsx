import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";
import { useToast } from "../utils/Toast";
import { FiMail, FiLock, FiLoader, FiX, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

/**
 * LoginPage Component
 * Handles user authentication with dummy API
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validate()) {
      showToast("Please fill in all required fields correctly", "error");
      return;
    }

    // Check if email and password are provided
    if (!formData.email || !formData.password) {
      showToast("Email and password are required", "error");
      return;
    }

    setLoading(true);

    try {
      // POST request to dummy API
      const response = await api.post("https://dummyapi.io/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Check if response status is 200
      if (response.status === 200) {
        // Handle successful login
        const userData = {
          token: response.data?.token || "dummy-jwt-token-123",
          user: response.data?.user || {
            name: response.data?.name || "Test User",
            email: response.data?.email || formData.email,
          },
          status: response.data?.status || "success",
        };

        // Save user data to localStorage
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("userData", JSON.stringify(userData.user));
        localStorage.setItem("isAuthenticated", "true");

        // Show success message
        showToast("Login successful!", "success", 2000);

        // Navigate to user dashboard after short delay
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 500);
      } else {
        showToast("Login failed. Please try again.", "error");
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 200) {
          // Sometimes API returns 200 in error response, handle it
          const userData = {
            token: error.response.data?.token || "dummy-jwt-token-123",
            user: error.response.data?.user || {
              name: "Test User",
              email: formData.email,
            },
            status: "success",
          };

          localStorage.setItem("authToken", userData.token);
          localStorage.setItem("userData", JSON.stringify(userData.user));
          localStorage.setItem("isAuthenticated", "true");

          showToast("Login successful!", "success", 2000);

          setTimeout(() => {
            navigate("/user/dashboard");
          }, 500);
        } else {
          const errorMessage =
            error.response.data?.message ||
            error.response.data?.error ||
            "Login failed. Please check your credentials.";
          showToast(errorMessage, "error");
        }
      } else if (error.request) {
        // Request was made but no response received
        // For dummy API testing, simulate success response
        console.log("Dummy API: Simulating successful login for testing");

        // Simulate successful login response as per requirements
        const userData = {
          token: "dummy-jwt-token-123",
          user: {
            name: "Test User",
            email: formData.email,
          },
          status: "success",
        };

        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("userData", JSON.stringify(userData.user));
        localStorage.setItem("isAuthenticated", "true");

        showToast("Login successful!", "success", 2000);

        setTimeout(() => {
          navigate("/user/dashboard");
        }, 500);
      } else {
        // Something else happened
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div
            className={`${
              toast.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}
          >
            <div className="text-xl">
              {toast.type === "error" ? <FiAlertCircle /> : <FiCheckCircle />}
            </div>
            <p className="flex-1 font-medium">{toast.message}</p>
            <button
              onClick={hideToast}
              className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <FiX className="text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="w-full max-w-md px-4">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100"
          >
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">BharatNaai Admin</h1>
              <p className="text-gray-500">Sign in to your account</p>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Demo: Use any email and password to test
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
