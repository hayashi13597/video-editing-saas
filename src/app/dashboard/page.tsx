"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data } = useSession();
  if (!data) {
    return <div>Loading...</div>;
  }
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    redirect("/sign-in");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <p>User: {data.user?.name || "Guest"}</p>
      <p>Email: {data.user?.email || "Not provided"}</p>
      <p>Role: {data.user?.role || "Not specified"}</p>
      <button onClick={handleSignOut}>sign out</button>
    </div>
  );
};

export default Dashboard;
