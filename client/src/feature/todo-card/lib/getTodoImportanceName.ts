import {TodoImportance} from "@/shared/http/todo/getTodos.ts";

export const getTodoImportanceName = (status: TodoImportance) => {
  switch (status) {
    case "important":
      return "Важно"
    default:
      return "Обычно"
  }
}
