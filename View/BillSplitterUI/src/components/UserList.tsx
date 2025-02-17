interface UserListProps {
  filteredUsers: User[];
  selectedUserEmails: string[];
  handleUserSelection: (userEmail: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  filteredUsers,
  selectedUserEmails,
  handleUserSelection,
}) => {
  return (
    <div className="flex-grow overflow-y-auto px-4">
      {filteredUsers.map((user) => (
        <div key={user.email} className="flex items-center py-2 border-b border-gray-200">
          <input
            type="checkbox"
            className="mr-3"
            checked={selectedUserEmails.includes(user.email)}
            onChange={() => handleUserSelection(user.email)}
            aria-label={`Select ${user.email}`}
          />
          <p className="text-gray-800">{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
