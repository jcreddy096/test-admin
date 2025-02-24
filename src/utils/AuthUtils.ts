const TOKEN_KEY = "access_token";
const EXPIRY_KEY = "token_expiry";


export const setToken = (token: string) => {
  const expiryTime = Date.now() + 5 * 60 * 1000; 
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, expiryTime.toString());

  setTimeout(() => {
    removeToken();
  }, expiryTime - Date.now());
};


export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (token && expiry && Date.now() < Number(expiry)) {
    return token;
  } else {
    removeToken(); 
    return null;
  }
};


export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
  window.location.href = "/login"; 
};
