import axios from "axios";
import { API_defilam, END_POINTS } from "./apiConstant";

export const ApiService = {
  async getChartDetails(sellTokenAddr, buyTokenAddr, limit) {
    return axios
      .get(
        API_defilam.BASE_URL +
          END_POINTS.CHART +
          `bsc:${sellTokenAddr},bsc:${buyTokenAddr}?${limit}&end=1684300652.071`
      )
      .then((res) => {
        if (res.status == 200) return res.data;
      })
      .catch((err) => {
        console.log("err :: ", JSON.stringify(err));
        return err;
      });
  },
  async getTokenCurrentPrice(sellTokenAddr) {
    return axios
      .get(
        API_defilam.BASE_URL +
          END_POINTS.GET_CURRENT_TOKEN_PRICE +
          `bsc:${sellTokenAddr}`
      )
      .then((res) => {
        if (res.status == 200) return res.data;
      })
      .catch((err) => {
        console.log("err :: ", JSON.stringify(err));
        return err;
      });
  },
};
