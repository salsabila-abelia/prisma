import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  private todos = [
    { id: 1, title: 'Belajar NestJS', status: 'pending' },
    { id: 2, title: 'Buat Tugas Todo List', status: 'done' },
  ];

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) throw new NotFoundException(`Todo dengan id ${id} tidak ditemukan`);
    return todo;
  }

  create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      id: this.todos.length + 1,
      ...createTodoDto,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: number) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException(`Todo dengan id ${id} tidak ditemukan`);
    const deleted = this.todos[index];
    this.todos.splice(index, 1);
    return deleted;
  }
}
