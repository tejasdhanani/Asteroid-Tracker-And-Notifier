const getDataByHazardous = (data) => {
  const result = data.filter(item => item.is_potentially_hazardous_asteroid === true)
  data = result;
  
  return data;
}

export default getDataByHazardous
