import BusinessCard, {
  type BusinessCardProps,
} from "../../components/Business/BusinessCard";
import LoadingCard from "../../components/LoadingCard";
import MainLayout from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";

const API_PATH = import.meta.env.VITE_API_PATH;

const BusinessList = () => {
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const res = await fetch(`${API_PATH}/businesses?page=1&limit=20`);
      if (!res.ok) throw new Error("Failed to fetch businesses");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
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

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Businesses</h1>

        {items.length === 0 ? (
          <p className="text-gray-500">No businesses found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((business: BusinessCardProps) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BusinessList;
