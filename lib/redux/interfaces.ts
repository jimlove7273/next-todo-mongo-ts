export interface toDoState {
	value: Todo[]
}

export interface Todo {
	_id?: string;
  heading: string;
	description: string;
	done: string
}