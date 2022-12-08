import React from "react";
import { useEffect, useState } from "react";
import "./toppings.scss";

import Topping from "../../components/Topping/Topping";
import ToppingInput from "../../components/ToppingInputModal/ToppingInputModal";
import Loading from "../../components/Loading/Loading";
import Navs from "../../components/Navs/Navs";
import { useToppings } from "../../context/ToppingsContext";
import toppingsApi from "../../api/toppingsApiProvider";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";

function Toppings() {
  const [toppingsList, updateToppingsList] = useToppings();
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [selectedTopping, setSelectedTopping] = useState({});
  const [inputError, setInputError] = useState("");
  const [loadingOn, setLoadingOn] = useState(false);
  const [onConfirm, setOnConfirm] = useState();
  // validate toppings data before submitting
  const toppingValidation = (toppingName) => {
    let isDuplicated = toppingsList.some(
      (topping) => topping.name === toppingName
    );
    if (isDuplicated) {
      setInputError(`Topping ${toppingName} is Already Available`);
    }
    return !isDuplicated;
  };

  const submitTopping = (toppingName, toppingId = undefined) => {
    toppingId
      ? updateTopping(toppingName, toppingId)
      : addNewTopping(toppingName);
  };

  const showAddTopping = () => {
    setSelectedTopping({});
    setInputModalOpen(true);
  };

  const showToppingUpdater = (toppingId) => {
    let upTopping = toppingsList.find((topping) => topping._id === toppingId);
    if (upTopping) {
      setSelectedTopping(upTopping);
      setInputModalOpen(true);
    }
  };

  const addNewTopping = async (toppingName) => {
    if (!toppingValidation(toppingName)) return;
    hideOverlay();
    setLoadingOn(true);
    try {
      const result = await toppingsApi.addNewTopping({ name: toppingName });
      updateToppingsList((prev) => [...prev, result]);
    } catch (error) {
      setInputModalOpen(true);
      setInputError(`Problem adding ${toppingName}`);
    } finally {
      setLoadingOn(false);
    }
  };

  const updateTopping = async (toppingName, toppingId) => {
    if (!toppingValidation(toppingName)) return;

    hideOverlay();
    setLoadingOn(true);
    try {
      await toppingsApi.updateTopping(toppingId, {
        name: toppingName,
      });
      updateToppingsList((prev) =>
        prev.map((topping) => {
          if (topping._id === toppingId) {
            topping.name = toppingName;
          }
          return topping;
        })
      );
    } catch (error) {
      setInputModalOpen(true);
      setInputError(`Problem Updating the Topping ${toppingName}`);
    } finally {
      setLoadingOn(false);
    }
  };
  const hideConfirmation = () => setOnConfirm();

  const removeTopping = (toppingId) => {
    let removalObject = {
      title: "Topping Removal",
      message: "would you like to remove this Topping from your Toppings list",
      onCancel: hideConfirmation,
      onConfirm: () => {
        toppingRemoval(toppingId);
      },
      yesButton: "Remove",
    };
    setOnConfirm(removalObject);
  };

  const toppingRemoval = async (toppingId) => {
    hideConfirmation();
    setLoadingOn(true);
    try {
      const result = await toppingsApi.removeTopping(toppingId);
      if (result.acknowledged) {
        updateToppingsList((prev) =>
          prev.filter((topping) => topping._id !== toppingId)
        );
      }
    } catch (error) {
      console.error("removal error", error);
    } finally {
      setLoadingOn(false);
    }
  };

  const hideOverlay = () => {
    setInputModalOpen(false);
    if (inputError) setInputError("");
  };

  useEffect(() => {
    async function getToppingsList() {
      try {
        setLoadingOn(true);
        const result = await toppingsApi.getToppingsList();
        updateToppingsList(result);
      } catch (error) {
        console.error("list upload error", error);
      } finally {
        setLoadingOn(false);
      }
    }
    if (!toppingsList.length) {
      getToppingsList();
    }
  }, []);

  // make sure the loading screen is hidden after the timeout
  useEffect(() => {
    let loadingTimer;
    if (loadingOn) {
      loadingTimer = setTimeout(setLoadingOn, 4000, false);
    }
    return () => {
      clearTimeout(loadingTimer);
    };
  }, [loadingOn]);

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };
  return (
    <div className="toppings_page">
      <Navs title={"Toppings Page"} />
      <main className="toppings_list-container">
        <h3 className="list-title">Toppings List :</h3>
        {!toppingsList.length && <div className="no_avalable_item">No Available Toppings</div>}

        <ul className="toppings_list">
          {toppingsList.map((topping) => (
            <Topping
              key={topping._id}
              {...topping}
              showToppingUpdater={showToppingUpdater}
              removeTopping={removeTopping}
            />
          ))}
        </ul>

        <button onClick={showAddTopping} className="Add_new_button Button">
          Add New Topping
        </button>
      </main>

      {inputModalOpen && (
        <ToppingInput
          hideOverlay={hideOverlay}
          selectedTopping={selectedTopping}
          submitTopping={submitTopping}
          inputError={inputError}
        />
      )}
      {loadingOn && <Loading />}
      {onConfirm && <ConfirmAlert onConfirm={onConfirm}></ConfirmAlert>}
    </div>
  );
}

export default Toppings;
