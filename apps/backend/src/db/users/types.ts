export interface User {
  id: string; // Changed from number to string
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
}
