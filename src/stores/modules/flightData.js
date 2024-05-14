import {defineStore} from "pinia";
import {ref,reactive} from "vue";
export const useFlightDataStore=defineStore('flightData',()=>{
    const dictionary=JSON.parse(localStorage.getItem('dictionary'));
    const cityList=ref(dictionary.cityList);
    const airlineCompanyNameList=ref(dictionary.airlineCompanyNameList);
    const aircraftTypeList=ref(dictionary.aircraftTypeList);
    return {cityList,airlineCompanyNameList,aircraftTypeList}
})
