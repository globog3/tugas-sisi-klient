export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getRole = () => {
  return getUser()?.role;
};

export const isAdmin = () => {
  return getRole() === "admin";
};
