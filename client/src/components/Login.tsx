import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_PATH = import.meta.env.VITE_API_PATH;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const naviagate = useNavigate();
  const borderColor = error ? "border-red-500" : "border-gray-300";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_PATH}/users/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const { token, username: returnedUsername, id } = await response.json();

      console.log("Username:", returnedUsername);

      localStorage.setItem("token", token);
      localStorage.setItem("username", returnedUsername);
      localStorage.setItem("id", id);

      naviagate("/businesses");
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
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${borderColor}`}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-black hover:bg-yellow-500 text-white hover:text-black font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors delay-20 duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loggin in..." : "Login"}
          </button>
        </div>
      </form>
      <div className="items-center">
        <p>
          Don't have an account?{" "}
          <Link className="font-bold text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
