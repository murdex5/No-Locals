import BusinessCard from "../../components/Business/BusinessCard";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";

interface Business {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
}

const BusinessList = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    // Fetch businesses from API or use mock data
    const mockBusinesses: Business[] = [
      {
        id: "1",
        name: "Coffee House",
        description: "Cozy cafe with great coffee",
        location: "Downtown",
        image: "https://via.placeholder.com/400x300?text=Coffee+House",
      },
      {
        id: "2",
        name: "Restaurant XYZ",
        description: "Fine dining experience",
        location: "Midtown",
        image: "https://via.placeholder.com/400x300?text=Restaurant",
      },
      {
        id: "3",
        name: "Bar & Grill",
        description: "Casual dining and drinks",
        location: "Uptown",
        image: "https://via.placeholder.com/400x300?text=Bar+Grill",
      },
    ];

    setBusinesses(mockBusinesses);
  }, []);
  return (
    <>
      <MainLayout>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8">Businesses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                id={business.id}
                name={business.name}
                description={business.description}
                location={business.location}
                image={business.image}
              />
            ))}
          </div>
        </div>

        {businesses.length == 0 && <p>No Businesses found</p>}
      </MainLayout>
    </>
  );
};

export default BusinessList;
