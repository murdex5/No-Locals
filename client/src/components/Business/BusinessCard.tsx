import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";

export interface BusinessCardProps {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  image_url: string;
}

const BusinessCard = ({
  id,
  name,
  description,
  location,
  rating,
  image_url,
}: BusinessCardProps) => {
  return (
    <Link to={`/b/${id}`} className="block">
      <motion.div
        className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <img
          src={image_url}
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="flex justify-between items-start p-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">{name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {description}
            </p>
            <p className="text-gray-500 text-sm">{location}</p>
          </div>
          <Rating value={rating} readOnly size="medium" className="ml-4" />
        </div>
      </motion.div>
    </Link>
  );
};

export default BusinessCard;
