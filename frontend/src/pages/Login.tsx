import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Appbar />
      <div className="flex w-[100%] mt-32">
        <div className="w-[50%] pl-80 my-auto">
          <h1 className="text-4xl font-bold">Join millions worldwide who automate their work using Zapier.</h1>
        </div>
        <div className="w-[50%] pl-32">
          <div className="my-2">
            <h2 className="font-medium">* Email</h2>
            <input
              className="border border-black rounded-sm py-2 px-2 w-[60%]"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <h2 className="font-medium">* Password</h2>
            <input
              className="border border-black rounded-sm py-2 px-2 w-[60%]"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-6">
            <button
              className="border rounded-full py-3 w-[60%] bg-[#ff4f00] text-white font-semibold"
              onClick={async () => {
                const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                  username: email,
                  password: password,
                });
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
