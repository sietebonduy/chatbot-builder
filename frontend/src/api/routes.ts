const Routes = {
  USER: {
    LOGIN: '/users/sign_in',
    REGISTRATION: '/users',
    LOGOUT: '/users/sign_out',
    UPDATE_PASSWORD: '/users/password',
  },
  HELLO: {
    INDEX: '/api/v1/hello',
  },
  API: {
    V1: {
      USERS: {
        ROOT: '/api/v1/users',
        ME: '/api/v1/users/me',
      },
      CAPTCHA: {
        VERIFY: '/api/v1/verify_recaptcha',
      },
      CHATBOT_FLOWS: {
        ROOT: '/api/v1/chatbot_flows',
      },
      BOTS: {
        ROOT: '/api/v1/bots',
      },
      LOGIN_ACTIVITIES: { ROOT: '/api/v1/login_activities', }
    }
  }
};

export default Routes;
