var AWS = require('aws-sdk');



export default (req, res) => {

  // Set the region
  const SESConfig = {
    region: "us-east-2"
  }

  AWS.config.update(SESConfig);
  // Create DynamoDB service object
  var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  var params = {
    TableName: 'serverlessrepo-laart-form-handler-FormDataTable-QVW6UT5HACSY'
  };

  const DB_INTERFACE_FORMDATA = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    state: "",
    zipcode: "",
    support: "",
    comments: "",
    areaCategory: "",
    location: "",
    additionalSupport: ""
  }

  let out = [];

  ddb.scan(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      data.Items.forEach(function (element, index, array) {
        console.log("formId: ", element.formId);
        console.log("created: ", element.created);
        console.log("formData: ", element.formData);

        out.push({
          formId: element.formId,
          created: element.created,
          formData: element.formData,
        })
      });

      res.status(200).json({ name: out })
    }
  });
}
