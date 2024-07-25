import axios from "axios";
import { OrdersUrl } from "../../config";

export const CreateNewOrder = async (formData) => {
  try {
    const res = await axios(`${OrdersUrl}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });
    return res.data;
  } catch (error) {
    console.log("Error in creating Order =>", error);
  }
};

export const GetAllOrdersOfUser = async (id) => {
  try {
    const res = await axios(`${OrdersUrl}/view-order?id=${id}`, {
      method: "GET",
    });
    return res.data;
  } catch (error) {
    console.log("Error in getting all orders Item for specific User =>", error);
  }
};

export const GetOrderDetails = async (id) => {
  try {
    const res = await axios(`${OrdersUrl}/order-details?id=${id}`, {
      method: "GET",
    });

    return res.data;
  } catch (error) {
    console.log("Error in getting all orders Item for specific User =>", error);
  }
};
