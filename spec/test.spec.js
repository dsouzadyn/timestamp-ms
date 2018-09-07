'use strict'
const expect = require('chai').expect
const service = require('../server.js')



describe('API endpoint /api/timestamp', function () {
  

  // Get timestamp for ISO Date
  it('should return valid timestamps for the ISO date', function () {
    return service.inject({
      method: 'GET',
      url: '/api/timestamp/2015-12-25'
    })
    .then(function (res) {
      expect(res.statusCode).to.equal(200)
      expect(res.result).to.have.property('unix').equal(1451001600000)
      expect(res.result).to.have.property('utc').equal("Fri, 25 Dec 2015 00:00:00 GMT")
    })
  })

  it('should return valid timestamps for milliseconds', function () {
    return service.inject({
      method: 'GET',
      url: '/api/timestamp/1450137600000'
    })
    .then(function (res) {
      expect(res.statusCode).to.equal(200)
      expect(res.result).to.have.property('unix').equal(1450137600000)
      expect(res.result).to.have.property('utc').equal("Tue, 15 Dec 2015 00:00:00 GMT")
    })
  })

  it('should return an error for an invalid parameter', function() {
    return service.inject({
      method: 'GET',
      url: '/api/timestamp/notvalid'
    })
    .then(function (res) {
      expect(res.result).to.have.property('error').equal('Invalid Date')
    })
  })
})