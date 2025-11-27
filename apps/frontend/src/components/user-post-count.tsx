import React from "react";

export function UserPostDetails({ count, email }) {
  return (
    <div className="text-sm text-foreground my-4">
      <h2 className="text-foreground font-medium text-4xl leading-10 tracking-normal ">
        User Email
      </h2>

      <div className="flex space-x-2">
        <span className="font-medium text-muted-foreground">{email}</span>

        <span className="font-medium">• {count} posts</span>
      </div>
    </div>
  );
}
