export interface User {
  id: number;
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
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
}
