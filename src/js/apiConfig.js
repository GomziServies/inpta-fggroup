const hostname = window.location.hostname;

let baseUrl;
if (hostname === 'gyms.fggroup.in') {
  baseUrl = 'https://api.fggroup.in';
} else if (hostname === 'test-gyms.fggroup.in') {
  baseUrl = 'https://dev-api.fggroup.in';
} else {
  baseUrl = 'https://dev-api.fggroup.in';
  // baseUrl = 'http://localhost';
}

const apiConfig = {
  BASE_URL: baseUrl,
};

export default apiConfig;
