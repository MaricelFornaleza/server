/**
 *
 * @param {Parse} Parse
 */
exports.up = async (Parse) => {
  const className = '_User';
  const schema = new Parse.Schema(className);

  schema
    .addString('institutionalCode')
    .addString('name')
    .addObject('address')
    // .addString('email')    //already exists 
    .addString('contactNumber')
    .addString('type')
    // .addString('password') //already exists
    .addString('userType');

  return schema.save();   //change to .update if _User schema already exists
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async (Parse) => {
  const className = '_User';
  const schema = new Parse.Schema(className);

  return schema.purge().then(() => schema.delete());
};
