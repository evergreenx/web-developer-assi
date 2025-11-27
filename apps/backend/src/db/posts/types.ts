export interface Post {
  id: string; // Changed from number to string for UUID
  user_id: string;
  title: string;
  body: string;
  created_at: string;
}
