import appVideo from "/about_video.mp4";
import aboutImage from "/about.jpg";
import Navigation from "../../components/shared/Navigation";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Navigation/>
      <section className="flex flex-col gap-2 md:flex-row items-center justify-center p-6 md:p-12 bg-gray-100 w-screen">
        <div className="md:w-1/2 w-full">
        <img
          src={aboutImage}
          alt="About Us"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        </div>
        <div className="md:ml-10 w-full md:w-1/2 mt-6 md:mt-0 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Who We Are?</h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
            corrupti dignissimos dicta exercitationem corporis recusandae cum
            deserunt quisquam quis. Cum praesentium inventore eveniet, cumque
            atque quis in. Sed inventore iure amet rem aperiam aspernatur
            delectus beatae? Laboriosam at ea Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. In, eius!
          </p>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 underline decoration-dotted">
            Creating stunning images with as much or as little control as you
            like thanks to a choice of Basic and Creative mode
          </h3>
          <div className="marquee">
            <div className="marquee-content">
              Creating stunning images with as much or as little control as you
              like thanks to a choice of Basic and Creative mode
            </div>
          </div>
        </div>
      </section>
      <div className="mt-12 px-6 md:px-12 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Download Our <span className="text-blue-600">App</span>
        </h1>
        <p className="text-slate-400 text-base  mb-4 mt-2">It will be launch soon</p>
        <video
          src={appVideo}
          controls
          autoPlay
          loop
          className="w-full sm:w-[70%] rounded-2xl shadow-lg mt-6"
        ></video>
      </div>
    </>
  );
};

export default About;
