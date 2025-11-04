
import React, { useState } from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import { InvestmentGoal } from '../../types';

// Mock data for initial state
const mockGoals: InvestmentGoal[] = [
    {
        id: 'goal-1',
        name: 'House Down Payment',
        targetAmount: 50000,
        currentAmount: 12500,
        targetDate: '2028-12-31',
    },
    {
        id: 'goal-2',
        name: 'New Car',
        targetAmount: 25000,
        currentAmount: 21000,
        targetDate: '2025-06-30',
    },
    {
        id: 'goal-3',
        name: 'Vacation Fund',
        targetAmount: 5000,
        currentAmount: 1500,
        targetDate: '2025-01-15',
    },
];

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 dark:bg-dark-bg-secondary rounded-full h-2.5">
        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);

const GoalCard: React.FC<{ goal: InvestmentGoal }> = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    
    return (
        <Card>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{goal.name}</h3>
                <span className="text-xs font-semibold text-gray-500 dark:text-dark-text-secondary">
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                </span>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-2xl font-bold text-primary">
                        ${goal.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-dark-text-secondary">
                        of ${goal.targetAmount.toLocaleString()}
                    </span>
                </div>
                <ProgressBar progress={progress} />
                 <p className="text-right text-sm font-semibold mt-1">{progress.toFixed(1)}%</p>
            </div>
        </Card>
    );
};


const InvestmentGoalsView: React.FC = () => {
    const [goals, setGoals] = useState<InvestmentGoal[]>(mockGoals);
    const [isAdding, setIsAdding] = useState(false);
    const [newGoal, setNewGoal] = useState({ name: '', targetAmount: '', currentAmount: '', targetDate: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewGoal(prev => ({ ...prev, [name]: value }));
    };

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoal.name || !newGoal.targetAmount || !newGoal.currentAmount || !newGoal.targetDate) return;
        const goalToAdd: InvestmentGoal = {
            id: `goal-${Date.now()}`,
            name: newGoal.name,
            targetAmount: parseFloat(newGoal.targetAmount),
            currentAmount: parseFloat(newGoal.currentAmount),
            targetDate: newGoal.targetDate,
        };
        setGoals(prev => [...prev, goalToAdd]);
        setNewGoal({ name: '', targetAmount: '', currentAmount: '', targetDate: '' });
        setIsAdding(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Investment Goals</h2>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
                >
                    <Icon name={isAdding ? 'cross' : 'plus'} className="h-5 w-5 mr-2" />
                    {isAdding ? 'Cancel' : 'Add New Goal'}
                </button>
            </div>
            
            {isAdding && (
                 <Card>
                    <form onSubmit={handleAddGoal} className="space-y-4">
                        <h3 className="text-lg font-bold">Create a New Goal</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Goal Name</label>
                            <input type="text" name="name" value={newGoal.name} onChange={handleInputChange} required className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2" placeholder="e.g., House Down Payment"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Target Amount ($)</label>
                                <input type="number" name="targetAmount" value={newGoal.targetAmount} onChange={handleInputChange} required className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2" placeholder="50000"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Current Savings ($)</label>
                                <input type="number" name="currentAmount" value={newGoal.currentAmount} onChange={handleInputChange} required className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2" placeholder="12000"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-dark-text-secondary mb-1">Target Date</label>
                                <input type="date" name="targetDate" value={newGoal.targetDate} onChange={handleInputChange} required className="w-full bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-2"/>
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="bg-success text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                                Save Goal
                            </button>
                        </div>
                    </form>
                 </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
        </div>
    );
};

export default InvestmentGoalsView;
