const dateFormat = (time) => {
  const date = new Date(time);

  if (isNaN(date)) {
    return "Invalid Date";
  }

  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default dateFormat;
