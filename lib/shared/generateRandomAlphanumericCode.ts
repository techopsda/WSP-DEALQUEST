const generateRandomAlphanumericCode = (length: number) => {
  let result = '';
  const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export default generateRandomAlphanumericCode;
