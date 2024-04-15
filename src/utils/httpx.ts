import axios from 'axios'

const instance = axios.create({
    baseURL: "http://120.79.61.213:7777",
    timeout: 1000 * 12
  }
)

export default instance
