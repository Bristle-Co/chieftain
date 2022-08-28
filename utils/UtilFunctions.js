export const dateTimeNullCheckAndInsertT = (dateTime) => {
  return dateTime === null ? null : dateTime.replace(" ", "T");
};

export const dateTimeNullCheckAndRemoveT = (dateTime) => {
  return dateTime === null ? null : dateTime.replace("T", " ");
};
