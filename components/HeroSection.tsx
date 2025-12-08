const HeroSection = () => {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Your Name as Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6 animate-fade-in">
          Muhammad Mubashar Ali
        </h1>

        {/* Your Title/Introduction */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 animate-slide-up delay-100">
          Full Stack Developer & UI/UX Designer
          <br />
          Creating exceptional digital experiences
        </p>

        {/* Contact/Social Links */}
        <div className="flex gap-6 justify-center animate-slide-up delay-200">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default HeroSection;
