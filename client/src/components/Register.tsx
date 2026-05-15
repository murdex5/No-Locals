import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_PATH = import.meta.env.VITE_API_PATH;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_PATH}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullName, email, password }),
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.error || `Server Error: ${response.status}`);
      }
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input type="text" id="username" placeholder="username" />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input type="text" id="firstName" placeholder="First Name" />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input type="email" id="email" placeholder="Email" />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input type="password" id="password" placeholder="Password" />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="mb-4">
          <button
            className="bg-black hover:bg-yellow-500 text-white hover:text-black font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors delay-20 duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
