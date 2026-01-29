import { useState, useCallback } from 'react'
import { Plus, Check, Trash2, Circle } from 'lucide-react'
import { cn } from './lib/utils'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '프로젝트 기획서 작성하기', completed: false },
    { id: 2, text: '디자인 시안 검토', completed: true },
    { id: 3, text: '팀 미팅 준비', completed: false }
  ])
  const [inputValue, setInputValue] = useState('')

  const addTodo = useCallback((e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }

    setTodos(prev => [...prev, newTodo])
    setInputValue('')
  }, [inputValue])

  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent mb-2">
            할 일 관리
          </h1>
          <p className="text-gray-600">
            오늘 할 일을 계획하고 완료해보세요
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 animate-in fade-in slide-in-from-top duration-700 delay-100">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white">
            <p className="text-sm text-gray-600 mb-1">전체 할 일</p>
            <p className="text-3xl font-bold text-[#3b82f6]">{totalCount}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white">
            <p className="text-sm text-gray-600 mb-1">완료한 할 일</p>
            <p className="text-3xl font-bold text-[#8b5cf6]">{completedCount}</p>
          </div>
        </div>

        {/* Add Todo Form */}
        <form
          onSubmit={addTodo}
          className="mb-6 animate-in fade-in slide-in-from-top duration-700 delay-200"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="새로운 할 일을 입력하세요..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#3b82f6] focus:outline-none transition-colors bg-white/80 backdrop-blur-sm shadow-lg"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              추가
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-500 text-lg">할 일이 없습니다</p>
              <p className="text-gray-400 mt-1">새로운 할 일을 추가해보세요!</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className={cn(
                  "group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-left",
                  todo.completed && "opacity-75"
                )}
                style={{ animationDelay: `${index * 50 + 300}ms` }}
              >
                <div className="flex items-center gap-3">
                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center hover:scale-110",
                      todo.completed
                        ? "bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] border-transparent"
                        : "border-gray-300 hover:border-[#3b82f6]"
                    )}
                  >
                    {todo.completed ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Circle className="w-4 h-4 text-transparent" />
                    )}
                  </button>

                  {/* Todo Text */}
                  <p
                    className={cn(
                      "flex-1 transition-all duration-300",
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    )}
                  >
                    {todo.text}
                  </p>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mt-8 animate-in fade-in duration-700 delay-500">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>진행률</span>
              <span>{Math.round((completedCount / totalCount) * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#06b6d4] transition-all duration-500 ease-out"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App