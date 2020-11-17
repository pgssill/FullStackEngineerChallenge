import React, { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import { User } from "../shared/types/User";

type Props = {
  createUserRoute: Function;
};

export const UserList = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <h2>User List</h2>

      <button onClick={() => props.createUserRoute()}>Create User</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              #{user.id} - {user.isAdmin && "⭐"}
              {user.firstName} {user.lastName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
