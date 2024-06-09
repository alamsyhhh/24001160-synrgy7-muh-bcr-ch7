const formatDateTime = (dateTimeString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  };

  const dateTime = new Date(dateTimeString);
  let formattedDateTime = dateTime.toLocaleString('en-GB', options);

  formattedDateTime = formattedDateTime.replace(' at', ',');

  return formattedDateTime;
};

export default formatDateTime;
