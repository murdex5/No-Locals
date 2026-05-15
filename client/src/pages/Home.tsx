import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import NavLink from "../components/Buttons/NavLink";

const Home = () => {
  return (
    <>
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-wrap items-center justify-between gap-10 w-full max-w-7xl mx-auto px-8">
            {/* Left Section */}
            <section className="flex-1 min-w-[300px] flex flex-col justify-center">
              <h1 className="text-6xl font-black leading-tight mb-6">
                Exposing
                <br />
                Discriminatory
                <br />
                Hospitality
              </h1>
              <p className="text-gray-600 mb-8 text-lg max-w-md leading-relaxed">
                <motion.span className="text-black font-bold">
                  No Locals
                </motion.span>{" "}
                is a website that helps locals to point out restaurants, hotels
                or accommodations that do not serve locals.
              </p>
              <NavLink to="/report">Report a business</NavLink>{" "}
            </section>

            {/* Right Section - Image */}
            <div className="flex-1 flex justify-end">
              <img
                loading="lazy"
                className="w-full max-w-sm h-auto object-cover rounded-3xl shadow-2xl"
                src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777589936/IMG_0872_vwyw3z.jpg"
                alt="main-image"
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
