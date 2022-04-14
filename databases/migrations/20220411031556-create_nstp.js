/**
 *
 * @param {Parse} Parse
 */
exports.up = async (Parse) => {
  const className = 'Nstp';
  const schema = new Parse.Schema(className);

  schema
    .addString('programName')
    .addString('programDescription');

  return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async (Parse) => {
  const className = 'Nstp';
  const schema = new Parse.Schema(className);

  return schema.purge().then(() => schema.delete());
};
