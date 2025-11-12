import { Footer } from "../components/layout/footer";
import NavbarHome from "../components/layout/navbar_home";

export const LandingPage = () => {
  return (
    <div>
      <NavbarHome />
      <h1>Welcome to the Heavy Metals App</h1>
      <p>Your one-stop solution for all heavy metal music needs.</p>
      <Footer />
    </div>
  );
};
