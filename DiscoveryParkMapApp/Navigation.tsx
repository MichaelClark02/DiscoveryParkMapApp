import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, StyleSheet } from 'react-native'
import Preference from './src/screens/Preference'
import ContactUs from './src/screens/ContactUs'
import LandingPage from './src/screens/LandingPage'
import Map from './src/screens/map'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator()

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: '#707070',
                tabBarActiveTintColor: "#00853E",
            }}
            >
            <Tab.Screen 
            name='LandingPage' 
            component={LandingPage}
            options={{
                tabBarIcon: ({focused}) => (
                    <Entypo name="home" size={24} color={focused ? "#00853E" : "#707070"}
                     />
                )
            }}/>

            <Tab.Screen 
                name='Preferences' 
                component={Preference}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Ionicons name="filter" size={24} color={focused ? "#00853E" : "#707070"} />
                    )
                }}/>

            <Tab.Screen 
                name='ContactUs' 
                component={ContactUs}
                options={{
                    tabBarIcon: ({focused}) => (
                    <Entypo name="phone" size={24} color={focused ? "#00853E" : "#707070"} />
                    )
                }}/>

            <Tab.Screen 
                name='Map' 
                component={Map}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Entypo name="map" size={24} color={focused ? "#00853E" : "#707070"} />
                    )
                }}/>
        </Tab.Navigator>
    )
}

export default function Navigation () {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    )
}
