import { createContext } from "react";

export const ServiceContext = createContext({
  activeService: null,
  setActiveService: () => {}
});
