import axios, { AxiosResponse } from "axios";

const fetchData = async <T>(query: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/?q=${query}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchData;
