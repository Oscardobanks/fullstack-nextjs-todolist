import { todos as todosData } from "@/app/data/todos";
import { NextResponse } from "next/server";

// let todosData = [...todos];

export async function GET() {
  return NextResponse.json(todosData, { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const newTodo = { id: todosData.length + 1, ...body };
  todosData.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}


