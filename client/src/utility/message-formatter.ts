// Function that formats error messages from error type
export function getMessageString(message: string) {
  switch (message) {
    case "required":
      return "This field is required";
    case "pattern":
      return "Invalid format";
    case "maxLength":
      return "Too long";
    case "minLength":
      return "Too short";
    case "emailExists":
      return "Email already in use";
    default:
      return "";
  }
}
