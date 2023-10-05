import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Preference from './src/screens/Preference'
import ContactUs from './src/screens/ContactUs'
import LandingPage from './src/screens/LandingPage'
import Map from './src/screens/map'



const Tab = createBottomTabNavigator()

function TabGroup() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='LandingPage' component={LandingPage}/>
            <Tab.Screen name='Preference' component={Preference}/>
            <Tab.Screen name='ContactUs' component={ContactUs}/>
            <Tab.Screen name='Map' component={Map}/>
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

