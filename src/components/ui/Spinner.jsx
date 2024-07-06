import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center h-full self-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default Spinner;