import { todos as todosData } from "@/app/data/todos";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const todoId = url.pathname.split("/").pop();

    const todo = todosData.find((t) => t.id === parseInt(todoId, 20));

    if (todo) {
      return NextResponse.json(todo, { status: 200 });
    } else {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
  } catch (err) {
    console.log("Error in creating todo: ", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const todoId = url.pathname.split("/").pop();
    const todoIndex = todosData.findIndex((t) => t.id === parseInt(todoId, 20));

    if (todoIndex !== -1) {
      const body = await req.json();
      const updatedTodo = { ...todosData[todoIndex], ...body };
      const updatedTodos = [...todosData];
      updatedTodos[todoIndex] = updatedTodo;

      console.log(updatedTodo);

      return NextResponse.json(updatedTodo, { status: 200 });
    } else {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
  } catch (err) {
    console.log("Error in updating todo: ", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const todoId = url.pathname.split("/").pop();
    const updatedTodos = todosData.filter((todo) => todo.id !== parseInt(todoId, 20));

    if (updatedTodos.length === todosData.length) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    } else {
      todosData.length = 0;
      todosData.push(...updatedTodos);
      return NextResponse.json(todosData, { status: 200 });
    }
  } catch (err) {
    console.log("Error in Deleting todo: ", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
