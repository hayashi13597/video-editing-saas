// Validation regex patterns
const phoneRegex = /^\+[1-9][0-9]{1,14}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-])[^\s].{7,255}[^\s]$/;

export { phoneRegex, passwordRegex };
