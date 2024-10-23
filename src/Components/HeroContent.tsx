// import { motion } from "framer-motion";
const HeroContent = () => {
  return (
    <section>
      <div className="container flex items-center h-[calc(100dvh-80px)] justify-center flex-col  bg-primary/10 min-w-full z-50">
        <h1 className="font-bold text-5xl text-primary">
          Unleash Your Inner Quizmaster!
        </h1>
        <p className="w-2/3 text-center text-lg font-medium mt-10">
          Ready to Challenge Your Brain? Dive into our Quiz App and discover how
          much you really know! With a variety of categories, engaging
          questions, and a dynamic scoring system, every quiz is a new
          adventure. Whether you’re a trivia buff or just looking to learn
          something new, our app is designed for everyone. Join the fun, compete
          with friends, and see if you can climb to the top of the leaderboard!
        </p>
        

        {/* <button className="btn btn-ghost font-bold bg-red-300">Get Started</button> */}
      </div>
    </section>
  );
};

export default HeroContent;
