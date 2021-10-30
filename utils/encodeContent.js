const {encode} = require('html-entities');

/**
 * Encodes HTML entities on the "content" attribute of the object passed in.
 * Both mutates the original object and returns it.
 * @param {Object} objWithContent   Post or Comment object, both of which have a .content attribute
 * @returns {Object}
 */
const encodeContent = (objWithContent) => {
  objWithContent.content = encode(objWithContent.content);
  return objWithContent;
}

module.exports = encodeContent;