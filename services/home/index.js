import axios from "axios";
import { HomeUrl } from "../../config";

export const GetAllHomeItems = async () => {
  try {
    const res = await axios(`${HomeUrl}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in getting all home Item  (service) =>", error);
  }
};
