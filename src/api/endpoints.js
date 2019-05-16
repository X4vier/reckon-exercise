import axios from "axios";

export const endpoint1 = axios.create({
  baseURL: "https://join.reckon.com/test1/rangeInfo"
});

export const endpoint2 = axios.create({
  baseURL: "https://join.reckon.com/test1/divisorInfo"
});
