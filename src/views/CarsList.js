import React from "react";
import { FlatList, ScrollView } from "react-native";
import { ListItem } from "@rneui/themed";
import { useCarContext } from "./../context/CarContext";
import { useNavigation } from "@react-navigation/native";

const ListaCarros = (props) => {
  const { state, deleteCar } = useCarContext();
  const navigation = useNavigation();

  const handleRemove = (id) => {
    deleteCar(id);
  };

  const getCarItem = ({ item: car }) => {
    const cores = car.cores.map((cor) => cor.nomecor).join(", ");

    const navigateToCarForm = () => {
      navigation.navigate("CarsForm", { car });
    };

    return (
      <ListItem key={car.id} bottomDivider onPress={navigateToCarForm}>
        <ListItem.Content>
          <ListItem.Title>{car.nomecarro}</ListItem.Title>
          <ListItem.Subtitle>
            Ano Fabricação: {car.anofabricacaocarro}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Ano modelo: {car.anomodelocarro}
          </ListItem.Subtitle>
          <ListItem.Subtitle>Modelo: {car.modelocarro}</ListItem.Subtitle>
          <ListItem.Subtitle>Marca: {car.marca.nomemarca}</ListItem.Subtitle>
          <ListItem.Subtitle>Cores: {cores}</ListItem.Subtitle>
          <ListItem.Chevron
            name="edit"
            size={25}
            color="blue"
            onPress={navigateToCarForm}
            containerStyle={{ position: "absolute", right: 40, top: 10 }}
          />
          <ListItem.Chevron
            name="delete"
            size={25}
            color="red"
            onPress={() => handleRemove(car.id)}
            containerStyle={{ position: "absolute", right: 10, top: 10 }}
          />
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <ScrollView>
      <ScrollView>
        <FlatList
          keyExtractor={(car) => car.id.toString()}
          data={state.cars}
          renderItem={getCarItem}
        />
      </ScrollView>
    </ScrollView>
  );
};

export default ListaCarros;
