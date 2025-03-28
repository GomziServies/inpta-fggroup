const hostname = window.location.hostname;

let baseUrl;
if (hostname === 'inpta.fggroup.in') {
  baseUrl = 'https://api.fggroup.in';
} else if (hostname === 'test-inpta.fggroup.in') {
  baseUrl = 'https://dev-api.fggroup.in';
} else {
  baseUrl = 'https://dev-api.fggroup.in';
  // baseUrl = 'https://api.fggroup.in';
  // baseUrl = 'http://localhost:82';
}

const apiConfig = {
  BASE_URL: baseUrl,
};

export default apiConfig;
