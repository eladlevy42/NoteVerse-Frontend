import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ children, onclose }) => {
  const nav = useNavigate();

  function goBack() {
    if (onclose) {
      onclose();
    }
    nav(-1);
  }

  return (
    <div
      className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
      onClick={goBack}
    >
      <div
        className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-6 rounded-lg max-w-lg w-full transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
