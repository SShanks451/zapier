const Hero = () => {
  return (
    <div className="w-[100%]">
      <div className="flex mt-20 mx-10">
        <div className="w-[50%] mx-4 pl-10 flex flex-col justify-center">
          <h1 className="text-8xl font-bold">Automate without limits</h1>
          <div className="mt-4 text-xl font-normal">
            Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your
            imagination.
          </div>
        </div>
        <div className="w-[50%] ml-10">
          <img
            className="w-[80%]"
            src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
