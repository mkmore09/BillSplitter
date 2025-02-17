import React from 'react';
import Item from '../components/GroupItem.tsx';  // Ensure this is the correct import
import { Group } from '../types/group.ts';
import Button from '../components/Button.tsx';

interface GroupListProps {
  groups: Group[];
  setSelectedGroup: React.Dispatch<React.SetStateAction<string>>; // Set state type should be string (group name)
}

const GroupList: React.FC<GroupListProps> = ({ groups, setSelectedGroup }) => {
  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group); // Set the selected group when clicked
  };

  return (
    <div className="bg-white border-r border-gray-200 p-5">
      {/* Map through the groups and render each one */}
      {groups.map((group) => (
        <div key={group.id} onClick={() => handleGroupClick(group)}>
          {/* Assuming Item component expects the group name */}
          <Item group={group} />
        </div>
      ))}
    </div>
  );
};

export default GroupList;
