import axios from "axios";
import { API_URL, END_POINTS, HttpContentType } from "./apiConstant";

export const ApiService = {
  async getChartDetails(sellTokenAddr, buyTokenAddr, limit) {
    return axios
      .get(
        API_URL.BASE_URL +
          END_POINTS.CHART +
          `bsc:${sellTokenAddr},bsc:${buyTokenAddr}?${limit}&end=1684300652.071`
        // {headers: {
        //   "Content-Type": HttpContentType.JSON,
        //   Authorization: `token`,
        // }}
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
