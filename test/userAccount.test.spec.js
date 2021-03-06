const { expect } = require('chai');
const axios = require('axios');

describe('Mocha', function () {
    it('should work because its a sanity test', function () {
      expect(1).to.be.ok;
    })
})

describe('User Insert', function (){
  let userRecord = { 
  };
  let expectedName ;
  let expectedEmail ;
  let expectedPassword ;
  let expectedStatusCode = 400;
  let actualStatusCode ;

  it('should error without name, email and password', async function () {
    const res = await axios.post('http://localhost:5000/api/users', userRecord)
      .then(function (response) {
        return response
      })
      .catch((err) => {
        let errObj = err.response.data;
        expectedName = errObj.errors[0].name;
        expectedEmail = errObj.errors[1].email;
        expectedPassword = errObj.errors[2].password;

        actualStatusCode = err.response.status;
      });

    expect(actualStatusCode).to.equal(expectedStatusCode);
    expect(expectedName[0].message).to.equal("The request body must contain a name field set to the user's name");
    expect(expectedName[0].userMessage).to.equal("Please provide a value for name");

    expect(expectedEmail[0].message).to.equal("The request body must contain an email field set to the user's email");
    expect(expectedEmail[0].userMessage).to.equal("Please provide a value for email");

    expect(expectedPassword[0].message).to.equal("The request body must contain a valid password");
    expect(expectedPassword[0].userMessage).to.equal("Please provide a value for password");
    
  });

  it('should return a 200 response status code', async function () {
    userRecord.name = "Ken Robinson";
    userRecord.email = "ken@there.com";
    userRecord.password = "KenRobinson";
    
    const res = await axios.post('http://localhost:5000/api/users', userRecord)
    const actual = res.status;
    const expected = 201;

    expect(actual).to.equal(expected);
  });
});

