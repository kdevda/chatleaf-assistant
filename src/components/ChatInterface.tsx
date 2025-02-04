import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DocumentUpload from "./DocumentUpload";

interface Message {
  type: "agent" | "user";
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanType, setLoanType] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [idUploaded, setIdUploaded] = useState({ front: false, back: false });
  const [taxReturnUploaded, setTaxReturnUploaded] = useState(false);
  const [additionalDocs, setAdditionalDocs] = useState({
    bankStatements: false,
    businessPlan: false,
    financialProjections: false,
  });

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      addMessage({
        type: "agent",
        content: "Hi! I'm your Leaf Fund loan agent. I'm here to help you apply for a loan. Let's get started! What loan amount are you looking for?",
      });
    }, 500);
  }, []);

  const handleLoanAmountSubmit = () => {
    addMessage({ type: "user", content: `Loan amount: $${loanAmount}` });
    addMessage({
      type: "agent",
      content: "Great! What type of loan are you looking for?",
    });
    setStep(1);
  };

  const handleLoanTypeSelect = (value: string) => {
    setLoanType(value);
    addMessage({ type: "user", content: `Loan type: ${value}` });
    addMessage({
      type: "agent",
      content: "What's the purpose of this loan?",
    });
    setStep(2);
  };

  const handleLoanPurposeSelect = (value: string) => {
    setLoanPurpose(value);
    addMessage({ type: "user", content: `Loan purpose: ${value}` });
    addMessage({
      type: "agent",
      content: "Please upload your ID for verification. We need both front and back images.",
    });
    setStep(3);
  };

  const handleIdUpload = (side: "front" | "back") => {
    setIdUploaded((prev) => ({ ...prev, [side]: true }));
    addMessage({
      type: "agent",
      content: `Thank you for uploading the ${side} of your ID. ${
        side === "front" && !idUploaded.back
          ? "Please upload the back of your ID."
          : side === "back" && !idUploaded.front
          ? "Please upload the front of your ID."
          : "Great! Now let's verify your business details."
      }`,
    });
    
    if (idUploaded.front && idUploaded.back) {
      setStep(4);
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex gap-2">
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter amount"
              className="flex-1"
            />
            <Button onClick={handleLoanAmountSubmit}>Submit</Button>
          </div>
        );
      case 1:
        return (
          <Select onValueChange={handleLoanTypeSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Business Loan</SelectItem>
              <SelectItem value="equipment">Equipment Financing</SelectItem>
              <SelectItem value="working-capital">Working Capital</SelectItem>
            </SelectContent>
          </Select>
        );
      case 2:
        return (
          <Select onValueChange={handleLoanPurposeSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expansion">Business Expansion</SelectItem>
              <SelectItem value="inventory">Inventory Purchase</SelectItem>
              <SelectItem value="equipment">Equipment Purchase</SelectItem>
              <SelectItem value="working-capital">Working Capital</SelectItem>
            </SelectContent>
          </Select>
        );
      case 3:
        return (
          <div className="space-y-4">
            <DocumentUpload
              onUpload={() => handleIdUpload("front")}
              label="Upload ID Front"
              uploaded={idUploaded.front}
            />
            <DocumentUpload
              onUpload={() => handleIdUpload("back")}
              label="Upload ID Back"
              uploaded={idUploaded.back}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <DocumentUpload
              onUpload={() => {
                setTaxReturnUploaded(true);
                setStep(5);
                addMessage({
                  type: "agent",
                  content: "Congratulations! You're pre-qualified. We just need a few more documents to evaluate your application:",
                });
              }}
              label="Upload Tax Return"
              uploaded={taxReturnUploaded}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <DocumentUpload
              onUpload={() => {
                setAdditionalDocs((prev) => ({ ...prev, bankStatements: true }));
                checkAllDocsUploaded();
              }}
              label="Bank Statements"
              uploaded={additionalDocs.bankStatements}
            />
            <DocumentUpload
              onUpload={() => {
                setAdditionalDocs((prev) => ({ ...prev, businessPlan: true }));
                checkAllDocsUploaded();
              }}
              label="Business Plan"
              uploaded={additionalDocs.businessPlan}
            />
            <DocumentUpload
              onUpload={() => {
                setAdditionalDocs((prev) => ({ ...prev, financialProjections: true }));
                checkAllDocsUploaded();
              }}
              label="Financial Projections"
              uploaded={additionalDocs.financialProjections}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const checkAllDocsUploaded = () => {
    if (Object.values(additionalDocs).every((val) => val)) {
      addMessage({
        type: "agent",
        content: "Thanks for submitting your loan application! Our Loan Consultant will be in touch with you shortly. If you have any questions, please reach out at +1 (800) 123-4567.",
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(600px-64px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "agent" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "agent"
                  ? "bg-gray-100"
                  : "bg-leaf-primary text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">{renderCurrentStep()}</div>
    </div>
  );
};

export default ChatInterface;