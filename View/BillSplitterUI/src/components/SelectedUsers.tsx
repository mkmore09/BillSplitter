interface SelectedUsersProps {
  selectedUserEmails: string[];
  users: User[];
}

const SelectedUsers: React.FC<SelectedUsersProps> = ({ selectedUserEmails, users }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {selectedUserEmails.map((email) => {
        const user = users.find((u) => u.email === email);
        return (
          <div
            key={email}
            className="bg-gray-200 text-sm rounded-full px-4 py-1 flex items-center"
          >
            {user?.name}
          </div>
        );
      })}
    </div>
  );
};

export default SelectedUsers;
