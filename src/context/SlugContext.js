import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSlug } from "../redux/deploymentSlice";

const SlugContext = createContext();

export function SlugProvider({ children }) {
  const [slug, setSlugState] = useState(() => {
    const savedSlug = localStorage.getItem("slug");
    return savedSlug ? JSON.parse(savedSlug) : null;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug !== null) {
      localStorage.setItem("slug", JSON.stringify(slug));
      dispatch(setSlug(slug));
    } else {
      localStorage.removeItem("slug");
      dispatch(setSlug(null));
    }
  }, [slug, dispatch]);

  return (
    <SlugContext.Provider value={{ slug, setSlug: setSlugState }}>
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
