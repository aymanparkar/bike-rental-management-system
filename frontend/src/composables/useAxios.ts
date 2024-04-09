import axios from 'axios'

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://bike-rental-management-system.onrender.com/v1'
  })

  return { axiosInstance }
}

export default useAxios
