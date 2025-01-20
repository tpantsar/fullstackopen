import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Todo from './Todo'
import React from 'react'

describe('Todo component', () => {
  const todo = {
    id: '1',
    text: 'Test todo',
    done: false,
  }

  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  test('renders todo text', () => {
    render(
      <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    )
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  test('renders not done info when todo is not done', () => {
    render(
      <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    )
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  test('renders done info when todo is done', () => {
    const doneTodo = { ...todo, done: true }
    render(
      <Todo
        todo={doneTodo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    )
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.queryByText('Set as done')).not.toBeInTheDocument()
  })

  test('calls deleteTodo when delete button is clicked', () => {
    render(
      <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    )
    fireEvent.click(screen.getByText('Delete'))
    expect(deleteTodo).toHaveBeenCalledWith(todo)
  })

  test('calls completeTodo when set as done button is clicked', () => {
    render(
      <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    )
    fireEvent.click(screen.getByText('Set as done'))
    expect(completeTodo).toHaveBeenCalledWith(todo)
  })
})
