import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DocumentUpload from "./DocumentUpload";

interface Message {
  type: "agent" | "user";
  content: string;
}

interface PersonalDetails {
  fullName: string;
  idNumber: string;
  dob: string;
  address: string;
}

interface BusinessDetails {
  businessName: string;
  directors: string;
  businessAddress: string;
}

const ChatInterface = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTypes, setLoanTypes] = useState<string[]>([]);
  const [loanPurposes, setLoanPurposes] = useState<string[]>([]);
  const [idUploaded, setIdUploaded] = useState({ front: false, back: false });
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: "Sample Connor",
    idNumber: "S99988801",
    dob: "01/12/1983",
    address: "123 North Main Street, Apt 1, North Quincy, MA 02171-1748"
  });
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: "Field and Vine Restaurant, Inc.",
    directors: "Sample Connor",
    businessAddress: "9 Sanborn Ct, Somerville, MA 02143, United States"
  });
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const [taxReturnUploaded, setTaxReturnUploaded] = useState(false);
  const [additionalDocs, setAdditionalDocs] = useState({
    incomestatements: false,
    balancesheet: false,
    cashflowstatement: false,
    projectedincomestatement: false,
  });
  const [inputMessage, setInputMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    setTimeout(() => {
      addMessage({
        type: "agent",
        content: "Hi! I'm your Leaf Fund loan agent. I'm here to help you apply for a loan. Let's get started! What loan amount are you looking for?",
      });
    }, 500);
  }, []);

  const handleFileUpload = (type: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        addMessage({
          type: "user",
          content: `Uploaded ${type}: ${file.name}`,
        });

        if (type.includes('ID')) {
          const side = type.includes('front') ? 'front' : 'back';
          setIdUploaded(prev => ({ ...prev, [side]: true }));
          
          setTimeout(() => {
            addMessage({
              type: "agent",
              content: `Thank you for uploading the ${side} of your ID.`,
            });
            
            setTimeout(() => {
              if (side === 'front' && !idUploaded.back) {
                addMessage({
                  type: "agent",
                  content: "Please upload the back of your ID.",
                });
              } else if (side === 'back' && !idUploaded.front) {
                addMessage({
                  type: "agent",
                  content: "Please upload the front of your ID.",
                });
              }
              
              if ((side === 'front' && idUploaded.back) || (side === 'back' && idUploaded.front)) {
                setTimeout(() => {
                  setShowPersonalDetails(true);
                  addMessage({
                    type: "agent",
                    content: "We've extracted the following information from your ID. Please verify if it's correct:",
                  });
                }, 1000);
              }
            }, 1000);
          }, 1000);
        } else if (type === 'Tax Return') {
          setTaxReturnUploaded(true);
          
          setTimeout(() => {
            addMessage({
              type: "agent",
              content: "Thank you for uploading your Tax Return.",
            });
            
            setTimeout(() => {
              setShowBusinessDetails(true);
              addMessage({
                type: "agent",
                content: "We've extracted the following information from your tax return. Please verify if it's correct:",
              });
            }, 1000);
          }, 1000);
        } else {
          const docKey = type.toLowerCase().replace(/\s+/g, '') as keyof typeof additionalDocs;
          console.log(docKey);
          setAdditionalDocs(prev => ({ ...prev, [docKey]: true }));
          
          setTimeout(() => {
            addMessage({
              type: "agent",
              content: `Thank you for uploading your ${type}.`,
            });
            
            const updatedDocs = {
              ...additionalDocs,
              [docKey]: true
            };
            
            if (Object.values(updatedDocs).every(val => val)) {
              setTimeout(() => {
                addMessage({
                  type: "agent",
                  content: "Thanks for submitting your loan application! Our Loan Consultant will be in touch with you shortly. If you have any questions, please reach out at +1 (800) 123-4567.",
                });
              }, 1000);
            }
          }, 1000);
        }
      }
    };
    input.click();
  };

  const handleLoanAmountSubmit = () => {
    if (!loanAmount.trim()) return;
    
    const amount = loanAmount.replace(/[^0-9]/g, '');
    addMessage({ type: "user", content: `Loan amount: $${amount}` });
    addMessage({
      type: "agent",
      content: "Great! What types of loan are you interested in?",
    });
    setStep(1);
  };

  const handleLoanTypeSelect = (value: string) => {
    const updatedTypes = loanTypes.includes(value)
      ? loanTypes.filter(type => type !== value)
      : [...loanTypes, value];
    setLoanTypes(updatedTypes);
    
    if (updatedTypes.length > 0) {
      addMessage({ type: "user", content: `Selected loan types: ${updatedTypes.join(", ")}` });
      if (step === 1) {
        addMessage({
          type: "agent",
          content: "What is the purposes for this loan?",
        });
        setStep(2);
      }
    }
  };

  const handleLoanPurposeSelect = (value: string) => {
    const updatedPurposes = loanPurposes.includes(value)
      ? loanPurposes.filter(purpose => purpose !== value)
      : [...loanPurposes, value];
    setLoanPurposes(updatedPurposes);
    
    if (updatedPurposes.length > 0) {
      addMessage({ type: "user", content: `Selected loan purposes: ${updatedPurposes.join(", ")}` });
      if (step === 2) {
        addMessage({
          type: "agent",
          content: "Please upload your ID for verification. We need both front and back images.",
        });
        setStep(3);
      }
    }
  };

  const handlePersonalDetailsVerification = (verified: boolean) => {
    if (verified) {
      addMessage({
        type: "user",
        content: "Personal details verified",
      });
      addMessage({
        type: "agent",
        content: "Great! Now let's verify your business details. Please upload the Article or Incorporation/Organization.",
      });
      setShowPersonalDetails(false);
      setStep(4);
    }
  };

  const handleTaxReturnUpload = () => {
    handleFileUpload('Tax Return');
    setTaxReturnUploaded(true);
    setShowBusinessDetails(true);
    addMessage({
      type: "agent",
      content: "We've extracted the following information from your Article of Incorporation. Please verify if it's correct:",
    });
  };

  const handleBusinessDetailsVerification = (verified: boolean) => {
    if (verified) {
      setShowBusinessDetails(false);
      addMessage({
        type: "user",
        content: "Business details verified",
      });
      setStep(5);
      addMessage({
        type: "agent",
        content: "Congratulations! You're pre-qualified. We just need a few more documents to evaluate your application:",
      });
    }
  };

  const handleAdditionalDocUpload = (docType: keyof typeof additionalDocs) => {
    handleFileUpload(docType);
    // setAdditionalDocs((prev) => ({ ...prev, [docType]: true }));
    checkAllDocsUploaded();
  };

  const checkAllDocsUploaded = () => {
    if (Object.values(additionalDocs).every((val) => val)) {
      addMessage({
        type: "agent",
        content: "Thanks for submitting your loan application! Our Loan Consultant will be in touch with you shortly. If you have any questions, please reach out at +1 617-232-1551. Your Application Reference# is FIAAPP-00000806.",
      });
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addMessage({
        type: "user",
        content: inputMessage,
      });
      setInputMessage("");
    }
  };

  const renderCurrentStep = () => {
    const allStepsCompleted = step === 5 && Object.values(additionalDocs).every(val => val);
    
    if (allStepsCompleted) {
      return (
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="flex gap-2">
            <Input
              type="text"
              value={loanAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\$?\d*$/.test(value)) {
                  setLoanAmount(value.replace('$', ''));
                }
              }}
              placeholder="Enter amount (e.g. 50000)"
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLoanAmountSubmit();
                }
              }}
            />
            <Button onClick={handleLoanAmountSubmit}>Submit</Button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-2">
            {["Term Loan", "Line of Credit", "Invoice Financing", "Merchant Cash Advance"].map((type) => (
              <Button
                key={type}
                variant={loanTypes.includes(type) ? "default" : "outline"}
                onClick={() => handleLoanTypeSelect(type)}
                className="w-full"
              >
                {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
              </Button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            {["Marketing", "Expansion", "Working Capital", "Consolidating Debt", "Purchasing Equipment"].map((purpose) => (
              <Button
                key={purpose}
                variant={loanPurposes.includes(purpose) ? "default" : "outline"}
                onClick={() => handleLoanPurposeSelect(purpose)}
                className="w-full"
              >
                {purpose.charAt(0).toUpperCase() + purpose.slice(1).replace("-", " ")}
              </Button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <DocumentUpload
              onUpload={() => handleFileUpload("ID front")}
              label="Upload ID Front"
              uploaded={idUploaded.front}
            />
            <DocumentUpload
              onUpload={() => handleFileUpload("ID back")}
              label="Upload ID Back"
              uploaded={idUploaded.back}
            />
            {showPersonalDetails && (
              <div className="mt-4 p-4 border rounded-lg space-y-2">
                <h3 className="font-semibold">Personal Details</h3>
                <p>Full Name: {personalDetails.fullName}</p>
                <p>ID Number: {personalDetails.idNumber}</p>
                <p>Date of Birth: {personalDetails.dob}</p>
                <p>Address: {personalDetails.address}</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handlePersonalDetailsVerification(true)}>
                    Looks Good
                  </Button>
                  <Button variant="outline" onClick={() => setShowPersonalDetails(false)}>
                    Modify
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <DocumentUpload
              onUpload={() => handleFileUpload("Tax Return")}
              label="Upload Tax Return"
              uploaded={taxReturnUploaded}
            />
            {showBusinessDetails && (
              <div className="mt-4 p-4 border rounded-lg space-y-2">
                <h3 className="font-semibold">Business Details</h3>
                <p>Business Name: {businessDetails.businessName}</p>
                <p>Directors: {businessDetails.directors}</p>
                <p>Business Address: {businessDetails.businessAddress}</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleBusinessDetailsVerification(true)}>
                    Looks Good
                  </Button>
                  <Button variant="outline" onClick={() => setShowBusinessDetails(false)}>
                    Modify
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <DocumentUpload
              onUpload={() => handleAdditionalDocUpload('incomestatements')}
              label="Income Statements (Last 2 Years)"
              uploaded={additionalDocs.incomestatements}
            />
            <DocumentUpload
              onUpload={() => handleAdditionalDocUpload('balancesheet')}
              label="Balance Sheet (Current and Projected)"
              uploaded={additionalDocs.balancesheet}
            />
            <DocumentUpload
              onUpload={() => handleAdditionalDocUpload('cashflowstatement')}
              label="Cash Flow Statement (Current and Projected)"
              uploaded={additionalDocs.cashflowstatement}
            />
            <DocumentUpload
              onUpload={() => handleAdditionalDocUpload('projectedincomestatement')}
              label="Income Statements (Projected Next 5 Years)"
              uploaded={additionalDocs.projectedincomestatement}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(80vh-64px)]">
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
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-white">
        {renderCurrentStep()}
        {step === 5 && !Object.values(additionalDocs).every(val => val) && (
          <div className="flex gap-2 mt-4">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
