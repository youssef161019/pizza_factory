import { createContext, useState, useContext } from "react";
const ToppingsContext = createContext();

const ToppingsProvider = (props) => {
  const [toppingsList, setToppingsList] = useState([]);
  const updateToppingsList = (newToppinsList) => {
    setToppingsList(newToppinsList);
  };
  return (
    <ToppingsContext.Provider
      value={[toppingsList, updateToppingsList]}
      {...props}
    />
  );
};

const useToppings = () => {
  const context = useContext(ToppingsContext);
  if (!context) throw new Error("requested context is not available");
  return context;
};

export { ToppingsProvider, useToppings };
