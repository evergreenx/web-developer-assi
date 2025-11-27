
export function UserPostDetails({ count, email, userName } : {
    count: number;
    email: string;
    userName: string;
}) {
  return (
    <div className="text-sm text-foreground mt-6 mb-10">
      <h2 className="text-foreground font-medium text-4xl leading-10 tracking-normal mb-7 ">
        {userName}
      </h2>

      <div className="flex space-x-2">
        <span className="font-medium text-muted-foreground">{email}</span>

        <span className="font-medium">• {count} posts</span>
      </div>
    </div>
  );
}
