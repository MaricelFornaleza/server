/**
 *
 * @param {Parse} Parse
 */
exports.up = async (Parse) => {
  const className = 'NstpEnrollment';
  const schema = new Parse.Schema(className);

  schema
    // .addString('studentId')    //  pointer?
    // .addString('nstpId')
    // .addString('applicationId')
    .addPointer('studentId', 'Student')
    .addPointer('nstpId', 'Nstp')
    .addPointer('applicationId', 'Application')
    .addBoolean('takenNstp1', { defaultValue: false })
    .addBoolean('takenNstp2', { defaultValue: false })
    .addString('serialNumber');

  return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async (Parse) => {
  const className = 'NstpEnrollment';
  const schema = new Parse.Schema(className);

  return schema.purge().then(() => schema.delete());
};
