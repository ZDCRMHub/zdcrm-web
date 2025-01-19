import { ReactNode, useState } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

export const CloudinaryLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  
    return (
      <LoadingContext.Provider
        value={{
          isUploading,
          setIsUploading,
          isGenerating,
          setIsGenerating,
          isDeleting,
          setIsDeleting,
        }}
      >
        {children}
      </LoadingContext.Provider>
    );
  };