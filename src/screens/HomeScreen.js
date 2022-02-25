import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';

import {
    StyleSheet, Platform, View, ActivityIndicator, Pressable, Text, Image
} from 'react-native';

import CallAPI from '../api/CallAPI';
import changeItemViewBySort from '../app-functions/changeItemViewBySort';
import Item from '../components/Item'
import { COLORS } from '../../../assets/COLORS';
import RNPickerSelect from 'react-native-picker-select';

import DateTimePickerModal from "react-native-modal-datetime-picker";

const HomeScreen = ({ navigation }) => {
    console.log("===============HOMESCREEN=====================")
    let receivedData;
    let [isLoading, setLoading] = useState(true);

    const [originalData, setOriginalData] = useState([]);
    let [data, setData] = useState([]);

    let [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (ddate) => {
        hideDatePicker();
        setDate(ddate);
    };



    function formatDate(date) {

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');

    }



    const apiResponse = async (x) => {
        const apiDATA = await CallAPI(x);
        setData(apiDATA);
        setOriginalData(apiDATA);
        setLoading(false);
    };

    useEffect(() => {

        setLoading(true);
        apiResponse(formatDate(date));
    }, [date])


    if (isLoading) {
        return (
            <ActivityIndicator />
        )
    }


    const contentAboveFlatList = () => {
        return (
            <View style={{
                // borderWidth: 1,
                borderColor: 'white',

            }}>
                <View style={{
                    // borderWidth: 1,
                    borderColor: 'red',
                    backgroundColor: COLORS.dimwhite,
                }}>

                    <Pressable onPress={showDatePicker} style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={require('../../../assets/date.png')}
                            style={{
                                width: 25,
                                height: 25
                            }}
                        />
                        <Text style={{
                            alignSelf: 'center',
                            color: 'rgba(18,48,145,1)',
                            fontSize: 18,
                            paddingHorizontal: 10,
                            paddingVertical: 10,

                        }}>{formatDate(date)}</Text>
                    </Pressable>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        display={
                            Platform.OS === 'ios'
                                ? 'inline'
                                : null
                        }
                        locale="en_US"
                    />

                </View>
                <View style={{
                    marginHorizontal: 15,
                    // borderWidth: 1,
                    borderColor: 'yellow'
                }}>
                    <RNPickerSelect
                        onValueChange={(value) => {
                            receivedData = changeItemViewBySort(data, originalData, value);
                            setData(receivedData);
                        }}
                        items={[
                            { label: 'Sort By: Default', value: 'default' },
                            { label: 'Sort By: Distance', value: 'distance' },
                            { label: 'Sort By: Time', value: 'time' },
                            { label: 'Sort By: Hazardous', value: 'hazardous' },
                        ]}
                        style={
                            pickerSelectStyles
                        }
                    >
                        <Text style={{
                            color: '#7086fa',
                            paddingLeft: 5,
                            fontSize: 16,
                            paddingTop: 20,
                            paddingBottom: 5,
                        }}>Sort By...</Text>
                    </RNPickerSelect>
                </View>
            </View >
        )
    }

    return (<>
        <StatusBar style='dark' />
        <Item data={data} navigation={navigation} selectedDate={formatDate(date)} contentAboveFlatList={contentAboveFlatList} />

    </>)
}


const pickerSelectStyles = StyleSheet.create({

    inputIOS: {
        fontSize: 16,
        // borderWidth: 1,
        borderColor: 'yellow',
        // alignSelf: 'center',
        borderRadius: 4,
        padding: 5,
        color: '#7086fa',
        paddingHorizontal: 5,
        paddingTop: 20,
        paddingBottom: 5,
        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'yellow',
        paddingHorizontal: 5,
        paddingVertical: 10,
        // borderWidth: 0.5,
        // borderColor: 'purple',
        // borderRadius: 8,
        color: '#7086fa',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});


export default HomeScreen
