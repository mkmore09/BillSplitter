import React, { useState } from 'react';
import { Group } from '../types/group.ts';
interface ItemProps {
  
  group:Group;
}

const Item: React.FC<ItemProps> = ({ group }) => {
  return (
    <div className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                    <div className="font-semibold text-sm"> {group.name}</div>
                    </div>
    </div>
  );
};

export default Item;
