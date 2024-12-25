import Footer from "./Footer";
import Header from "./Header";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default PrivateLayout;
