const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Homescreen from "./screens/Homescreen";
import Closed1 from "./screens/Closed1";
import NewIncident from "./screens/NewIncident";
import Pending from "./screens/Pending";
import MTTI from "./screens/MTTI";
import MTTR from "./screens/MTTR";
import MTTD from "./screens/MTTD";
import { DataProvider , TimeProvider } from "./components/util";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from 'react-native-popup-menu';
import Login from "./screens/Login";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <DataProvider>
      <TimeProvider>
        <MenuProvider>
          <NavigationContainer>
            {hideSplashScreen ? (
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Homescreen"
                  component={Homescreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Closed1"
                  component={Closed1}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="NewIncident"
                  component={NewIncident}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Pending"
                  component={Pending}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MTTI"
                  component={MTTI}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MTTR"
                  component={MTTR}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MTTD"
                  component={MTTD}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : null}
          </NavigationContainer>
        </MenuProvider>
      </TimeProvider>
    </DataProvider>
  );
};
export default App;
