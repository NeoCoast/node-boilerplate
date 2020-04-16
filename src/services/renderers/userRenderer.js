const minimal = ({ id, username }) => ({
  id,
  username,
});

const show = ({
  id,
  email,
  username,
  firstName,
  lastName,
}) => ({
  id,
  email,
  username,
  firstName,
  lastName,
});

module.exports = { minimal, show };
