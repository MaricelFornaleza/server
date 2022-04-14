/**
 *
 * @param {Parse} Parse
 */
exports.up = async (Parse) => {
  const className = 'Application';
  const schema = new Parse.Schema(className);

  schema
    .addDate('dateApplied')
    .addDate('dateApproved')
    .addString('status')
    .addString('academicYear')
    .addObject('serialNumber')
    .addString('awardYear')
    .addArray('steps')
    .addString('applicationType')
    .addPointer('heiId', '_User');
    // .addString('heiId');   //no ObjectId data type in parse

  return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async (Parse) => {
  const className = 'Application';
  const schema = new Parse.Schema(className);

  return schema.purge().then(() => schema.delete());
};
