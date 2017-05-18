function compareArrays (arrayA, arrayB, ignoreKeys = []) {
  if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) return false;

  return arrayA.every(arrayAItem => {
    let containsItem;

    if (typeof arrayAItem === 'object') {
      containsItem = arrayB.some(arrayBItem => {
        return typeof arrayBItem === 'object' && compareObjects(arrayAItem, arrayBItem, ignoreKeys);
      });
    } else {
      containsItem = arrayB.indexOf(arrayAItem) !== -1;
    }

    return containsItem;
  });
}

function compareProperties (propertyA, propertyB, ignoreKeys = []) {
  let equal;

  if (propertyA instanceof Date && typeof propertyB === 'string') {
    equal = compareObjects(propertyA, new Date(propertyB), ignoreKeys)
  } else if (typeof propertyA === 'string' && propertyB instanceof Date) {
    equal = compareObjects(new Date(propertyA), propertyB, ignoreKeys);
  } else if (Array.isArray(propertyA)) {
    equal = compareArrays(propertyA, propertyB, ignoreKeys);
  } else {
    equal = propertyA === propertyB;
  }

  return equal;
}

function compareObjects (objectA, objectB, ignoreKeys = []) {
  if (objectA instanceof Date && objectB instanceof Date) {
    return objectA.getTime() === objectB.getTime();
  }

  return Object.keys(objectA).every(key => {
    return ignoreKeys.indexOf(key) !== -1 || compareProperties(objectA[key], objectB[key], ignoreKeys);
  });
};

module.exports = {
  compareArrays: compareArrays,
  compareObjects: compareObjects
};
