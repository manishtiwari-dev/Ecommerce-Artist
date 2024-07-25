import { RegisterUrl,LoginUrl } from "../../config/index";

import axios from "axios";

export const CollectorRegister = async (formData) => {
  try {
    const res = await axios(`${AuthUrl}/register-collector`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });
    return res.data;
  } catch (error) {
    console.log("error in registering collector => ", error);
  }
};


// export const SellerRegister = async (formData) => {
//   try {
//      const csrfToken = document
//         .querySelector('meta[name="csrf-token"]')
//         .getAttribute("content");
//     const res = await axios(`${RegisterUrl}`, {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         "Content-Type": "application/json",
//         "X-CSRF-TOKEN": csrfToken,
//       },
//       body: formData,
//     });
//     return res.data;
//   } catch (error) {
//     console.log("error in registering seller => ", error);
//   }
// };

export const SellerRegister = async (formData) => {
  try {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    const res = await axios.post(RegisterUrl, formData, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      }
    });

    return res.data;
  } catch (error) {
    console.log("Error in registering seller => ", error);
    throw error;  // Rethrow the error after logging it
  }
};



export const Login = async (formData) => {
  try {
    const res = await axios(`${LoginUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });
    return res.data;
  } catch (error) {
    console.log("error in login => ", error);
  }
};
