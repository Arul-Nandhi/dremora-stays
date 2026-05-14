import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("login/", {
        username,
        password
      });

      const { access, user } = res.data;

      localStorage.setItem("token", access);
      localStorage.setItem("role", user.role);

      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "RECEPTIONIST") navigate("/reception");
      else if (user.role === "MANAGER") navigate("/manager");
      else if (user.role === "HR") navigate("/hr");
      else if (user.role === "RESTAURANT") navigate("/restaurant");

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-8 shadow-2xl">

        {/* Title */}
        <h2 className="text-3xl font-serif text-center mb-8 tracking-wide" style={{ color: '#d4af37' }}>
          HMS Login
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-[#d4af37] transition"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-[#d4af37] transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-4 py-3 bg-[#d4af37] text-black font-semibold rounded-lg tracking-widest uppercase hover:bg-white transition-all duration-300"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Access restricted to authorized staff only
        </p>

      </div>
    </div>
  );
}

export default Login;
