import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="smart-brief" className="w-12 object-contain" />
          <h1 className="text-base font-bold text-[#FFCAD4] uppercase font-satoshi">
            Smart-Brief
          </h1>
        </div>
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/Wills-dev/smart-brief-ai", "_blank")
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Effortlessly Summarize Your Articles Using{" "}
        <br className="max-md:hidden " />
        <span className="orange_gradient">SMART-BRIEF</span>
      </h1>
      <h2 className="desc">
        Streamline Your Reading Experience with Smart Brief: An Open-Source
        Article Summarizer Crafting Clear and Concise Summaries from Lengthy
        Articles.
      </h2>
    </header>
  );
};

export default Hero;
