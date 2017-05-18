function compareArrays(arrayA, arrayB) {
  return arrayA.every(item => arrayB.indexOf(item) !== -1);
}

function compareObjects (objectA, objectB, ignoreKeys=[]) {
  return Object.keys(objectA).every(key => {
    return ignoreKeys.indexOf(key) !== -1 || compareProperties(objectA[key], objectB[key]);
  });
};

function compareDates(dateA, dateB) {
  return dateA.getTime() === dateB.getTime();
}

function compareProperties(propertyA, propertyB) {
  let equal;

  if (propertyA instanceof Date && typeof propertyB === 'string') {
    equal = compareDates(propertyA, new Date(propertyB));
  } else if (typeof propertyA === 'string' && propertyB instanceof Date) {
    equal = compareDates(new Date(propertyA), propertyB);
  } else {
    equal = propertyA === propertyB;
  }

  return equal;
}

module.exports = {
  compareArrays: compareArrays,
  compareObjects: compareObjects
};
