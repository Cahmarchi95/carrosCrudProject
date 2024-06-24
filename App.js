import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { CarProvider } from "./src/context/CarContext";
import CarsList from "./src/views/CarsList";
import CarsForm from "./src/views/CarsForm";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CarProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CarsList"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="CarsList"
            component={CarsList}
            options={({ navigation }) => {
              return {
                title: "Lista de Carros",
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate("CarsForm")}>
                    <Icon name="add" size={25} color="white" />
                  </Pressable>
                ),
              };
            }}
          />
          <Stack.Screen
            name="CarsForm"
            component={CarsForm}
            options={{ title: "Cadastro de Carros" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CarProvider>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: "#5d83c4",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
