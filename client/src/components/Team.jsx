import React from "react";

const developers = [
  {
    name: "Prince Singh",
    role: "Full Stack Developer",
    desc: "Proficient in C++, JavaScript, MERN, SQL, and problem-solving, with a strong foundation in DBMS, Operating Systems, OOPs, AI/ML, and other core CS concepts.",
    image: "/images/prince.jpg"
  },
  {
    name: "Pratham Harsh",
    role: "Web Developer & Data Science Enthusiast",
    desc: "Skilled in data analysis and machine learning with expertise in Power BI, Python, SQL, and supervised learning models. Passionate about turning data into insights and solving real-world problems.",
    image: "/images/pratham.jpg",
  },
  {
    name: "Tabish Javed",
    role: "Frontend Developer",
    desc: "Frontend developer skilled in React, Tailwind, and modern UI design. Experienced in building real-world web apps using JavaScript and Node.js, with strong problem-solving skills in DSA.",
    image: "/images/tabish.jpg",
  },
];

const Team = () => {
  return (
<section className="bg-black text-white py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 tracking-wide">
        About the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Developers</span>
      </h2>

      <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="relative group bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-2xl border border-gray-800 shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-20 h-20 mx-auto mb-5">
              <img
                src={dev.image}
                alt={dev.name}
                className="rounded-full border-2 border-gray-600 group-hover:border-blue-400 transition-all duration-300"
              />
            </div>

            <h3 className="text-2xl font-bold text-white text-center mb-2 relative z-10 group-hover:text-blue-300 transition-colors">
              {dev.name}
            </h3>
            <p className="text-base text-gray-400 font-medium italic text-center mb-4 relative z-10 group-hover:text-purple-300 transition-colors">
              {dev.role}
            </p>
            <p className="text-gray-300 text-[1rem] leading-relaxed text-center relative z-10 group-hover:text-white transition-colors">
              {dev.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
