/**
 *
 * @param {Parse} Parse
 */
exports.run = async (Parse) => {

  const admin = new Parse.Object('_User');
  admin.set('name', 'administrator');
  admin.set('username', 'administrator');
  admin.set('email', 'chednstpserialnumber@gmail.com');
  admin.set('password', 'admin1234567');
  admin.set('userType', 'admin');

  const _user = [admin];

  return Parse.Object.saveAll(_user, { useMasterKey: true });
};
