/**
 *
 * @param {Parse} Parse
 */
exports.up = async (Parse) => {
  const className = 'ApplicationDocument';
  const schema = new Parse.Schema(className);

  schema
    .addFile('document')
    .addString('filename')
    .addString('documentType')
    .addPointer('applicationId', 'Application');

  return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async (Parse) => {
  const className = 'ApplicationDocument';
  const schema = new Parse.Schema(className);

  return schema.purge().then(() => schema.delete());
};
