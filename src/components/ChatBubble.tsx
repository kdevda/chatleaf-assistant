import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatInterface from "./ChatInterface";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-[400px] h-[800px] animate-fade-in">
            <div className="bg-leaf-primary p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="text-white font-semibold">Loan Application</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <ChatInterface />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-leaf-primary hover:bg-leaf-light text-white rounded-full p-4 shadow-lg transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBubble;