import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Welcome from "../../Screens/Welcome";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";
import SignUp from "../../Auth/SignUp";
import Login from "../../Auth/Login";
import StdForm from "../../Screens/Student/StdForm";
import forgotPassword from "../../Auth/forgotPassword";
import Portal from "../../Screens/Student/Portal";
import Profile from "../../Screens/Student/Profile";
import Admin from "../../Screens/Admin/Admin";
import SentUpdate from "../../Screens/Admin/SentUpdate";
import Updates from "../../Screens/Student/Updates";
import StudentConfirm from "../../Screens/Admin/StudentConfirm";
import StudentGet from "../../Screens/Admin/StudentsGet";
import WorkshopReminder from "../../Screens/Admin/WorkshopReminder";
import Workshops from "../../Screens/Student/Workshops";
import Assignments from "../../Screens/Student/Assignmnets";
import Schedule from "../../Screens/Student/Schedule";
import Progress from "../../Screens/Student/Progress";
import WorkshopDelete from "../../Screens/Admin/WorkshopDelete";
import Queries from "../../Screens/Student/Queries";
import StudentQueries from "../../Screens/Admin/StudentQueries";
import Setting from "../../Screens/Student/Setting";
import AboutApp from "../../Screens/Student/AboutApp";




export default function AppNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                    <Stack.Screen name="StdForm" options={{ headerShown: false }} component={StdForm} />
                    <Stack.Screen name="forgotPassword" options={{ headerShown: false, }} component={forgotPassword} />
                    <Stack.Screen name="Portal" options={{ headerTitleAlign: 'center', headerBackVisible: false, }} component={Portal} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Admin" options={{ headerBackVisible: false, headerTitleAlign: 'center' }} component={Admin} />
                    <Stack.Screen name="SentUpdate" options={{ headerShown: false }} component={SentUpdate} />
                    <Stack.Screen name="Updates" component={Updates} />
                    <Stack.Screen name="StudentConfirm" options={{ headerShown: false }} component={StudentConfirm} />
                    <Stack.Screen name="StudentGet" options={{ headerShown: false }} component={StudentGet} />
                    <Stack.Screen name="WorkshopReminder" options={{ headerBackVisible: false, headerTitleAlign: 'center' }} component={WorkshopReminder} />
                    <Stack.Screen name="Workshops" options={{ headerShown: false }} component={Workshops} />
                    <Stack.Screen name="Assignments" options={{ headerTitleAlign: 'center', headerBackVisible: false }} component={Assignments} />
                    <Stack.Screen name="Schedule" options={{ headerTitleAlign: 'center', headerBackVisible: false }} component={Schedule} />
                    <Stack.Screen name="Progress" options={{ headerTitleAlign: 'center', headerBackVisible: false }} component={Progress} />
                    <Stack.Screen name="WorkshopDelete" options={{ headerTitleAlign: 'center', headerBackVisible: false }} component={WorkshopDelete} />
                    <Stack.Screen name="Queries" options={{ headerShown: false }} component={Queries} />
                    <Stack.Screen name="StudentQueries" options={{ headerShown: false }} component={StudentQueries} />
                    <Stack.Screen name="Setting" options={{ headerBackVisible: false }} component={Setting} />
                    <Stack.Screen name="AboutApp" component={AboutApp} />
                </Stack.Navigator>
                <Toast />
            </NavigationContainer>
        </>
    )
}


