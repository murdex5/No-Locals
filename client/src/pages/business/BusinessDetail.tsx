import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Rating, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

const API_PATH = import.meta.env.VITE_API_PATH;

interface BusinessProps {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  image_url: string;
  user_id: string;
}

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState<BusinessProps | null>(null);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    console.log(`${API_PATH}businesses/${id}`);
    fetch(`${API_PATH}businesses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        setBusiness(json);
        setDataIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setDataIsLoaded(true);
      });
  }, [id]);

  if (!dataIsLoaded) {
    return (
      <MainLayout>
        <div className="py-8 text-center">
          {/* <h1 className="text-xl">Loading businesses...</h1> */}
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <h1 className="py-8 text-2xl">Loading Businesses...</h1>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="py-8 text-center text-red-500">
          <p>Error: {error}</p>
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
      <div className="max-w-4xl mx-auto px-5 md:px-20 py-10 font-inter">
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
      </div>
    </MainLayout>
  );
};

export default BusinessDetail;
