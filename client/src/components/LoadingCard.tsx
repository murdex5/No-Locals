import { Skeleton } from "@mui/material";

const LoadingCard = () => {
  return (
    <div className="py-8 text-center">
      {/* <h1 className="text-xl">Loading businesses...</h1> */}
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <h1 className="py-8 text-2xl">Loading Business details...</h1>
    </div>
  );
};

export default LoadingCard;
