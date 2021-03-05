const { expect } = require('chai');
const axios = require('axios');

describe('Mocha', function () {
    it('should work because its a sanity test', function () {
      expect(1).to.be.ok;
    })
})

describe('/users route', function () {
    let expected;
    let actual;
    // before(function () {
    //     axios.get('http://localhost:5000/api/users')
    //     .then(function (response) {
    //       // handle success
    //       actual = response
    //     });
    // });
    it('should retrieve user data', async function () {
        await axios.get('http://localhost:5000/api/users')
        .then( (response) => {
          // handle success

          actual = response.data
        });

        
    });
});