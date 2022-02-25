const CallAPI = async (x) => {
    const NEOAPILINK = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${x}&end_date=${x}&api_key=********************`
    try {
        const response = await fetch(NEOAPILINK);
        const json = await response.json();
        let date = x;
        const object = json.near_earth_objects[date];

        return object;

    } catch (error) {
        console.log(error);
    } finally {

    }
}

export default CallAPI;
