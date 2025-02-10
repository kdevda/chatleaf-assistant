import ChatBubble from "@/components/ChatBubble";

const HomePage = () => {
  const handleLoanClick = () => {
    const chatBubble = document.querySelector(".fixed.bottom-4.right-4 button");
    if (chatBubble instanceof HTMLElement) {
      chatBubble.click();
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-[#237380] text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <img 
              src="/placeholder.svg" 
              alt="LEAF Fund" 
              className="h-16"
            />
            <div className="flex items-center space-x-8">
              <div className="group relative">
                <a href="#" className="hover:text-gray-200">WHAT WE DO</a>
              </div>
              <div className="group relative">
                <a href="#" className="hover:text-gray-200">ABOUT US</a>
              </div>
              <div className="group relative">
                <a href="#" className="hover:text-gray-200">OUR IMPACT</a>
              </div>
              <a href="#" className="hover:text-gray-200">INVEST</a>
              <a href="#" className="hover:text-gray-200">ADVISORY SERVICES</a>
              <button
                onClick={handleLoanClick}
                className="bg-white text-[#237380] px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
              >
                REQUEST A LOAN
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative h-[600px]">
          <img
            src="/lovable-uploads/9f5657ba-0245-479e-a907-3046137d3d73.png"
            alt="LEAF Fund Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 text-white text-sm">
            Photo: Grand Opening Nubian Markets, Dorchester MA
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[#237380] text-4xl font-bold mb-6">
                  LEAF provides financing to co-ops, underserved businesses, and organizations embracing shared ownership. <span className="italic">It's in our DNA.</span>
                </h2>
                <button
                  onClick={handleLoanClick}
                  className="bg-[#237380] text-white px-8 py-3 rounded font-semibold hover:bg-[#2d8f9f] transition-colors mt-8"
                >
                  APPLY FOR A LOAN
                </button>
              </div>
              <div className="text-center">
                <div className="text-[#237380] text-8xl font-bold">$339M</div>
                <p className="text-[#237380] text-xl mt-4">LEAF Has Leveraged Since 1982</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#237380] py-20 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Discover LEAF's 3 Strategic Areas
            </h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="relative group">
                <img
                  src="/lovable-uploads/8f0583ad-1e38-4993-a3e6-aa59edb2e417.png"
                  alt="Healthy Food"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#237380] text-white px-4 py-2 rounded">
                    HEALTHY FOOD
                  </span>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/lovable-uploads/8f0583ad-1e38-4993-a3e6-aa59edb2e417.png"
                  alt="Affordable Housing"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#237380] text-white px-4 py-2 rounded">
                    AFFORDABLE HOUSING
                  </span>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/lovable-uploads/8f0583ad-1e38-4993-a3e6-aa59edb2e417.png"
                  alt="Economic Inclusion"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#237380] text-white px-4 py-2 rounded">
                    ECONOMIC INCLUSION
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ChatBubble />
    </div>
  );
};

export default HomePage;
