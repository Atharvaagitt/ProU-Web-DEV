import React, { createContext, useContext, useState, useEffect } from 'react';
import { employees, initialTasks } from '../data/mockData';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    // Initialize state from localStorage or mock data
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : initialTasks;
        } catch (error) {
            console.error("Failed to parse tasks from localStorage:", error);
            return initialTasks;
        }
    });

    const [employeeList] = useState(employees);

    // Sync with localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        setTasks((prev) => [...prev, { ...newTask, id: `task-${Date.now()}` }]);
    };

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id === taskId) {
                    const updatedTask = { ...task, status: newStatus };

                    // Reward Logic: If completed and on time (or early)
                    if (newStatus === 'Completed' && task.dueDate) {
                        const today = new Date().toISOString().split('T')[0];
                        if (today <= task.dueDate) {
                            updatedTask.reward = true;
                        }
                    } else if (newStatus !== 'Completed') {
                        // Remove reward if moved out of completed
                        updatedTask.reward = false;
                    }

                    return updatedTask;
                }
                return task;
            })
        );
    };

    const deleteTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const getEmployeeById = (id) => employeeList.find(e => e.id === id);

    return (
        <TaskContext.Provider value={{
            tasks,
            employees: employeeList,
            addTask,
            updateTaskStatus,
            getEmployeeById,
            setTasks, // Exposed for Drag and Drop reordering if needed
            totalPoints: tasks.reduce((acc, task) => acc + (task.reward ? 10 : 0), 0)
        }}>
            {children}
        </TaskContext.Provider>
    );
};
