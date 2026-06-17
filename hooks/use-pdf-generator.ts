"use client";

import { useCallback, useState, useRef, type RefObject } from "react";
import { useReactToPrint } from "react-to-print";
import type { ResumeData } from "@/types";

export function usePdfGenerator(contentRef: RefObject<HTMLElement | null>) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Use a ref to store the promise resolve function
  const resolvePromiseRef = useRef<((value: void) => void) | null>(null);

  const generate = useReactToPrint({
    contentRef: contentRef,
    documentTitle: "Resume",
    onAfterPrint: () => {
      setIsGenerating(false);
      if (resolvePromiseRef.current) {
        resolvePromiseRef.current();
        resolvePromiseRef.current = null;
      }
    },
    onPrintError: () => {
      setIsGenerating(false);
      if (resolvePromiseRef.current) {
        resolvePromiseRef.current();
        resolvePromiseRef.current = null;
      }
    },
  });

  const generatePDF = useCallback(
    () => {
      return new Promise<void>((resolve) => {
        setIsGenerating(true);
        resolvePromiseRef.current = resolve;
        
        // Timeout ensures any pending state updates to the template finish
        setTimeout(() => {
          if (generate && contentRef.current) {
            generate();
          } else {
            setIsGenerating(false);
            resolve();
          }
        }, 300);
      });
    },
    [generate, contentRef]
  );

  return { generatePDF, isGenerating };
}
