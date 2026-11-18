
import HeroSection from "./components/banner";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import TheWayes from "./components/TheWaye";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TheWayes />
      <Footer />
    </div>
  );
}
