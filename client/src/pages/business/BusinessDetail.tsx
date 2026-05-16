import MainLayout from "../../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "../../components/LoadingCard";
import { Rating } from "@mui/material";

const API_PATH = import.meta.env.VITE_API_PATH;

// interface BusinessProps {
//   id: string;
//   name: string;
//   description: string;
//   location: string;
//   rating: number;
//   image_url: string;
//   user_id: string;
// }

const BusinessDetail = () => {
  const { id } = useParams();

  const {
    data: business,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["business", id],
    queryFn: async () => {
      const res = await fetch(`${API_PATH}/businesses/${id}`);
      if (!res.ok) throw new Error("Failed to fetch business data");
      return res.json();
    },

    enabled: !!id,
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

  if (!business) {
    return (
      <MainLayout>
        <div className="py-8 text-center">
          <p>Business not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div
        className="max-w-4xl mx-auto px-5 md:px-20 py-10 font-inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={business.image_url}
          alt={`A picture of ${business.name}`}
          className="w-full h-96 object-contain md:object-cover rounded-lg mb-6"
        />
        <div className="mb-6">
          <h3 className="text-3xl font-bold mb-4">{business.name}</h3>
          <p className="text-gray-700 mb-3 text-base leading-relaxed">
            {business.description}
          </p>
          <p className="text-gray-500 text-sm">{business.location}</p>
        </div>
        <Rating value={business.rating} readOnly size="medium" />
      </motion.div>
    </MainLayout>
  );
};

export default BusinessDetail;
