"use client";
import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

const TodoList = ({ todos, onDelete }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex flex-col gap-3">
          {todos.length != 0 && (
            <p className="sm:block hidden bg-red-200 font-bold text-lg ps-2 mb-2">
              High Priority
            </p>
          )}
          {todos?.map(
            (todo) =>
              todo.priority === "High" && (
                <div
                  key={todo.id}
                  className="flex items-center justify-between gap-4 py-4 px-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <Link href={`/todo/${todo.id}`}>
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {todo.title}
                      </span>
                    </Link>
                    <p className="sm:hidden block text-md text-red-400 font-semibold">
                      High Priority
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              )
          )}
        </div>

        <div className="flex flex-col gap-3">
          {todos.length != 0 && (
            <p className="sm:block hidden bg-yellow-100 font-bold text-lg ps-2 mb-2">
              Medium Priority
            </p>
          )}
          {todos?.map(
            (todo) =>
              todo.priority === "Medium" && (
                <div
                  key={todo.id}
                  className="flex items-center justify-between gap-4 py-4 px-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <Link href={`/todo/${todo.id}`}>
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {todo.title}
                      </span>
                    </Link>
                    <p className="sm:hidden block text-md text-yellow-400 font-semibold">
                      Medium Priority
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              )
          )}
        </div>

        <div className="flex flex-col gap-3">
          {todos.length != 0 && (
            <p className="sm:block hidden bg-green-200 font-bold text-lg ps-2 mb-2">
              Low Priority
            </p>
          )}
          {todos?.map(
            (todo) =>
              todo.priority === "Low" && (
                <div
                  key={todo.id}
                  className="flex items-center justify-between gap-4 py-4 px-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <Link href={`/todo/${todo.id}`}>
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {todo.title}
                      </span>
                    </Link>
                    <p className="sm:hidden block text-md text-green-400 font-semibold">
                      Low Priority
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
