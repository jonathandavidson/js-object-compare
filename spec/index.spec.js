const index = require('../index');
const compareObjects = index.compareObjects;
const compareArrays = index.compareArrays;

describe('compareObjects()', () => {
  describe('when the object contains elements that are strings', () => {
    const objectA = {
      foo: 'foo',
      bar: 'bar'
    };

    describe('and all of the strings are equal', () => {
      const objectB = {
        foo: 'foo',
        bar: 'bar'
      };

      it('returns true', () => {
        expect(compareObjects(objectA, objectB)).toBe(true);
      });
    });

    describe('and one of the strings is not equal', () => {
      const objectB = {
        foo: 'foo',
        bar: 'baz'
      };

      it('returns false', () => {
        expect(compareObjects(objectA, objectB)).toBe(false);
      });
    });
  });

  describe('when the object contains elements that are booleans', () => {
    const objectA = {
      foo: true,
      bar: false
    };

    describe('and all of the booleans are equal', () => {
      const objectB = {
        foo: true,
        bar: false
      };

      it('returns true', () => {
        expect(compareObjects(objectA, objectB)).toBe(true);
      });
    });

    describe('and one of the booleans is not equal', () => {
      const objectB = {
        foo: true,
        bar: true
      };

      it('returns false', () => {
        expect(compareObjects(objectA, objectB)).toBe(false);
      });
    });
  });

  describe('when the object contains elements that are numbers', () => {
    const objectA = {
      foo: 0,
      bar: 1
    };

    describe('and all of the numbers are equal', () => {
      const objectB = {
        foo: 0,
        bar: 1
      };

      it('returns true', () => {
        expect(compareObjects(objectA, objectB)).toBe(true);
      });
    });

    describe('and one of the numbers is not equal', () => {
      const objectB = {
        foo: 1,
        bar: 2
      };

      it('returns false', () => {
        expect(compareObjects(objectA, objectB)).toBe(false);
      });
    });
  });

  describe('when the object is passed an array of ignored properties', () => {
    const objectA = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    };

    const objectB = {
      foo: 'notfoo',
      bar: 'notbar',
      baz: 'baz'
    };

    it('ignores those properties', () => {
      expect(compareObjects(objectA, objectB, ['foo', 'bar'])).toBe(true);
    });
  });

  describe('when one of the object\'s properties is a date', () => {
    const objectA = {
      foo: new Date('2016-08-17T20:21:08.723Z'),
      bar: '2016-08-17T20:21:08.723Z'
    };

    const objectB = {
      foo: '2016-08-17T20:21:08.723Z',
      bar: new Date('2016-08-17T20:21:08.723Z')
    };

    const objectC = {
      foo: '2017-08-17T20:21:08.723Z',
      bar: new Date('2016-08-17T20:21:08.723Z')
    };

    it('compares string representations of that date', () => {
      expect(compareObjects(objectA, objectB)).toBe(true);
      expect(compareObjects(objectA, objectC)).toBe(false);
    });
  });

  describe('when one of the properties is an array', () => {
    const objectA = {
      'foo': [ 'foo' ]
    };

    const objectB = {
      'foo': [ 'foo' ]
    };

    const objectC = {
      'foo': [ 'bar' ]
    };

    it('compares the arrays', () => {
      expect(compareObjects(objectA, objectB)).toBe(true);
      expect(compareObjects(objectA, objectC)).toBe(false);
    });
  });
});

describe('compareArrays', () => {
  describe('when the arrays contain all strings', () => {
    const arrayA = [
      'foo',
      'bar'
    ];

    describe('and they both contain the same strings', () => {
      const arrayB = [
        'bar',
        'foo'
      ];

      it('returns true', () => {
        expect(compareArrays(arrayA, arrayB)).toBe(true);
      });
    });

    describe('and they both do not contain the same strings', () => {
      const arrayB = [
        'bar',
        'baz'
      ];

      it('returns false', () => {
        expect(compareArrays(arrayA, arrayB)).toBe(false);
      });
    });
  });

  describe('when one of the elements is an object', () => {
    const arrayA = [
      {
        foo: 'foo',
        bar: 'bar'
      },
      'foo'
    ];

    describe('and an equal object is in the other array', () => {
      it('returns true', () => {
        const arrayB = [
          'foo',
          {
            foo: 'foo',
            bar: 'bar'
          }
        ];

        expect(compareArrays(arrayA, arrayB)).toBe(true);
      });
    });

    describe('and no equal object is in the other array', () => {
      const arrayB = [
        'foo',
        {
          foo: 'foo',
          bar: 'baz'
        }
      ];
      it('returns false', () => {
        expect(compareArrays(arrayA, arrayB)).toBe(false);
      });
    });

    describe('and no other object is in the other array', () => {
      const arrayB = [
        'foo',
        'bar'
      ];

      it('returns false', () => {
        expect(compareArrays(arrayA, arrayB)).toBe(false);
      });
    });
  });
});

describe('a real world test', () => {
  const offerA = {
    rate: 'freeOfCharge',
    bookingCode: 'FREELOCAL',
    allowCombination: false,
    offerName: 'Bring a Local for FREE! Promotion',
    specialConditions: 'Please note, this special offer can be booked today, and is valid for travel at any time during the year except for December 24th through January 6th.',
    offerType: 'Per person',
    _id: '57f7019e18f4fc0300a9e6d1',
    discountType: 'percentage',
    validDatesOfTravel: [
      {
        fromDate: '2017-04-01T00:00:00.000Z',
        toDate: '2017-12-24T00:00:00.000Z',
        _id: '123',
        updatedAt: '2016-06-28T21:20:21.754Z',
        createdAt: '2016-06-28T21:20:21.754Z'
      },
      {
        _id: '57f7019e18f4fc0300a9e6d3',
        fromDate: '2018-01-06T00:00:00.000Z',
        toDate: '2018-03-31T00:00:00.000Z',
        updatedAt: '2016-08-17T20:21:08.723Z',
        createdAt: new Date('2016-08-17T20:21:08.723Z')
      }
    ],
    tags: ['free', 'multi'],
    rates: [{nett: 2, commission: '20%'}]
  };

  const offerB = {
    _id: '7f7019e18f4fc0300a9e6d1',
    rate: 'freeOfCharge',
    bookingCode: 'FREELOCAL',
    allowCombination: false,
    offerName: 'Bring a Local for FREE! Promotion',
    specialConditions: 'Please note, this special offer can be booked today, and is valid for travel at any time during the year except for December 24th through January 6th.',
    offerType: 'Per person',
    discountType: 'percentage',
    validDatesOfTravel: [
      {
        fromDate: '2018-01-06T00:00:00.000Z',
        _id: '57f7019e18f4fc0300a9e6d3',
        toDate: '2018-03-31T00:00:00.000Z',
        updatedAt: new Date('2016-08-17T20:21:08.723Z'),
        createdAt: '2016-08-17T20:21:08.723Z'
      },
      {
        fromDate: '2017-04-01T00:00:00.000Z',
        toDate: '2017-12-24T00:00:00.000Z',
        updatedAt: '2016-06-28T21:20:21.754Z',
        createdAt: '2016-06-28T21:20:21.754Z'
      }
    ],
    tags: ['multi', 'free'],
    rates: [{commission: '20%', nett: 2}]
  };

  it('passes', () => {
    expect(compareObjects(offerA, offerB, [ '_id' ])).toBe(true);
  });
});
