import axios from 'axios'

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4200/v1'
  })

  return { axiosInstance }
}

export default useAxios
