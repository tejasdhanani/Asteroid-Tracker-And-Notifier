import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Animated, Easing, } from 'react-native'
import { COLORS } from '../../../assets/COLORS'


const ItemPage = ({ navigation, route }) => {
    let rotateValueHolder = new Animated.Value(0);

    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => startImageRotateFunction());
    };

    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const { item } = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            title: item.name,
        })
    }, [navigation])

    useEffect(() => {
        startImageRotateFunction();
    }, [])

    return (
        <ScrollView style={{
            flex: 1,
            // paddingVertical: 15,
            paddingHorizontal: 15,
            backgroundColor: COLORS.black,
        }}>
            <StatusBar style="light" />

            <View>
                <Text style={styles.name}>{item.name}</Text>
                <View
                    style={{
                        height: (Dimensions.get('window').height * 23) / 100,
                        // borderWidth: 1,
                        borderColor: 'white',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        marginHorizontal: 15,
                    }}>

                    <View style={{
                        width: '50%'
                    }}>

                        <View style={{
                            // borderWidth: 2,
                            borderColor: 'red',
                            // width: '50%',
                            height: '80%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Animated.Image
                                style={{
                                    // borderWidth: 1,
                                    borderColor: 'blue',
                                    width: 85,
                                    height: 110,
                                    transform: [{ rotate: RotateData }],
                                }}
                                source={
                                    require('../../../assets/asteroidmain.png')
                                }
                            />
                        </View>
                        <Text style={{
                            // borderWidth: 1,
                            borderColor: "purple",
                            // marginTop: 15,
                            fontSize: 18,
                            fontWeight: "400",
                            height: "15%",
                            alignSelf: 'center',
                        }}>{(item.estimated_diameter.feet.estimated_diameter_min).toFixed(1)} ft</Text>
                    </View>




                    <View style={{
                        width: "50%",
                    }}>
                        <View
                            style={{
                                // borderWidth: 2,
                                borderColor: 'green',
                                // width: '50%',
                                height: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            <Image
                                source={require('../../../assets/spaceshuttle1.png')}
                                style={{
                                    // borderWidth: 1,
                                    borderColor: 'blue',
                                    width: 55,
                                    height: 63,
                                    // paddingBottom: 25,
                                }}
                            />

                        </View>
                        <Text style={{
                            // borderWidth: 1,
                            height: '15%',
                            alignSelf: 'center',
                            // marginTop: 15,
                            fontSize: 18,
                            fontWeight: "400"
                        }}>184 ft</Text>
                    </View>


                </View>
                <Text style={{ color: COLORS.dimwhite, fontSize: 9, alignSelf: 'center', marginTop: 13, marginBottom: 0, }}>*This image of the NEO is not the actual image</Text>
                <View style={{
                    alignSelf: 'center',
                    // borderWidth: 1,
                    borderColor: 'white',
                    padding: 10,
                    marginVertical: 10,
                }}>
                    <View style={{ width: 300 }}>

                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Absolute Magnitude:
                            </Text>
                            <Text style={styles.detailRight}>
                                {item.absolute_magnitude_h}
                            </Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Est Diameter Min:
                            </Text>
                            <Text style={styles.detailRight}>
                                {(item.estimated_diameter.kilometers.estimated_diameter_min).toFixed(2)} km
                            </Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Est Diameter Max:
                            </Text>
                            <Text style={styles.detailRight}>
                                {(item.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2)} km
                            </Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Potentially Hazardous:
                            </Text>
                            {item.is_potentially_hazardous_asteroid
                                ? <Text style={[styles.detailRight, { backgroundColor: '#edc4c0' }]}>true</Text>
                                : <Text style={[styles.detailRight, { backgroundColor: '#c8edc0' }]}>false</Text>
                            }
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Closest on:
                            </Text>
                            <Text style={styles.detailRight}>
                                {item.close_approach_data[0].close_approach_date_full}
                            </Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Velocity:
                            </Text>
                            <Text style={styles.detailRight}>
                                {Number(item.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h
                            </Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Miss Distance:
                            </Text>
                            <Text style={styles.detailRight}>
                                {Number(item.close_approach_data[0].miss_distance.kilometers).toFixed(2)} km
                            </Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={styles.detailLeft}>
                                Orbiting body:
                            </Text>
                            <Text style={styles.detailRight}>
                                {item.close_approach_data[0].orbiting_body}
                            </Text>
                        </View>

                    </View>

                </View>
            </View>


        </ScrollView >
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginVertical: 5,
        color: COLORS.dimwhite,
        alignItems: 'center',
    },
    name: {
        // borderWidth: 1,
        // borderColor: COLORS.dimwhite,
        marginVertical: 15,
        color: COLORS.dimwhite,
        fontSize: 25,
        alignSelf: 'center'
    },
    detailBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10.46,
        elevation: 2,
        overflow: 'hidden',

        // borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10,
    },
    detailLeft: {
        width: '50%',
        backgroundColor: '#3f3f3f',
        color: COLORS.dimwhite,
        padding: 10,
        fontSize: 15,
    },
    detailRight: {
        backgroundColor: COLORS.dimwhite,
        padding: 10,
        paddingLeft: 16,
        width: '50%',
        fontSize: 14,
    }
})

export default ItemPage


