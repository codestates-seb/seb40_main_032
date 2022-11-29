const Category = {
  auth: 'Auth',
  userProfile: 'User Profile',
  relation: 'Relation',
  search: 'Search',
};

const Action = {
  auth: {
    login: 'Login',
    logout: 'Logout',
    signup: 'Signup',
    guestSignup: 'Guest Signup',
    signupCloseModal: 'Signup Close Modal',
  },
  userProfile: {
    profileEdit: 'Profile Edit',
  },
  relation: {
    follow: 'Follow',
    following: 'Following',
    like: 'Like',
  },
  search: {
    search: 'Search Result Link Click',
  },
};

const GaEvent = {
  Category,
  Action,
};

export default GaEvent;
