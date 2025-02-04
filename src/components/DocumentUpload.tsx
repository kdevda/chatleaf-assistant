import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface DocumentUploadProps {
  onUpload: () => void;
  label: string;
  uploaded?: boolean;
}

const DocumentUpload = ({ onUpload, label, uploaded }: DocumentUploadProps) => {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {uploaded ? (
        <span className="text-green-500 flex items-center gap-2">
          <Check size={16} /> Uploaded
        </span>
      ) : (
        <Button onClick={onUpload} variant="outline">
          Upload
        </Button>
      )}
    </div>
  );
};

export default DocumentUpload;