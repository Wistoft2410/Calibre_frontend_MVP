import { NativeAppEventEmitter } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
    console.log("STORING TOKEN..." + token);
    try {
        if(token != ''){
            await AsyncStorage.setItem('@user_Token', token)
            console.log('STORED TOKEN')
        }else{
            console.log('empty token')
        }
    } catch (error) {
        // Error saving data
    }
}

export const removeToken = async () => {
    console.log("REMOVING TOKEN...");
    try {
        await AsyncStorage.removeItem(
            '@user_Token',
        );
    } catch (error) {
        // Error saving data
    }
}
