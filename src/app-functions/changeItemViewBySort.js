import getDataByDistance from "./getDataByDistance";
import getDataByHazardous from "./getDataByHazardous";
import getDataBySpeed from "./getDataBySpeed";
import getDataByTime from "./getDataByTime";

const changeItemViewBySort = (data, originalData, value) => {

    var exportData;
    if (value === 'default') {
        exportData = originalData;
    } else if (value === 'distance') {
        const datacopy = [...originalData];
        exportData = getDataByDistance(datacopy);
    } else if (value === 'time') {
        const datacopy = [...originalData];
        exportData = getDataByTime(datacopy);
    } else if (value === 'speed') {
        const datacopy = [...originalData];
        exportData = getDataBySpeed(datacopy);
    } else if (value === 'hazardous') {
        const datacopy = [...originalData];
        exportData = getDataByHazardous(datacopy);
    }


    return exportData;
}

export default changeItemViewBySort
