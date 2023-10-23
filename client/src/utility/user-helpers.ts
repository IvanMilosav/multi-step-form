import { FormInputs } from "../components/types";

const PORT = 5000;

// Helper functions that handle API calls

// Function to check if an email is already in use
export async function isEmailInUse(
  email: string
): Promise<boolean | { error: string }> {
  try {
    // Define the URL with the email as a query parameter
    const url = `http://localhost:${PORT}/users/checkUser?email=${encodeURIComponent(
      email
    )}`;

    const response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
      return data === true;
    } else if (response.status === 500) {
      return { error: "Error checking for user in the database." };
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error(error);
    return { error: "Network error while fetching user data." };
  }
}

// Function to post form data to the server
// TODO fix <any>
export async function postFormDataToServer(formData: FormInputs): Promise<any> {
  // Create a request body object from the provided form data
  const requestBody = {
    email: formData.email,
    name: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phoneNumber,
    address: formData.address,
    zipCode: formData.zipCode,
  };

  try {
    const response = await fetch(`http://localhost:${PORT}/users/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    throw new Error("Failed adding user to database");
  }
}
