import React, { useState, useEffect } from "react";
import { createGroup } from '../services/groupService.ts';
import { fetchUsers } from '../services/userService.ts';
import { User } from '../types/user.ts';
import SearchBar from '../components/SearchBar.tsx';
import UserList from '../components/UserList.tsx';
import SelectedUsers from '../components/SelectedUsers.tsx';
import DetailsInput from '../components/DetailsInput.tsx';
import NextButton from '../components/NextButton.tsx';
import CreateEntityButton from '../components/CreateEntityButton.tsx';

const GroupCreation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError("Error fetching users. Please try again.");
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleUserSelection = (userEmail: string) => {
    setSelectedUserEmails((prevEmails) =>
      prevEmails.includes(userEmail)
        ? prevEmails.filter((email) => email !== userEmail)
        : [...prevEmails, userEmail]
    );
  };

  const handleNextStep = () => {
    if (selectedUserEmails.length === 0) {
      alert("Please select at least one user.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!groupName) {
      alert("Please provide a group name.");
      return;
    }

    setIsLoading(true);
    try {
      await createGroup(groupName, selectedUserEmails);
      alert("Group created successfully!");
      setStep(1);
    } catch (err) {
      setError("Error creating the group. Please try again.");
      console.error("Error creating group:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   
        <div className=" bg-[#F5F5F5] flex flex-col">
          {error && (
            <div className="text-red-500 text-center py-2">{error}</div>
          )}

          {/* Step 1: Contact Selection */}
          {step === 1 && (
            <div className="flex flex-col flex-grow">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <UserList
                filteredUsers={filteredUsers}
                selectedUserEmails={selectedUserEmails}
                handleUserSelection={handleUserSelection}
              />
              <NextButton
                handleNextStep={handleNextStep}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* Step 2: Group Details */}
          {step === 2 && (
            <div className="p-4 flex flex-col flex-grow">
              <SelectedUsers selectedUserEmails={selectedUserEmails} users={users} />
              <DetailsInput Name={groupName} setName={setGroupName} />
              <CreateEntityButton
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      
  );
};

export default GroupCreation;



