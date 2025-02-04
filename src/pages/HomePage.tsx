import ChatBubble from "@/components/ChatBubble";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-leaf-primary text-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Leaf Fund</h1>
            <div className="space-x-6">
              <a href="#" className="hover:text-gray-200">About</a>
              <a href="#" className="hover:text-gray-200">Solutions</a>
              <a href="#" className="hover:text-gray-200">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-leaf-primary to-leaf-light text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Growing Businesses with Smart Financing
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get the funding you need to take your business to the next level with our flexible loan solutions.
            </p>
            <button
              onClick={() => {
                const chatBubble = document.querySelector(".fixed.bottom-4.right-4 button");
                if (chatBubble instanceof HTMLElement) {
                  chatBubble.click();
                }
              }}
              className="bg-white text-leaf-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Application
            </button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Fast Approval</h3>
                <p className="text-gray-600">
                  Get approved quickly with our streamlined application process.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Competitive Rates</h3>
                <p className="text-gray-600">
                  Access affordable financing options tailored to your needs.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Expert Support</h3>
                <p className="text-gray-600">
                  Our team is here to guide you through every step.
                </p>
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