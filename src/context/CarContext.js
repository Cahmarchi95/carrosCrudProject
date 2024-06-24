import React, { createContext, useContext, useReducer, useEffect } from "react";

const CarContext = createContext();

const initialState = {
  cars: [],
};

const carReducer = (state, action) => {
  switch (action.type) {
    case "setCarList":
      return { ...state, cars: action.payload };
    case "deleteCar":
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload.id),
      };
    case "createCar":
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };
    case "updateCar":
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? action.payload : car
        ),
      };
    default:
      return state;
  }
};

export const CarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carReducer, initialState);

  const getCarList = async () => {
    try {
      const response = await fetch("http://192.168.0.40:8080/api/v1/carros");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      dispatch({ type: "setCarList", payload: data });
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const deleteCar = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.0.40:8080/api/v1/carros/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204) {
        dispatch({ type: "deleteCar", payload: { id: id } });
        console.log("Carro deletado com sucesso.");
      } else if (!response.ok) {
        throw new Error("Erro ao deletar carro");
      }
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  };

  const createCar = async (newCarData) => {
    try {
      const response = await fetch(`http://192.168.0.40:8080/api/v1/carros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCarData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar carro");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro na requisição POST:", error);
      throw error;
    }
  };

  const updateCar = async (id, updatedCarData) => {
    try {
      const response = await fetch(
        `http://192.168.0.40:8080/api/v1/carros/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCarData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar carro");
      }

      const updatedCar = await response.json();
      dispatch({ type: "updateCar", payload: updatedCar });
      console.log("Carro atualizado com sucesso.");
    } catch (error) {
      console.error("Erro na requisição PUT:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCarList();
  }, []);

  return (
    <CarContext.Provider
      value={{ state, dispatch, deleteCar, createCar, updateCar }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => useContext(CarContext);
