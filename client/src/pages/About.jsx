import React from "react";
import aboutImg from "../assets/photo-about.avif";
import { FiUpload } from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";
import { LuBrainCircuit, LuZap } from "react-icons/lu";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { Link } from "react-router-dom";
import TypewriterText from "../animations/TypewriterText";
import Team from "../components/Team";

const features = [
  {
    icon: <LuZap size={28} />,
    title: "Instant Results",
    desc: "Get caption suggestions in seconds, no matter how complex your image is.",
  },
  {
    icon: <LuBrainCircuit size={28} />,
    title: "Contextual Understanding",
    desc: "Our AI understands the context, mood, and elements in your image for relevant captions.",
  },
  {
    icon: <SlPeople size={28} />,
    title: "Audience Focused",
    desc: "Captions are designed to engage your audience and increase social media interaction.",
  },
];

const worksArray = [
  {
    icon: <FiUpload />,
    iconTitle: "Upload",
    desc: "Upload your image through our simple and intuitive interface.",
  },
  {
    icon: <LuBrainCircuit />,
    iconTitle: "Analyze",
    desc: "Our AI analyzes your image, identifying objects, scenes, emotions, and context.",
  },
  {
    icon: <GiSparkles />,
    iconTitle: "Generate",
    desc: "The system generates multiple caption options based on the image analysis.",
  },
  {
    icon: <FaEnvelopeOpenText />,
    iconTitle: "Choose",
    desc: "You select the caption that best fits your needs or use our suggestions as inspiration.",
  },
];

const About = () => {
  return (
    <section className="w-screen mt-24 overflow-x-hidden">
      <div className="text-5xl font-bold text-center">
        <TypewriterText text="About PicLingo" />
      </div>
      <p className="max-w-[80%] sm:max-w-[50%] text-xl text-center text-slate-700 dark:text-slate-300 mt-2 mx-auto py-2">
        Our AI-powered image caption recommendation system helps content
        creators, marketers, and social media enthusiasts generate engaging
        captions for their images.
      </p>

      {/* Our Mission + How it Works */}
      <section className="w-[90%] mx-auto flex max-md:flex-col justify-around max-md:items-center py-10 max-md:gap-8">
        <div className="w-1/2 max-md:w-[75%] flex flex-col justify-around max-md:gap-2">
          <p className="text-2xl font-bold max-md:text-center">Our Mission</p>
          <p className="text-slate-700 dark:text-slate-300 max-md:text-center">
            We believe that every image tells a story, and the right caption can
            enhance that story. Our mission is to help you find the perfect
            words to complement your visual content, saving you time and
            boosting engagement.
          </p>

          <p className="text-2xl font-bold max-md:text-center mt-6">How It Works</p>
          <div className="flex flex-col gap-6 mt-6">
            {worksArray.map((item, index) => (
              <div
                key={index}
                className="relative group bg-slate-300 dark:bg-[#202020] p-5 rounded-xl border border-gray-800 shadow-md transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#64748B] dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300">
                    <i className="text-xl">{item.icon}</i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-700 dark:text-white group-hover:text-blue-400 transition-colors">
                      {item.iconTitle}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[620px] max-h-[480px] overflow-hidden rounded-lg object-scale-down ml-8 max-md:ml-0">
          <img src={aboutImg} alt="" className="w-full object-cover" />
        </div>
      </section>

      {/* Key Features */}
      <section className="text-white py-20 px-6">
        <h2 className="text-5xl font-bold text-center mb-16 tracking-wide">
          Key{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r text-gradient">
            Features
          </span>
        </h2>

        <div className="grid gap-12 md:grid-cols-3 max-w-[90%] mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative group bg-slate-300 dark:bg-[#202020] p-8 rounded-2xl border border-gray-800 shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center text-slate-700 dark:text-slate-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 relative z-10 group-hover:text-blue-500 transition-colors text-slate-700 dark:text-white">
                {item.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-[1rem] leading-relaxed text-center relative z-10 group-hover:text-white transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="min-w-[40%] mx-auto flex flex-col gap-4 justify-center items-center py-10 mb-10">
        <div className="text-2xl font-bold text-center">
          <TypewriterText text="Ready to Try It?" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-center max-w-[80%]">
          Upload your first image and experience the power of AI-generated
          caption recommendations.
        </p>
        <Link
          to="/upload"
          className="btn w-[40%] max-w-[420px] max-sm:w-[60%] flex justify-center items-center gap-2 text-gray-900 dark:text-white/87"
        >
          <i className="text-gray-900 dark:text-white/87">
            <FiUpload />
          </i>
          <p className="text-gray-900 dark:text-white/87">Get Started</p>
        </Link>
      </section>

      {/* Team Section */}
      <Team />
    </section>
  );
};

export default About;
