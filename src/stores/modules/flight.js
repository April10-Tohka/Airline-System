import { defineStore } from "pinia";
import dayjs from "dayjs";
import { getFlightSchedule } from "@/api/flight.js";

export const useFlightStore = defineStore("flight", {
  state: () => ({
    depart: {
      id: 2,
      code: "SHA",
      name: "上海",
      international: false,
      timeZone: 8,
      eName: "Shanghai",
      lat: 31.1,
      lon: 121.3666666,
      type: 1,
      tzi: { dst: null, det: null, dv: "", guv: "+0800" },
      airportlst: [
        { id: 0, code: "SHA", name: "虹桥国际机场" },
        { id: 0, code: "PVG", name: "浦东国际机场" },
      ],
    },
    arrive: {
      id: 1,
      code: "BJS",
      name: "北京",
      international: false,
      timeZone: 8,
      eName: "Beijing",
      lat: 39.91944438,
      lon: 116.4333333,
      type: 1,
      tzi: { dst: null, det: null, dv: "", guv: "+0800" },
      airportlst: [
        { id: 0, code: "PEK", name: "北京首都国际机场" },
        { id: 0, code: "PKX", name: "北京大兴国际机场" },
      ],
    },
    departDate: dayjs(new Date()).format("YYYY-MM-DD"),
  }),
  getters: {
    flight(state) {
      return {
        departCityCode: state.depart.code,
        arriveCityCode: state.arrive.code,
        departDate: state.departDate,
      };
    },
  },
  actions: {
    //交换出发地和目的地
    swapFromTo() {
      console.log("=>(flight.js:45) 交换出发地和目的地");
      //对象解构来互换属性值
      [this.depart, this.arrive] = [this.arrive, this.depart];
    },
  },
});
