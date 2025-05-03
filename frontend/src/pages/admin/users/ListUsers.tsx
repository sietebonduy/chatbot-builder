import { useEffect, useState } from 'react';
import { index } from '@/api/repositories/UserRepositroy'
import { IUser } from '@/types/user';
import UserTable from '@/components/UserTable';
// import { useNavigate } from 'react-router-dom';
import { normalizeFromJsonApi } from "@/lib/normalizeUser";

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await index();
      console.log('response: ', normalizeFromJsonApi(response.data))
      setUsers(normalizeFromJsonApi(response.data.data));
    } catch {
      return;
    }
  };

  const handleEdit = (user: IUser) => {};
  const handleDelete = async (id: string) => {};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Пользователи</h1>
      </div>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
