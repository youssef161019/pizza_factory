const handleResponse = (response) => {
  if (response.data) {
    return response.data;
  }
  if (response.results) {
    return response.results;
  }
  return response;
};
// responses handler
export { handleResponse };
