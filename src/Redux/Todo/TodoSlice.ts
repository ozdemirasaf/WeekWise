import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoItem {
    id: string;
    dayKey: string;
    title: string;
    startTime: string;
    endTime: string;
    description: string;
}


interface TodoState {
    todos: TodoItem[]
}

const initialState: TodoState = {
    todos: []
}

export const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        TodoAdd: (state, action: PayloadAction<TodoItem>) => {
            state.todos.push(action.payload)
        },
        TodoRemove: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(state => state.id !== action.payload)
        }
    },
})

export const { TodoAdd, TodoRemove } = TodoSlice.actions

export default TodoSlice.reducer