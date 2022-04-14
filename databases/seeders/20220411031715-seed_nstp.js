/**
 *
 * @param {Parse} Parse
 */
exports.run = async (Parse) => {
  const CWTS = new Parse.Object('Nstp');
  CWTS.set('programName', 'CWTS');
  CWTS.set('programDescription', 'The Civic Welfare Training Service (CWTS) is one of three components of the National Service Training Program, a civic education and defense preparedness program for higher and vocational education students in the Philippines.');
  
  const LTS = new Parse.Object('Nstp');
  LTS.set('programName', 'LTS');
  LTS.set('programDescription', 'The Literacy Training Service is one of three components of the National Service Training Program, a civic education and defense preparedness program for higher and vocational education students in the Philippines.');
  
  const nstp = [CWTS, LTS];

  return Parse.Object.saveAll(nstp, { useMasterKey: true });
};
