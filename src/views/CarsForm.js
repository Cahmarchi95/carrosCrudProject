import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCarContext } from "./../context/CarContext";
import { useNavigation } from "@react-navigation/native";

const CarForm = ({ route }) => {
  const { dispatch } = useCarContext();
  const { car: initialCar } = route.params || {};
  const navigation = useNavigation();

  const [car, setCar] = useState(
    initialCar || {
      nomecarro: "",
      anofabricacaocarro: "",
      anomodelocarro: "",
      modelocarro: "",
      marca: { nomemarca: "" },
      cores: [],
    }
  );

  const formatCores = () => {
    if (car.cores && car.cores.length > 0) {
      return car.cores.map((cor) => cor.nomecor).join(", ");
    } else {
      return "";
    }
  };

  const handleSaveCar = () => {
    const apiUrl = initialCar
      ? `http://192.168.0.40:8080/api/v1/carros/${car.id}`
      : "http://192.168.0.40:8080/api/v1/carros";

    const method = initialCar ? "PUT" : "POST";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar carro");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: initialCar ? "updateCar" : "createCar",
          payload: data,
        });
        navigation.navigate("CarsList");
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <View style={style.form}>
      <Text>Nome:</Text>
      <TextInput
        style={style.input}
        onChangeText={(nomecarro) => setCar({ ...car, nomecarro })}
        placeholder="Ex. Gol"
        value={car.nomecarro}
      />
      <Text>Ano de Fabricação:</Text>
      <TextInput
        style={style.input}
        keyboardType="numeric"
        onChangeText={(anofabricacaocarro) =>
          setCar({ ...car, anofabricacaocarro: parseInt(anofabricacaocarro) })
        }
        placeholder="Ex. 2017"
        value={car.anofabricacaocarro ? car.anofabricacaocarro.toString() : ""}
      />
      <Text>Ano do Modelo:</Text>
      <TextInput
        style={style.input}
        keyboardType="numeric"
        onChangeText={(anomodelocarro) =>
          setCar({ ...car, anomodelocarro: parseInt(anomodelocarro) })
        }
        placeholder="Ex. 2018"
        value={car.anomodelocarro ? car.anomodelocarro.toString() : ""}
      />
      <Text>Modelo:</Text>
      <TextInput
        style={style.input}
        onChangeText={(modelocarro) => setCar({ ...car, modelocarro })}
        placeholder="Ex. G8"
        value={car.modelocarro}
      />
      <Text>Marca:</Text>
      <TextInput
        style={style.input}
        onChangeText={(nomemarca) =>
          setCar({ ...car, marca: { ...car.marca, nomemarca } })
        }
        placeholder="Ex. Chevrolet"
        value={car.marca ? car.marca.nomemarca : ""}
      />
      <Text>Cores:</Text>
      <TextInput
        style={style.input}
        onChangeText={(cores) => {
          const coresArray = cores
            .split(",")
            .map((cor) => ({ idcor: Math.random(), nomecor: cor.trim() }));
          setCar({ ...car, cores: coresArray });
        }}
        placeholder="Ex. Preto, Verde, Azul"
        value={formatCores()}
      />
      <TouchableOpacity
        style={[style.button, { backgroundColor: "#5d83c4" }]}
        onPress={handleSaveCar}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default CarForm;
