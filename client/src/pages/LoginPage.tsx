import Login from "../components/Login";
import MainLayout from "../layouts/MainLayout";

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen">
        <Login />
      </div>
    </MainLayout>
  );
};

export default LoginPage;
