/**
 * @category Frontend
 * @module
 */

/**
 * @description Checks if the passed item already exists in the session storage and initializes
 * it with given value if not existing.
 * @param {String} itemToCheckFor Selected item in the session storage that will be checked
 * @param {String} valueToInitTo Value to initialize if the item is not existing in session storage.
 */
const initSessionStorage = (itemToCheckFor, valueToInitTo) => {
  if (sessionStorage.getItem(itemToCheckFor) === null)
    sessionStorage.setItem(itemToCheckFor, valueToInitTo);
};

export { initSessionStorage };
