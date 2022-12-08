// make sure the pizza data are formatted right
const formatPizzasData = (pizzasList) => {
  return pizzasList.map((pizza) => ({
    _id: pizza._id,
    name: pizza.name,
    toppings: pizzaToppingFormating(pizza.toppings),
  }));
};

// this function will verify if the toppings are still available
// check if the toppings did change or no and update the toppings list in case of update
const pizzaToppingFormating = (toppings) => {
  return toppings.map((topping) => {
    let isAvailable = topping.topping_data;
    if (isAvailable) {
      return {
        name: topping.topping_data.name,
        _id: topping.topping_data._id,
      };
    }
    return { name: topping.name, removed: true };
  });
};
const sortByName = (a, b) => (a.name > b.name ? 1 : -1);


// this function is used to check the initial states of the toppings
// if the topping is used or not
const pizzaToppingsState = (pizzaToppings, savedToppingsList) => {
  let mappedToppingsList = [];
  if (!pizzaToppings.length) {
    mappedToppingsList = savedToppingsList.map((topping) => ({
      ...topping,
      used: false,
    }));
  } else {
    // add all the pizza toppings and mark them as used
    mappedToppingsList = pizzaToppings.map((topping) => ({
      ...topping,
      used: true,
    }));
    // get the toppings by id list to make the search faster and cleaner
    let toppingsInUseIds = mappedToppingsList.map((topping) => topping._id);
    savedToppingsList.forEach((topping) => {
      if (!toppingsInUseIds.includes(topping._id))
        mappedToppingsList.push({ ...topping, used: false });
    });
  }

  mappedToppingsList.sort(sortByName);
  return mappedToppingsList;
};
// check if the want be added pizza is already available in the list
// in case of a problem the function will return an array with 2 elements
//1:the error type ,name:the name exist ,topping : the list of topping already used
//2: the duplicated element found

const verifyPizzaDuplicat = (availablePizzas, addedPizza, pizzaId) => {
  let newPizzaHash = toppingsListHash(addedPizza.toppings);
  let toppingsCount = addedPizza.toppings.length;
  for (const pizza of availablePizzas) {
    if (pizzaId && pizzaId === pizza._id) continue;
    if (pizza.name === addedPizza.name) {
      return ["name", pizza];
    }
    if (
      pizza.toppings.length === toppingsCount &&
      toppingsListHash(pizza.toppings) === newPizzaHash
    ) {
      return ["toppings", pizza];
    }
  }
  return [];
};

const toppingsListHash = (toppingsList) => {
  if (!Array.isArray(toppingsList) || !toppingsList.length) return "";
  const sortFn = (a, b) => (a._id > b._id ? 1 : -1);
  toppingsList.sort(sortFn);
  return toppingsList.map((topping) => topping._id).toString();
};

export {
  verifyPizzaDuplicat,
  formatPizzasData,
  pizzaToppingFormating,
  pizzaToppingsState,
  sortByName
};
