export class CreateTodoDto {
    readonly title: string;
    readonly status: string;
  }
  
  export class UpdateTodoDto {
    readonly title?: string;
    readonly status?: string;
  }
  
