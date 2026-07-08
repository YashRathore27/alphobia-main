import { useEffect, useState } from "react";

const VALID = [
  "home",
  "digital-marketing",
  "affiliate-marketing",
  "advertising-programs",
  "case-studies",
  "industries",
  "about",
  "insights",
  "insight",
  "contact"
];

function getRoute() {
  const h = window.location.hash.replace(/^#\/?/, "");
  const parts = h.split("/");
  const route = parts[0];
  
  if (VALID.includes(route)) {
    return { route, id: parts[1] || void 0 };
  }
  return { route: "home" };
}

function navigate(r, id) {
  window.location.hash = id ? `/${r}/${id}` : `/${r}`;
}

function useRoute() {
  const [state, setState] = useState(getRoute);
  
  useEffect(() => {
    const onHash = () => {
      setState(getRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  
  return state;
}

export {
  navigate,
  useRoute
};
