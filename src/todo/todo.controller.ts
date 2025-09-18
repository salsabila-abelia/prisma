import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(Number(id));
    }

    @Post()
    create(@Body() CreateTodoDto: CreateTodoDto) {
        return this.todoService.create(CreateTodoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
     return this.todoService.update(Number(id), updateTodoDto);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(Number(id));
    }

}
