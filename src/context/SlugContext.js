import React, { createContext, useState, useContext, useEffect } from "react";

const SlugContext = createContext();

export function SlugProvider({ children }) {
  const [slug, setSlug] = useState(() => {
    const savedSlug = localStorage.getItem("slug");
    return savedSlug ? JSON.parse(savedSlug) : null;
  });
console.log("slug picked:", slug)

  useEffect(() => {
    if (slug !== null) {
      localStorage.setItem("slug", JSON.stringify(slug));
    } else {
      localStorage.removeItem("slug");
    }
  }, [slug]);

  return (
    <SlugContext.Provider value={{ slug, setSlug }}>
      {children}
    </SlugContext.Provider>
  );
}

export function useSlug() {
  const context = useContext(SlugContext);
  if (context === undefined) {
    throw new Error("useSlug must be used within a SlugProvider");
  }
  return context;
}
