import { Link } from "react-router-dom";

interface BusinessCardProps {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
}

const BusinessCard = ({
  id,
  name,
  description,
  location,
  image,
}: BusinessCardProps) => {
  return (
    <Link to={"/b/" + id}>
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <p className="text-gray-500 text-sm mb-4">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
