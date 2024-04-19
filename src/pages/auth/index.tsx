import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FormInput from "@/components/elements/FormInput";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const inter = Inter({ subsets: ["latin"] });

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost/api_sirtaru/auth/login.php", {
        username,
        password,
      });
      if (response.data === 'Login successful') {
        router.push("/dashboard");
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    } finally { 
      setLoading(false);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex top-0 left-0 flex items-center w-full p-4">
        <Image
          src="/assets/undraw_developer.svg"
          alt="Logo"
          width={48}
          height={48}
        />
        <h1 className="ml-5 font-bold text-lg">SIRTARU</h1>
      </div>

      <div className="z-10 w-full max-w-5xl justify-left lg:flex">
        <Image
          src="/assets/undraw_developer.svg"
          alt="Logo"
          width={512}
          height={512}
          className="mr-20"
        />
        <div className="ml-20 w-full">
          <h1 className="font-bold text-4xl mb-12">Log In</h1>
          <FormInput
            className="mb-8 w-full p-3.5 rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            className="mb-8 w-full p-3.5 rounded-lg border border-secondary-color border-slate-200 placeholder-slate-400 hover:border-slate-500 outline-secondary-color"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-red-400 text-sm mb-4">{message}</span>
          <div className="flex mb-8 text-sm justify-end w-full">
            <p>Forgot password?</p>
          </div>
          <button
            className="w-full rounded-lg bg-secondary-color p-3.5 text-white"
            type="button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
