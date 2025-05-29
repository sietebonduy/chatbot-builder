const Routes = {
  USER: {
    LOGIN: '/users/sign_in',
    REGISTRATION: '/users',
    LOGOUT: '/users/sign_out',
    UPDATE_PASSWORD: '/users/password',
    CREATE_PASSWORD_TOKEN: '/users/password',
    RESET_PASSWORD_BY_TOKEN: '/users/reset_password',
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
      CHATBOT_FLOWS: { ROOT: '/api/v1/chatbot_flows' },
      BOTS: {
        ROOT: '/api/v1/bots',
        CHECK_STATUS: '/api/v1/bots/check_status',
      },
      LOGIN_ACTIVITIES: { ROOT: '/api/v1/login_activities' },
      ANALYTICS: { ROOT: '/api/v1/analytics' },
      CHAT: { ROOT: '/api/v1/chats' },
    }
  }
};

export default Routes;
