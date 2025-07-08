"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if(password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      alert("Hatalı şifre!");
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">Admin Giriş</h1>
      <input
        type="password"
        placeholder="Şifreniz"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"  
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Giriş Yap
      </button>
    </div>
  );
}
