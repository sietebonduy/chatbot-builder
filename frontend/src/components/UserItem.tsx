import { useTranslation } from 'react-i18next';
import { IUser } from '../types/user';

interface UserItemProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (id: string) => void;
}

export default function UserItem({ user, onEdit, onDelete }: UserItemProps) {
  const { t } = useTranslation();

  return (
    <tr className="hover:bg-gray-50">
      <td className="border px-4 py-2">{user.name}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2">{user.admin}</td>
      <td className="border px-4 py-2 space-x-2">
        <button onClick={() => onEdit(user)} className="text-blue-600 hover:underline">
          {t('admin.users.actions.show')}
        </button>
        <button onClick={() => onEdit(user)} className="text-blue-600 hover:underline">
          {t('admin.users.actions.edit')}
        </button>
        <button onClick={() => onDelete(user.id)} className="text-red-600 hover:underline">
          {t('admin.users.actions.archive')}
        </button>
      </td>
    </tr>
  );
}
