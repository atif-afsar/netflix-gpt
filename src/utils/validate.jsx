export const checkValidation = (email, password, fullName = "") => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 chars, one letter, one number
  const nameRegex = /^[a-zA-Z\s]{2,}$/; // Only letters and spaces, at least 2 chars

  if (fullName && !nameRegex.test(fullName)) {
    return "Full name should contain only letters and spaces, minimum 2 characters";
  }
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and contain at least one letter and one number";
  }

  return null; // No validation errors
};
