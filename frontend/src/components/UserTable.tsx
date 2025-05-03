import { useTranslation } from 'react-i18next';
import { IUser } from '@/types/user';
import UserItem from './UserItem';

interface UserTableProps {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const { t } = useTranslation();

  return (
    <table className="w-full border-collapse table-auto">
      <thead className="bg-gray-100">
      <tr>
        <th className="border px-4 py-2 text-left">{t('admin.users.table.first_name')}</th>
        <th className="border px-4 py-2 text-left">{t('admin.users.table.last_name')}</th>
        <th className="border px-4 py-2 text-left">{t('admin.users.table.role')}</th>
        <th className="border px-4 py-2 text-left">{t('admin.users.table.actions')}</th>
      </tr>
      </thead>
      <tbody>
      {users.map(user => (
        <UserItem key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
      </tbody>
    </table>
  );
}
