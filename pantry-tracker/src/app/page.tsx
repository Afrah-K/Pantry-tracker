'use client'
import React from "react";
import { useRouter } from "next/navigation"; // Update import for Next.js 13+
import Auth from "../app/components/Auth";
import { auth } from "../app/firebase";

const Home: React.FC = () => {
  const router = useRouter();
  const user = auth.currentUser;

  React.useEffect(() => {
    if (user && user.email) { // Check if user and user.email exist
      const emailIdPart = user.email.split('@')[0]; // Extract part before '@'
      router.push(`/pantry-tracker/${emailIdPart}`); // Redirect to the user's pantry tracker
    }
  }, [user, router]);

  return (
    <div className="container mx-auto p-4">
      {!user && <Auth />}
    </div>
  );
};

export default Home;
