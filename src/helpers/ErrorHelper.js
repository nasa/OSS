/**
 * Convert an error into an iterable object.
 * @function
 * @nosideeffects
 * @param {Error} error The error to convert into an object.
 * @public
 * @returns {Object} An iterable object which properties match those of the Error provided.
 */
const convertErrorToObject = (error) =>
{
  const reduceObject = (result, key) => ({ ...result, ...(error[key] ? { [key]: error[key] } : {}) });
  const props = [
    "action",
    "columnNumber",
    "description",
    "fileName",
    "item",
    "itemNumber",
    "message",
    "name",
    "number",
    "response",
    "stack"
  ];
  const objResponse = props.reduce(reduceObject, {});
  objResponse.stack = Array.isArray(objResponse.stack) ? objResponse.stack : objResponse.stack.split("\n");
  return objResponse;
};

const extractSharePointError = (message) =>
{
  return JSON.parse(message.substr(message.indexOf("{")))?.["odata.error"] || {};
};

export { convertErrorToObject, extractSharePointError };
