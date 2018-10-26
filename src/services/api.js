const URL = '/api';
const AUTH_URL = `${URL}/auth`;
const PRICES_URL = `${URL}/prices`;
const USERS_URL = `${URL}/users`;
const ACCOUNTS_URL = `${USERS_URL}/accounts`;
const TRANSACTIONS_URL = `${USERS_URL}/transactions`;
const LEADERBOARD_URL = `${URL}/leaderboard`;


// helper functions
function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(body => { 
    throw body.error; 
  });
}
function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if(token) headers['Authorization'] = token;
  return headers;
}

// auth functions
export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeToken(user);
      return user;
    });
}
export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeToken(user);
      return user;
    });
}
function storeToken(user) {
  const token = user.token;
  window.localStorage.setItem('token', token);
}
export function signOut() {
  window.localStorage.removeItem('token');
}
export function getToken() {
  return window.localStorage.getItem('token');
}
export function getMe() {
  return fetch(`${AUTH_URL}/me`, {
    method: 'GET',
    headers: getHeaders()
  })
    .then(responseHandler);
}



// prices
export function getPrices() {
  return fetch(PRICES_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

// accounts
export function getAccounts() {
  return fetch(ACCOUNTS_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

// transactions
export function postTransaction(transaction) {
  return fetch(TRANSACTIONS_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(transaction)
  })
    .then(responseHandler);
}

// leaderboard
export function getLeaderboard() {
  return fetch(LEADERBOARD_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

