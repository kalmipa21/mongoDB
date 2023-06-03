const messages = (res, code, messages, data, pagination) => {
  let result = { code, messages, data, pagination };
  res.status(code).send(result);
};
export default messages;
