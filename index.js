function compareArrays(arrayA, arrayB) {
  return arrayA.every(arrayAItem => {
    let containsItem;

    if (typeof arrayAItem === 'object') {
      containsItem = arrayB.some(arrayBItem => {
        return typeof arrayBItem === 'object' && compareObjects(arrayAItem, arrayBItem);
      });
    } else {
      containsItem = arrayB.indexOf(arrayAItem) !== -1;
    }

    return containsItem;
  });
}

function compareProperties(propertyA, propertyB) {
  let equal;

  if (propertyA instanceof Date && typeof propertyB === 'string') {
    console.log(typeof propertyA);
    equal = compareObjects(propertyA, new Date(propertyB))
  } else if (typeof propertyA === 'string' && propertyB instanceof Date) {
    equal = compareObjects(new Date(propertyA), propertyB);
  } else {
    equal = propertyA === propertyB;
  }

  return equal;
}

function compareObjects(objectA, objectB, ignoreKeys=[]) {
  if (objectA instanceof Date && objectB instanceof Date) {
    return objectA.getTime() === objectB.getTime();
  }

  return Object.keys(objectA).every(key => {
    return ignoreKeys.indexOf(key) !== -1 || compareProperties(objectA[key], objectB[key]);
  });
};

module.exports = {
  compareArrays: compareArrays,
  compareObjects: compareObjects
};
