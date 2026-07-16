
import HeroSection from "../components/home/herosection";
import Navbar from "../components/home/navbar";

export default function Home() {
  return (
    <div className="max-w-[1406px] mx-auto px-[12px]">
      <Navbar />
      <HeroSection />
    </div>
  );
}