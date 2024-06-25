import React from "react";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-background">{children}</div>
    </div>
  );
}