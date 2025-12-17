'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface LoadingContextType {
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
}

// Create the context with a default value
export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);



export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
