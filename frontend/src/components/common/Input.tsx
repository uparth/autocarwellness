import { type InputHTMLAttributes, type SelectHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#111827] mb-2 font-secondary">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          h-11 w-full border rounded-[10px] px-3
          font-secondary text-base text-[#111827] bg-white
          transition-colors duration-200
          placeholder:text-[#6B7280]
          focus:outline-none focus:border-[#F47A20] focus:ring-2 focus:ring-[#F47A20]/10
          ${error ? 'border-[#E9342D]' : 'border-[#D1D5DB]'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-[#E9342D] font-secondary">{error}</p>}
    </div>
  )
);
Input.displayName = 'Input';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#111827] mb-2 font-secondary">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          h-11 w-full border rounded-[10px] px-3
          font-secondary text-base text-[#111827] bg-white
          transition-colors duration-200
          focus:outline-none focus:border-[#F47A20] focus:ring-2 focus:ring-[#F47A20]/10
          ${error ? 'border-[#E9342D]' : 'border-[#D1D5DB]'}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-[#E9342D] font-secondary">{error}</p>}
    </div>
  )
);
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#111827] mb-2 font-secondary">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`
          w-full border rounded-[10px] px-3 py-2.5
          font-secondary text-base text-[#111827] bg-white
          transition-colors duration-200 resize-none
          placeholder:text-[#6B7280]
          focus:outline-none focus:border-[#F47A20] focus:ring-2 focus:ring-[#F47A20]/10
          ${error ? 'border-[#E9342D]' : 'border-[#D1D5DB]'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-[#E9342D] font-secondary">{error}</p>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
