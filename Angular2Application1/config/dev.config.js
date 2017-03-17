const SETTINGS = {
  authority: 'http://localhost:5000/',
  client_id: 'js',
  redirect_uri: 'http://localhost:5200/callback',
  post_logout_redirect_uri: 'http://localhost:5200/home',
  response_type: 'id_token token',
  scope: 'openid profile email api1',

  silent_redirect_uri: 'http://localhost:5200/home',
  //automaticSilentRenew: true,
  //silentRequestTimeout:10000,

  filterProtocolClaims: true,
  loadUserInfo: true,
  service_endpoint: 'http://localhost:5001'
};

module.exports = SETTINGS;