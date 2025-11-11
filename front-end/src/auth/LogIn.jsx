import React, { useState } from "react";
import FloatingTextInput from "../components/input-box/FloatingTextInput";
import SubmitButton from "../components/buttons/SubmitButton";
import { User, LockKeyhole } from "lucide-react";
import { useAuth } from "./context/AuthContext";

const LogIn = () => {

  const { login } = useAuth();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    login(userName, password, setIsLoading);
  }

  return (
    <div className="relative flex justify-center items-center text-center w-full min-h-screen">
      <div className="" />
      <div className="space-y-8 border backdrop-blur-xl bg-white/10 border-white/5 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out text-black overflow-hidden min-h-[28rem]">
        <h1 className="font-bold text-3xl">Placeholder Text</h1>
        <div className="flex items-center space-x-2">
          <User className="text-gray-500" />
          <FloatingTextInput
            type={"text"}
            label="Username"
            value={userName}
            onChange={setUsername}
            className={"w-64"}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <LockKeyhole className="text-gray-500" />
          <FloatingTextInput
            type={"password"}
            label="Password"
            value={password}
            onChange={setPassword}
            className={"w-64"}
            required
          />
        </div>
        <SubmitButton
          label="Login"
          onClick={handleLogin}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default LogIn;
