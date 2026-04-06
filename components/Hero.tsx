const Hero = () => {
  return (
    <section className="relative bg-gray-100 py-24 md:py-32 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
          The T-Shirt Store
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Des t‑shirts de qualité, designs uniques, fabriqués avec soin.
        </p>
        <button className="bg-black text-white px-8 py-3 text-base font-medium rounded-sm hover:bg-gray-800 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};
export default Hero;
