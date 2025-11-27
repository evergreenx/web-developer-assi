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

export interface Post {
  id: string;
  user_id: string; // Changed from number to string
  title: string;
  body: string;
  created_at: string;
}
