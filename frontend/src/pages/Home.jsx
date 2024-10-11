import Header from "../component/Header";
import CheckInPage from "../home/CheckIn";
import CheckoutPage from "../home/CheckOut";

const Home = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Home" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <CheckInPage />
          <CheckoutPage />
        </div>
      </main>
    </div>
  );
};

export default Home;
