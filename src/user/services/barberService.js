import API from "./axiosConfig";

export const registerBarber = async (formData) => {
  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData.image) {
        data.append("image", formData.image);
      } else {
        data.append(key, formData[key]);
      }
    });

    const response = await API.post("/barbers/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "true", // ✅ Important for ngrok
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};



// ✅ GET: Nearby Salons
export const getNearbySalons = async () => {
  try {
    const response = await API.get("/barbers/nearby-salons");
    return response.data;
    console.log(response.data);
    
  } catch (error) {
    throw error;
  }

  
};


// ✅ GET: Barber Details by ID
export const getBarberById = async (id) => {
  try {
    const response = await API.get(`/barbers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching barber details:", error);
    throw error;
  }
};


export default { registerBarber, getNearbySalons ,getBarberById, };