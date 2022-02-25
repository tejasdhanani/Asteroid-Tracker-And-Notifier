const getDataByDistance = (data) => {
    data.sort(function(a, b) {
        var aDistance = a.close_approach_data[0].miss_distance.kilometers;
        var bDistance = b.close_approach_data[0].miss_distance.kilometers;
        

        if (aDistance < bDistance) return -1
        else if (aDistance > bDistance) return 1
        else return 0;
    })
    
    return data
}

export default getDataByDistance

