import jwtDecode from "jwt-decode";

export function useUser() {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    return { name: decodedToken.name, email: decodedToken.email };
  } catch (error) {
    console.error("Error decoding token:", error);
    // Handle error state or display an error message

    return error;
  }
}
