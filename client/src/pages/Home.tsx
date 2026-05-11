import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-row-2 gap-8">
          <section className="pt-[300px]">
            <h1 className="block text-[40px] text-[1.2rem] font-bold leading-tight">
              Exposing Discriminatory Hospitality
            </h1>
            <p>
              <strong>No Locals</strong> is a website that helps locals to point
              out restaurants, hotels or accommodations that do not serve
              locals.
            </p>
            <button>Report a business</button>
          </section>
          <div className="pt-[250px]">
            <img
              className="w-100 h-auto object-cover rounded-1xl shadow-lg"
              src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777589936/IMG_0872_vwyw3z.jpg"
              alt="main-image"
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
