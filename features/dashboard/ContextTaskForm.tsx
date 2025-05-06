"use client";
import React, { createContext, useContext, useState } from "react";

type ContextTaskFormData = {
  open: boolean;
  action: string;
  taskId: string | null;
};

type ContextTaskFormDataType = {
  formData: ContextTaskFormData;
  setFormData: (data: ContextTaskFormData) => void;
  resetState: () => void;
};

const ContextTaskFormContext = createContext<
  ContextTaskFormDataType | undefined
>(undefined);

const initialState: ContextTaskFormData = {
  open: false,
  action: "add",
  taskId: null,
};
export const useContextTaskForm = () => {
  const ctx = useContext(ContextTaskFormContext);
  if (!ctx)
    throw new Error("useContextMenu must be used within ContextMenuProvider");
  return ctx;
};

const ContextTaskFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<ContextTaskFormData>(initialState);

  const resetState = () => {
    setFormData(initialState);
  };
  return (
    <ContextTaskFormContext.Provider
      value={{ formData, setFormData, resetState }}
    >
      {children}
    </ContextTaskFormContext.Provider>
  );
};
export default ContextTaskFormProvider;
