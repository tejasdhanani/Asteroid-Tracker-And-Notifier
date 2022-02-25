import React, { useEffect, useState, useCallback } from 'react'
import { View, TextInput, TouchableOpacity, Text, Button, Pressable, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../assets/COLORS';
import { StatusBar } from 'expo-status-bar';



const Settings = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [saved, setSaved] = useState(false);
    const [emailToBeDisplayed, setEmailToBeDisplayed] = useState('');

    const saveToStorage = async (email, key) => {
        /* thanks to @user - gr4viton from stackoverflow */
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegexp.test(email)) {
            alert("Please enter a valid email address.")
        } else {
            console.log("email valid")
            setSaved(true);
            try {
                const jsonValue = JSON.stringify(email)
                await AsyncStorage.setItem(key, jsonValue)
                console.log("saved to storage: ", jsonValue)
            } catch (e) {
                console.error(e);
            }
            setTimeout(() => setSaved(false), 3000);
        }
    }

    const getEmailFromStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('emailKey')
            return jsonValue != null ? JSON.parse(jsonValue) : "empty";
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(async () => {
        const emailToDisplay = await getEmailFromStorage();
        console.log("emailToBeDisplayed: ", emailToDisplay)
        setEmailToBeDisplayed(emailToDisplay);
    }, [emailToBeDisplayed, saved])




    return (

        <View
            style={{
                // borderWidth: 1,
                paddingHorizontal: 15,
            }}>
            <StatusBar style='dark' />
            <View style={{ borderBottomWidth: 1, paddingBottom: 20 }}>
                <Text style={{ marginVertical: 10, fontSize: 16, }}>Email To Receive Notifications</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingVertical: 10,
                        paddingLeft: 10,
                        fontSize: 16,
                        backgroundColor: COLORS.black,
                        color: COLORS.dimwhite,
                    }}
                    placeholder={emailToBeDisplayed}
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    onChangeText={email => setEmail(email)}
                    onSubmitEditing={(text) => {
                        this.textInput = text;
                        this.textInput.clear();
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Pressable style={{ marginVertical: 15, alignSelf: 'center' }} onPress={() => saveToStorage(email, 'emailKey')}>
                    <Text style={{ color: 'blue', fontSize: 16, }}>Save Settings</Text>
                </Pressable>
                {saved ? (
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../../assets/tick.png')}

                    />
                ) : null}

            </View>


        </View>
    )
}

export default Settings
