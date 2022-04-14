/**
 *
 * @param {Parse} Parse
 */
exports.up = async (Parse) => {
  const className = 'Student';
  const schema = new Parse.Schema(className);
  
  schema
    .addObject('name')
    .addString('birthdate')
    .addString('gender')
    .addString('emailAddress')
    .addString('contactNumber')
    .addObject('address')
    .addObject('program')
    .addPointer('heiId', '_User');

  return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async (Parse) => {
  const className = 'Student';
  const schema = new Parse.Schema(className);

  return schema.purge().then(() => schema.delete());
};
