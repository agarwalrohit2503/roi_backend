exports.success = (res, respSuccessMsg, respErrorMsg, Query, condition) => {
  return [
    res.status(res.statusCode).send({
      status: res.statusCode,
      message: Query != "" && Query != null ? respSuccessMsg : respErrorMsg,
      ...(condition == 1 ? {} : { data: Query }),
    }),
  ];
};

exports.error = (res, Msg, errormsg) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500, 209];
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
