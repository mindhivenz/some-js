import 'sinon'
import chai from 'chai'
const should = chai.should()
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import some from './index'


describe('some', () => {

  describe('some.bool()', () => {

    it('should return a Boolean', () => {
      const actual = some.bool()
      actual.should.be.a('Boolean')
    })

  })
})
