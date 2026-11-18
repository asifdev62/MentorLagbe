
import HeroSection from "./components/banner";
import TheWayes from "./components/TheWaye";
import TutoringMethod from "./components/tutoring-method";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TheWayes />
      <TutoringMethod />
      <Footer />
    </div>
  );
}
