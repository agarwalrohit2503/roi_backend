async function otpTimeValidation(value) {
  const otpExpirationDuration = 1 * 60 * 1000; //time calculater
  const otpDate = new Date(value);
  const currentTimestamp = Date.now();
  const isExpired =
    currentTimestamp - otpDate.getTime() > otpExpirationDuration;
  console.log(isExpired);

  return isExpired;
}

module.exports = otpTimeValidation;
