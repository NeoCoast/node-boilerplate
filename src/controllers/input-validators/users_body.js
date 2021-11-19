export default {
  type: 'object',
  required: ['username', 'email', 'password'],
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  additionalProperties: false,
};
