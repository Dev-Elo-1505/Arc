import { ShieldCheck } from "lucide-react";
import Navbar from "./Navbar";
import arcHome from "../assets/arc.png";

const Hero = () => {
  return (
    <>
      <section className="relative overflow-hidden p-2 md:py-6 md:px-12 w-full mx-auto bg-[radial-gradient(circle_at_top,var(--color-primary-light)_0%,#ede7ff_45%,#e3daff_70%,#ddd2ff_100%)] min-h-screen">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[140px] z-0" />
        <div className="absolute top-32 right-0 w-[420px] h-[420px] rounded-full bg-primary/15 blur-[140px] z-0" />
        <div className="z-10 relative">
          <Navbar />
          <div className="flex flex-col items-center text-center mt-20">
            <div className="bg-white/80 backdrop-blur-md rounded-full mb-4 px-3 py-1.5 flex items-center gap-1 shadow">
              <ShieldCheck fill="#684aff" color="#fff" />
              <p className="text-primary text-[12px] font-medium">
                Created for everyone
              </p>
            </div>
            <div>
              <h1 className="text-5xl mb-2">
                Arc.io makes your work effortless
              </h1>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Streamlining workflow for clarity and focused execution,
                <br /> a solution designed to simplify your tasks.
              </p>
            </div>
            <div className="max-w-6xl w-full relative mt-16">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #684aff 0%, #9b87ff 100%)",
                }}
              />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white/40 backdrop-blur-sm p-2">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={arcHome}
                    alt="Arc.io Home"
                    className="
      w-full
      rounded-2xl
      shadow-[0_40px_80px_rgba(104,74,255,0.25)]
      
    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-white z-20" />

    </section>

      
     
    </>
  );
};

export default Hero;
