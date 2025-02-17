import React, { useEffect, useState } from 'react';
import GroupList from '../components/GroupList.tsx';
import ExpensesList from '../components/ExpensesList.tsx';
import { Group } from '../types/group.ts';
import {fetchGroups} from '../services/userService.ts'
import {logout} from '../services/authService.ts'
import Button from '../components/Button';
import AddExpense from '../pages/AddExpense.tsx'
import Model from '../components/Model.tsx';
const GroupAssemble: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await fetchGroups()
        const data: Group[] = response;
        console.log( data);
        setGroups(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  if (loading) return <div className="text-center p-4">Loading groups...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (

<div className="bg-gray-300">
  <div className=" flex w-full h-screen max-w-6xl mx-auto rounded-lg overflow-hidden">
      <div className="w-2/8 overflow-y-auto">
      <div className="p-2 fixed font-semibold">Groups</div>
      < GroupList groups={groups}
        setSelectedGroup={setSelectedGroup}
      />
       </div> 
      <div className="flex-1 bg-white p-5">
      <div className="flex justify-between items-center mb-5">
                <div className="text-xl font-semibold">{selectedGroup != null ? selectedGroup.name : "abc"}
              </div>
                <Button
              text="Add Expense"
              onClick={openModal}
              // Add custom Tailwind classes here
              className="bg-transparent text-gray-800 py-1 px-3 border border-gray-500 rounded-md hover:bg-gray-200 transition duration-300 text-sm"
            />
          </div>
          <Model title={" Add Expense "}isOpen={isModalOpen} onClose={closeModal}>
        {selectedGroup ? (
        <AddExpense id={selectedGroup.id} />
      ) : (
        <div>Please select a group.</div>
      )}
      </Model>
         {selectedGroup ? (
        <div><ExpensesList groupId={selectedGroup.id}/>  </div>   ):(
        <div>Please select a group.</div>
      )}
        </div>
   </div>
  </div>
  );
};

export default GroupAssemble;
