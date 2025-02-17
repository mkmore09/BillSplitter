import React, { useEffect, useState } from 'react';
import { Expense } from '../types/expense.ts';
import {fetchExpensesByGroup} from '../services/groupService.ts';
import {getUserDataFromToken} from '../services/jwtService.ts'
interface ExpenselistProps{
  groupId:number; 
}

const ExpensesList: React.FC<ExpenselistProps> = ({groupId}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await fetchExpensesByGroup(groupId)
        const data: Expense[] = response;
        setExpenses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, [groupId]);


  if (loading) return <div className="text-center p-4">Loading groups...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    
      <div className="space-y-4">
        {expenses.map((expense) => {
    if (getUserDataFromToken().email==expense.userEmail) {
      return (
        <div className="flex justify-end space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
            <div className="font-semibold">{expense.userEmail}</div>
            <p className="text-sm text-gray-700">{expense.amount}</p>
            <p className="text-sm text-gray-700">{expense.description}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-start space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
            <div className="font-semibold">{expense.userEmail}</div>
            <p className="text-sm text-gray-700">{expense.amount}</p>
            <p className="text-sm text-gray-700">{expense.description}</p>
          </div>
        </div>
      );
    }
  })}
      </div>
    
  );
};

export default ExpensesList;
