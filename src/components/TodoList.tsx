import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const initialTodos: TodoItem[] = [
  { id: 1, text: "Review morning emails", completed: false },
  { id: 2, text: "Complete project proposal draft", completed: false },
  { id: 3, text: "Schedule team meeting for next week", completed: false },
  { id: 4, text: "Update project documentation", completed: false },
  { id: 5, text: "Test new feature implementation", completed: false },
  { id: 6, text: "Send follow-up email to client", completed: false },
  { id: 7, text: "Review code changes from team", completed: false },
  { id: 8, text: "Prepare presentation slides", completed: false },
  { id: 9, text: "Submit weekly progress report", completed: false },
  { id: 10, text: "Plan tomorrow's priorities", completed: false },
];

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Daily Tasks</h1>
        <p className="text-gray-300">
          Stay organized and productive with your daily to-do list
        </p>
        <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-800/50">
          <p className="text-sm text-blue-300 font-medium">
            Progress: {completedCount} of {totalCount} tasks completed
          </p>
          <div className="mt-2 w-full bg-blue-950 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div 
            key={todo.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:bg-gray-800 ${
              todo.completed 
                ? 'bg-green-900/30 border-green-700/50' 
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 border-gray-600"
            />
            <label 
              htmlFor={`todo-${todo.id}`}
              className={`flex-1 text-sm font-medium cursor-pointer transition-all duration-200 ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-100'
              }`}
            >
              {todo.text}
            </label>
            {todo.completed && (
              <span className="text-xs text-green-400 font-medium">✓ Done</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-200 mb-2">Tips for Success:</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Break large tasks into smaller, actionable steps</li>
          <li>• Prioritize urgent and important tasks first</li>
          <li>• Check off completed items for motivation</li>
          <li>• Review and update your list regularly</li>
        </ul>
      </div>
    </div>
  );
}