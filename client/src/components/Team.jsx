import React from "react";
import prathamImg from '../assets/pratham.jpg'
import princeImg from '../assets/prince-2.png'
import tabishImg from '../assets/tabish.jpg'

const developers = [
    {
        name: "Pratham Harsh",
        role: "Web Developer & Data Science Enthusiast",
        desc: "Skilled in data analysis and machine learning with expertise in Power BI, Python, SQL, and supervised learning models. Passionate about turning data into insights and solving real-world problems.",
        image: prathamImg
    },
    {
        name: "Prince Singh",
        role: "Full Stack Developer",
        desc: "Proficient in C++, JavaScript, MERN, SQL, and problem-solving, with a strong foundation in DBMS, Operating Systems, OOPs, AI/ML, and other core CS concepts.",
        image: princeImg
    },
    {
        name: "Tabish Javed",
        role: "Frontend Developer",
        desc: "Frontend developer skilled in React, Tailwind, and modern UI design. Experienced in building real-world web apps using JavaScript and Node.js, with strong problem-solving skills in DSA.",
        image: tabishImg
    },
];

const Team = () => {
  return (
    <section className="py-20 px-6 dark:bg-[#333333] bg-slate-100">
        <h2 className="text-5xl  font-bold text-center mb-16 tracking-wide">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r text-gradient">Developers</span>
        </h2>

        <div className="grid gap-12 md:grid-cols-3 max-w-[90%] mx-auto">
            {developers.map((dev, index) => (
                <div key={index} className="card-effect-border group bg-slate-300 dark:bg-[#202020] p-8 rounded-2xl" >
                  <div className="card-effect-overlay" />

                  <div className="w-20 h-20 mx-auto mb-5">
                    <img src={dev.image} alt={dev.name} className="card-effect-icon w-20 h-20 rounded-full object-cover scale-125 border-2 border-gray-600 " />
                  </div>

                  <h3 className="card-effect-title text-2xl font-bold text-slate-700 dark:text-slate-300 text-center mb-2 ">
                    {dev.name}
                  </h3>
                  <p className="card-effect-subtitle text-base text-slate-700 dark:text-slate-300 opacity-65 font-medium italic text-center mb-4 group-hover:text-black dark:group-hover:text-white">
                    {dev.role}
                  </p>
                  <p className="card-effect-desc text-slate-700 dark:text-slate-300 text-[1rem] leading-relaxed text-center group-hover:text-black dark:group-hover:text-white">
                    {dev.desc}
                  </p>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Team;