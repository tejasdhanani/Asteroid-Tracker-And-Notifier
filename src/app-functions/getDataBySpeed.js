const getDataBySpeed = (data) => {
    data.sort(function(a, b) {
        var aSpeed = a.close_approach_data[0].relative_velocity.kilometers_per_hour;
        var bSpeed = b.close_approach_data[0].relative_velocity.kilometers_per_hour;
        

        if (aSpeed < bSpeed) return 1
        else if (aSpeed > bSpeed) return -1
        else return 0;
    })

    return data;
}

export default getDataBySpeed
