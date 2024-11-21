import axios  from "axios"; 
import { baseUrl } from "./baseUrl";

 

async function GET(url: string, search?: any) {
  const token = "x";
  console.log("************************ token ********", token);

  try {
    return axios.get(baseUrl + "/api" + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...search },
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
}
async function POST(url: string, data?: any) {
    const token = "x";
  try {
    return axios.post(baseUrl + "/api" + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
}

async function UPDATE(url: string, data?: any) {
    const token = "x";
  try {
    return axios.patch(baseUrl + "/api" + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function DELETE(url: string) {
    const token = "x";
  try {
    return axios.delete(baseUrl + "/api" + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

export { GET, POST, UPDATE, DELETE };
