import BusinessCard from "../../components/Business/BusinessCard";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";

const API_PATH = import.meta.env.VITE_API_PATH;

const BusinessList = () => {
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState(null); // Good practice to track errors

  useEffect(() => {
    fetch(`${API_PATH}businesses`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setDataIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setDataIsLoaded(true);
      });
  }, []);

  if (!dataIsLoaded) {
    return (
      <MainLayout>
        <div className="py-8 text-center">
          <h1 className="text-xl">Loading businesses...</h1>
        </div>
      </MainLayout>
    );
  }

  // 2. Handle Error State
  if (error) {
    return (
      <MainLayout>
        <div className="py-8 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Businesses</h1>

        {/* 3. Check items.length instead of businesses.length */}
        {items.length === 0 ? (
          <p className="text-gray-500">No businesses found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BusinessList;
