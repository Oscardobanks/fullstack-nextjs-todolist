"use client";
import { useEffect, useState } from "react";
import TodoList from "./todoList/page";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  getTodoData,
} from "./store/store";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import checkIcon from "../assets/check-mark.png";
import { Tabs } from "flowbite-react";
import { MdChecklist } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import CompleteTodoList from "./completeTodoList/CompleteTodoList";
import { ModalComponent } from "./modal/Modal";
import useModal from "./customHook/CustomHook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const { todos, todo, status } = useSelector(getTodoData);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    try {
      const data = fetchTodos();
      dispatch(fetchTodos(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const handleCreate = async (newTodo) => {
    try {
      const todoWithId = { ...newTodo, id: todos.length + 1, created: new Date };
      dispatch(createTodo(todoWithId));
      dispatch(fetchTodos());
      toast.success("Todo created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create todo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deleteTodo(id));
      toast.warning("Todo deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo.");
    }
  };


  if (status === "loading") {
    return (
        <div className="lg:fixed relative lg:mt-0 mt-60 top-1/2 lg:left-1/2 flex justify-center gap-2">
          <Spinner color="purple" aria-label="Loading" size="md" />
          <span className="pl-3 text-purple-600 font-semibold text-lg">Loading...</span>
        </div>
    );
  }

  return (
    <div className="container max-w-4xl mt-16 px-4 mx-auto">
      <Image src={checkIcon} alt="Check Mark" width={100} priority />
      <div className="flex items-center justify-between my-5">
        <h1 className="text-3xl font-bold text-center">
          Todo List
        </h1>
        <Button onClick={openModal} color="purple">
          Add
        </Button>
        <ModalComponent isModalOpen={isModalOpen} closeModal={closeModal} onSubmit={handleCreate}
            todo={todo} />
      </div>

      <Tabs aria-label="Tabs with underline" variant="underline">
        <Tabs.Item
          active
          title={`All tasks ${todos.length}`}
          icon={MdFormatListBulleted}
        >
          <div className="max-w-4xl mx-auto">
            <TodoList
              todos={todos}
              onDelete={handleDelete}
            />
          </div>
        </Tabs.Item>
        <Tabs.Item title={`Completed ${todos.filter((todo) => todo.completed).length}`} icon={MdChecklist}>
          <CompleteTodoList
            todos={todos}
            onDelete={handleDelete}
          />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
