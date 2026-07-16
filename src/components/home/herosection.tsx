import HeroBg from "../../assets/header-bg.png";
import CustomButton from "../customButton";

export default function HeroSection() {
  return (
    <div className="relative">
      <img src={HeroBg} alt="Logo" className="w-full min-h-[500px] object-cover rounded-[16px]" />
      <div className="absolute top-1/2 -translate-y-1/2 left-[100px]">
        <h1>Fast, Reliable, and Secure Delivery Services</h1>
        <p>From parcels to packages, we deliver everything – anywhere, anytime.</p>
        <div className="flex gap-4">
            <CustomButton title="Book a Delivery" />
            <CustomButton title="Become a Courier" />
        </div>
      </div>
      
    </div>
  );
}