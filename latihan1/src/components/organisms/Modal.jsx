import { useState } from "react"
import Button from "../atoms/Button"

export default function Modal({ 
  isOpen = false,
  onClose = () => {},
  title = "Modal",
  children,
  actions = null,
  className = "",
  ...props 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" {...props}>
      <div className={`bg-white rounded-lg shadow-xl w-96 p-6 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          {children}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          {actions && actions}
        </div>
      </div>
    </div>
  )
}
