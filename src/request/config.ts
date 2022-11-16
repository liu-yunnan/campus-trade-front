let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'https://www.fastmock.site/mock/c3d6ae6e21f320374de37b070c248913/campus-trade'
  BASE_URL = 'http://192.168.56.17:8080'
  // BASE_URL = 'http://192.168.46.24:8080'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://192.168.56.17:8080'
  // BASE_URL = 'http://192.168.46.24:8080'
} else {
  BASE_URL = 'https://www.fastmock.site/mock/c3d6ae6e21f320374de37b070c248913/campus-trade'
}

export { BASE_URL, TIME_OUT }