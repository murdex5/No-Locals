import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "../../components/LoadingCard";
import { motion } from "framer-motion";
import UserCard from "../../components/User/UserCard";

const API_PATH = import.meta.env.VITE_API_PATH;

const UserPage = () => {
  const { username } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const res = await fetch(`${API_PATH}/users/${username}`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      return res.json();
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingCard />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="py-8 text-center text-red-500">
          <p>Error: {error.message}</p>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div>
          <p>User not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div>
        <UserCard
          uid={user.uid}
          username={user.username}
          full_name={user.full_name}
          email={user.email}
        />
      </motion.div>
    </MainLayout>
  );
};

export default UserPage;
