export const isAuthenticated = () => localStorage.getItem("token") !== null;
export const getToken = () => localStorage.getItem("token");
export const login = (data) => {
  localStorage.setItem("token", data.token);
};
export const logout = () => {
  localStorage.removeItem("token");
};