import React from "react";

export function Loading(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-50">
      <img
        className="w-80 h-auto animate-bounce"
        src="/images/logo-black.png"
      />
    </div>
  );
}
