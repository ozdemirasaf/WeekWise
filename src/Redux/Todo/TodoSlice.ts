import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TodoItem } from '../types/todo'


interface TodoState {
    todos: TodoItem[],
    hiddenTaskIds: string[]
}

const initialState: TodoState = {
    todos: [],
    hiddenTaskIds: []
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
        },
        TodoUpdate: (state, action: PayloadAction<TodoItem>) => {
            const index = state.todos.findIndex((index) => index.id === action.payload.id)

            if (index !== -1) {
                state.todos[index] = {
                    ...state.todos[index],
                    ...action.payload
                }
            }
        },
        TodoHide: (state, action: PayloadAction<string>) => {
            if (!state.hiddenTaskIds.includes(action.payload)) {
                state.hiddenTaskIds.push(action.payload)
            }
        },
        TodoUnhide: (state, action: PayloadAction<string>) => {
            state.hiddenTaskIds = state.hiddenTaskIds.filter(id => id !== action.payload)
        }
    },
})

export const { TodoAdd, TodoRemove, TodoUpdate, TodoHide, TodoUnhide } = TodoSlice.actions

export default TodoSlice.reducer