import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Update import for Next.js 13+
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Auth: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        const emailIdPart = email.split('@')[0]; // Extract part before '@'
        router.push(`/pantry-tracker/${emailIdPart}`); // Redirect to pantry tracker
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        const emailIdPart = email.split('@')[0]; // Extract part before '@'
        router.push(`/pantry-tracker/${emailIdPart}`); // Redirect to pantry tracker
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        alert("Error: " + error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">{isLogin ? "Sign In" : "Sign Up"}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 mb-2"
      />
      <button onClick={handleAuth} className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4">
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create an account" : "Sign in with existing account"}
      </button>
    </div>
  );
};

export default Auth;
