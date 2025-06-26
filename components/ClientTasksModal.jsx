"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

export default function ClientTasksModal({ isOpen, onClose, client, onSave }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (client) {
      setTasks(client.tasks || []);
    }
  }, [client]);

  const handleAddTask = () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      setTasks([...tasks, { id: uuidv4(), name: taskName, completed: false }]);
    }
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSave = () => {
    onSave(client.id, tasks);
    onClose();
  };

  if (!isOpen || !client) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Tasks for {client.name}
        </h2>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {tasks.map((task) => (
            <div key={task.id} className="flex justify-between items-center border-b pb-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                />
                <span className={task.completed ? "line-through text-gray-400" : ""}>
                  {task.name}
                </span>
              </label>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Task
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
