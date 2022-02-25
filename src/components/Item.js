import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { COLORS } from '../../../assets/COLORS';
import * as Localization from 'expo-localization';
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

import '../firebase/firebase.js';

import { getFirestore, setDoc, doc, collection } from 'firebase/firestore';

const firestore = getFirestore();


const Item = ({ navigation, data, selectedDate, contentAboveFlatList }) => {

    // console.log(data);
    console.log("===============ITEM============================");
    console.log("the date for data is: ", selectedDate);

    let day = selectedDate.split('-')[2];

    const convertUTCToUserTimeZone = (date) => {
        const monthDict = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: '07', Aug: "08", Sept: "09", Oct: "10", Nov: '11', Dec: '12'
        }

        const dateArray = date.split(' '); // [2021-Nov-05, 21:50]
        const item_date = dateArray[0]; // 2021-Nov-05
        const item_time = dateArray[1]; // 21:50

        const _item_date = item_date.split('-'); // [2021, Nov, 05]
        const _item_time = item_time.split(':'); // [21, 50]


        date = new Date(Date.UTC(_item_date[0], monthDict[_item_date[1]] - 1, _item_date[2], _item_time[0], _item_time[1]));

        return date
    }

    const trimDateTime = (dateTimeStr) => {
        // console.log(dateTimeStr);
        let dateTimeStrArray = dateTimeStr.split(' ');
        let dateStr = dateTimeStrArray.slice(1, 4).join('-');

        let timeStr = ' ' + dateTimeStrArray[4].split(':').slice(0, 2) + ' ';
        timeStr = timeStr.replace(',', ':')

        let locationStr = dateTimeStrArray[6]

        let returnArray = [dateStr, timeStr, locationStr]
        return returnArray
    }

    const submitToFirebase = async (email, neoName, intTimer) => {
        try {
            const q = collection(firestore, "Reminders");
            await setDoc(doc(q), {
                emailID: email,
                neoName: neoName,
                seconds: intTimer,
                sendEmail: false,
                emailSent: false,
            });
        } catch (e) {
            console.error(e);
        }

    }


    const getDataFromStorage = async () => {
        console.log("getting data...")
        try {
            const jsonValue = await AsyncStorage.getItem('emailKey')
            return jsonValue != null ? JSON.parse(jsonValue) : "empty";
        } catch (e) {
            console.log(e);
        }
    }

    const setEmailNotification = async (intTimer, neoName) => {
        console.log(neoName);
        // console.log("this is timer : ", intTimer);
        const email = await getDataFromStorage();
        if (email === "" || email === "empty") {
            alert("Please go to settings screen and set your email address to set a reminder.")
        } else {
            submitToFirebase(email, neoName, intTimer);
            alert(`notification set for ${neoName}`)
        }



        console.log(email);

    }




    return (
        <FlatList
            style={{}}
            data={data}
            keyExtractor={({ id }, index) => id}
            ListHeaderComponent={contentAboveFlatList}
            ListHeaderComponentStyle={{}}
            style={{
                backgroundColor: 'black'
            }}
            renderItem={({ item, index }) => (<>
                {day === convertUTCToUserTimeZone(item.close_approach_data[0].close_approach_date_full).toString("en-US", { timeZone: Localization.timezone, timeZoneName: 'short' }).replace(/(.*)\D\d+/, '$1').split(' ')[2]
                    ? (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('ItemPage', { item: item })} style={styles.itemView}>
                            <View style={styles.itemContainer} >
                                <View style={{
                                    // borderWidth: 1, 
                                    borderColor: 'white',
                                    width: '93%',
                                }}>
                                    <View style={styles.item}>
                                        <Image
                                            source={require('../../../assets/black-asteroid.png')}
                                            fadeDuration={0}
                                            style={[styles.itemContainerIcons, styles.iconAsteroid]}
                                        />
                                        <Text style={[styles.itemText, { fontSize: 16, fontWeight: 'bold' }]}>
                                            {item.name}
                                        </Text>
                                    </View>

                                    <View style={styles.item}>
                                        <Image
                                            source={require('../../../assets/black-time.png')}
                                            style={styles.itemContainerIcons}
                                        />
                                        <Text style={styles.itemText}>
                                            Closest on&nbsp;
                                            {trimDateTime(convertUTCToUserTimeZone(item.close_approach_data[0].close_approach_date_full).toString("en-US", { timeZone: Localization.timezone, timeZoneName: 'short' }).replace(/(.*)\D\d+/, '$1'))}
                                        </Text>
                                    </View>

                                    <View style={styles.item}>
                                        <Image
                                            source={require('../../../assets/black-hazard.png')}
                                            style={styles.itemContainerIcons}
                                        />

                                        <Text style={styles.itemText}>
                                            Hazardous:&nbsp;
                                            {item.is_potentially_hazardous_asteroid ? (
                                                <Text style={{ color: '#ff6347' }}>
                                                    true
                                                </Text>
                                            ) : (
                                                <Text style={{ color: '#2e8b57' }}>
                                                    false
                                                </Text>
                                            )}
                                        </Text>
                                    </View>

                                    <View style={styles.item}>

                                        {Math.floor(item.close_approach_data[0].epoch_date_close_approach / 1000) < Math.floor(Date.now() / 1000)

                                            ? (<>
                                                <Image
                                                    source={require('../../../assets/tick.png')}
                                                    style={styles.itemContainerIcons}
                                                />
                                                <Text style={styles.itemText, { color: '#f06938' }}>Event Passed </Text>
                                            </>)
                                            : (
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CountDown
                                                        style={{
                                                        }}
                                                        until={Math.floor(item.close_approach_data[0].epoch_date_close_approach / 1000) - Math.floor(Date.now() / 1000)}
                                                        timeToShow={['D', 'H', 'M']}
                                                    />
                                                    <TouchableOpacity style={{ marginTop: -15, marginLeft: 5, padding: 6 }} onPress={() => setEmailNotification(Math.floor(item.close_approach_data[0].epoch_date_close_approach / 1000) - Math.floor(Date.now() / 1000), item.name)}>
                                                        <Text style={{ color: 'blue' }}>notify</Text>
                                                    </TouchableOpacity>

                                                </View>
                                            )
                                        }


                                    </View>

                                </View>
                                <View style={{ width: '5%' }}>
                                    <Image
                                        source={require('../../../assets/rightarrow.png')}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            // borderWidth: 1,
                                            paddingRight: 5,
                                        }}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                    : null
                }


            </>)
            }
        />
    )
}

export default Item

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        // height: 100,0        
        marginHorizontal: 15,
        marginVertical: 15,
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        // justifyContent: 'center',


        shadowColor: "#fff",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5.46,

        elevation: 2,
        flexDirection: 'row',
        // justifyContent: 'flex',
        alignItems: 'center',
    },
    itemContainerIcons: {
        width: 25,
        height: 25,
        marginRight: 6,
    },
    iconAsteroid: {
        transform: [{ rotate: '270deg' }]
    },
    itemText: {
        color: COLORS.black,
        fontSize: 14,
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        marginVertical: 6,
    }
})




// borderRadius: 10,


const headerstyles = StyleSheet.create({
    dateButton: {
        // paddingHorizontal: 32,
        borderWidth: 1,
        borderColor: '#fab913',
        color: 'blue',
        padding: 5,
        // borderRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    dateButtonText: {
        color: COLORS.dimwhite,
        fontSize: 16,
        alignSelf: 'center'
    }
})