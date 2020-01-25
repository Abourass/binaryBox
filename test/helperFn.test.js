'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const {
  calculateMilliseconds,
  calculateMillisecondsWithAnimationOffset
} = require('./helperFn.common');

describe('calculateMilliseconds', () => {
  describe('with seconds', () => {
    it('Should parse 10s, and return an error', () => {
      const boundErrorCalculation = calculateMilliseconds.bind(null, '10s');
      expect(boundErrorCalculation).to.throw();
    })
  });
  describe('with seconds', () => {
    it('Should parse 9s, and return 9000', () => {
      assert.equal(calculateMilliseconds('9s'), 9000)
    })
  });
  describe('with seconds', () => {
    it('Should parse 1s, and return 1000', () => {
      assert.equal(calculateMilliseconds('1s'), 1000)
    })
  });
  describe('with tenths of a second', () => {
    it('Should parse .3s, and return 300(ms)', () => {
      assert.equal(calculateMilliseconds('.3s'), 300)
    })
  });
  describe('with hundredths of a second', () => {
    it('Should parse .05s, and return 50(ms)', () => {
      assert.equal(calculateMilliseconds('.05s'), 50)
    })
  });
  describe('with thousandths of a second', () => {
    it('Should parse .003s, and return 3(ms)', () => {
      assert.equal(calculateMilliseconds('.003s'), 3)
    })
  });
  describe('with ten-thousandths of a second', () => {
    it('Should parse, .0003s and return an error', () => {
      const boundErrorCalculation = calculateMilliseconds.bind(null, '.0003s');
      expect(boundErrorCalculation).to.throw();
    })
  });
});

describe('calculateMillisecondsWithAnimationOffset', () => {
  describe('with seconds', () => {
    it('Should parse 10s, and return an error', () => {
      const boundErrorCalculation = calculateMillisecondsWithAnimationOffset.bind(null, '10s');
      expect(boundErrorCalculation).to.throw();
    })
  });
  describe('with seconds', () => {
    it('Should parse 9s, and return 9000', () => {
      assert.equal(calculateMillisecondsWithAnimationOffset('9s'), 8950)
    })
  });
  describe('with seconds', () => {
    it('Should parse 1s, and return 1000', () => {
      assert.equal(calculateMillisecondsWithAnimationOffset('1s'), 950)
    })
  });
  describe('with tenths of a second', () => {
    it('Should parse .3s, and return 300(ms)', () => {
      assert.equal(calculateMillisecondsWithAnimationOffset('.3s'), 250)
    })
  });
  describe('with hundredths of a second', () => {
    it('Should parse .05s, and return 50(ms)', () => {
      assert.equal(calculateMillisecondsWithAnimationOffset('.05s'), 50)
    })
  });
  describe('with thousandths of a second', () => {
    it('Should parse .003s, and return 3(ms)', () => {
      assert.equal(calculateMillisecondsWithAnimationOffset('.003s'), 3)
    })
  });
  describe('with ten-thousandths of a second', () => {
    it('Should parse, .0003s and return an error', () => {
      const boundErrorCalculation = calculateMillisecondsWithAnimationOffset.bind(null, '.0003s');
      expect(boundErrorCalculation).to.throw();
    })
  });
});
