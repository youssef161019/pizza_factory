const formatPizzaToppings = (toppingsList) => {
  if (!(Array.isArray(toppingsList) && toppingsList.length)) return [];
  return [
    ...new Set(
      toppingsList.reduce((acm, topping) => {
        let toppingShape = {
          name: topping.name && topping.name.toLowerCase(),
        };
        if (topping._id) toppingShape.topping_data = topping._id;
        acm.push(toppingShape);
        return acm;
      }, [])
    ),
  ];
};
const dataUtils = { formatPizzaToppings };
module.exports = dataUtils;
