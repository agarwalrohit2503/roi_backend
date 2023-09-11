exports.success = (res, respSuccessMsg, respErrorMsg, Query) => {
  return [
    res.status(res.statusCode).send({
      status: res.statusCode,
      message: Query != "" && Query != null ? respSuccessMsg : respErrorMsg,
      data: Query,
    }),
  ];
};

exports.error = (res, Msg, errormsg) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  const findCode = codes.find((code) => code == res.statusCode);

  if (!findCode) res.statusCode = 500;
  else statusCode = findCode;

  return [
    res.status(res.statusCode).send({
      status: res.statusCode,
      message: Msg,
      ...(errormsg ? { data: errormsg } : {}),
    }),
  ];
};
