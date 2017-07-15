export const handleResponseErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}