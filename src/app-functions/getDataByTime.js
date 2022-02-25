const getDataByTime = (data) => {
    data.sort(function (a, b) {
        // console.log(a.close_approach_data[0].close_approach_date.split("-"));
        const a_myArr = a.close_approach_data[0].close_approach_date.split("-");
        const a_myArrFull = a.close_approach_data[0].close_approach_date_full.split(" ");
        const a_time = a_myArrFull[1].split(":");

        const b_myArr = b.close_approach_data[0].close_approach_date.split("-");
        const b_myArrFull = b.close_approach_data[0].close_approach_date_full.split(" ");
        const b_time = b_myArrFull[1].split(":");


        var xDate = new Date(a_myArr[0], a_myArr[1], a_myArr[2], a_time[0], a_time[1]);
        var yDate = new Date(b_myArr[0], b_myArr[1], b_myArr[2], b_time[0], b_time[1]);


        if (xDate < yDate) return 1
        else if (xDate > yDate) return -1
        else return 0;
    });
    return data;
}

export default getDataByTime
