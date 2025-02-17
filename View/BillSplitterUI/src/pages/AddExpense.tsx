import React, { useState, useEffect } from "react";
import { fetchUsersByGroup } from '../services/groupService.ts';
import {addExpense} from '../services/expenseService.ts'
import { User } from '../types/user.ts';
import SearchBar from '../components/SearchBar.tsx';
import UserList from '../components/UserList.tsx';
import SelectedUsers from '../components/SelectedUsers.tsx';
import DetailsInput from '../components/DetailsInput.tsx';
import NextButton from '../components/NextButton.tsx';
import CreateEntityButton from '../components/CreateEntityButton.tsx';
interface AddExpenseProps{
  id:number;
}
const AddExpense: React.FC<AddExpenseProps> = ({id}) => {
  const [step, setStep] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await fetchUsersByGroup(id);
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
    setIsLoading(true);
    try {
      await addExpense(description,amount,id, selectedUserEmails);
      alert("Expense added successfully!");
      setStep(1);
    } catch (err) {
      setError("Error adding expense. Please try again.");
      console.error("Error adding expense:", err);
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
              <DetailsInput placeholder="Description" name={description} setName={setDescription} />
              <DetailsInput placeholder="Amount" name={amount} setName={setAmount} />
              <CreateEntityButton
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      
  );
};

export default AddExpense;



