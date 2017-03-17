const SETTINGS = {
  authority: 'http://identity.provider.com/',
  client_id: 'js',
  redirect_uri: 'http://your_domain.com/callback',
  post_logout_redirect_uri: 'http://your_domain.com/home',
  response_type: 'id_token token',
  scope: 'openid profile email api1',

  silent_redirect_uri: 'http://your_domain.com/home',
  //automaticSilentRenew: true,
  //silentRequestTimeout:10000,

  filterProtocolClaims: true,
  loadUserInfo: true,
  service_endpoint: 'http://services.your_domain.com'
};

module.exports = SETTINGS;