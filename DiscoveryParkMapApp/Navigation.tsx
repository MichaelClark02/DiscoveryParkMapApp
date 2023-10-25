import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Preference from './src/screens/Preference'
import ContactUs from './src/screens/ContactUs'
import LandingPage from './src/screens/LandingPage'
import Map from './src/screens/map'
import Search from './src/screens/search'



const Tab = createBottomTabNavigator()

function TabGroup() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='LandingPage' component={LandingPage} options={{ headerShown: false }}/>
            <Tab.Screen name='Preference' component={Preference} options={{ headerShown: false }}/>
            <Tab.Screen name='ContactUs' component={ContactUs} options={{ headerShown: false }}/>
            <Tab.Screen name='Map' component={Map} options={{ headerShown: false }}/>
            <Tab.Screen name='Search' component={Search} options={{ headerShown: false }}/>
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

