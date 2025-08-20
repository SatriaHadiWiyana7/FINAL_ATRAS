import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = React.forwardRef(({ 
  children, 
  value, 
  onValueChange, 
  disabled = false,
  className,
  ...props 
}, ref) => {
  // Filter out props that shouldn't be passed to DOM elements
  const {
    onValueChange: _onValueChange,
    value: _value,
    disabled: _disabled,
    ...domProps
  } = props;

  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={selectRef}
      className={cn("relative", className)}
      {...domProps}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            open,
            setOpen,
            value,
            onValueChange,
            disabled,
            currentValue: value
          });
        }
        return child;
      })}
    </div>
  );
});

Select.displayName = "Select";

const SelectTrigger = React.forwardRef(({ 
  children, 
  className, 
  open, 
  setOpen, 
  disabled,
  onValueChange, // Filter out this prop
  value, // Filter out this prop
  ...props 
}, ref) => {
  // Filter out props that shouldn't be passed to DOM elements
  const {
    onValueChange: _onValueChange,
    value: _value,
    open: _open,
    setOpen: _setOpen,
    ...domProps
  } = props;

  return (
    <button
      ref={ref}
      type="button"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={() => !disabled && setOpen(!open)}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
        className
      )}
      {...domProps}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-200", open && "rotate-180")} />
    </button>
  );
});

SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(({ 
  placeholder, 
  value, 
  options = [],
  open, // Filter out this prop
  setOpen, // Filter out this prop
  onValueChange, // Filter out this prop
  disabled, // Filter out this prop
  className,
  ...props 
}, ref) => {
  // Filter out props that shouldn't be passed to DOM elements
  const {
    open: _open,
    setOpen: _setOpen,
    onValueChange: _onValueChange,
    disabled: _disabled,
    options: _options,
    ...domProps
  } = props;

  const selectedOption = options.find(option => option.value === value);
  
  return (
    <span 
      ref={ref}
      className={cn("text-left", className)}
      {...domProps}
    >
      {selectedOption ? selectedOption.label : placeholder}
    </span>
  );
});

SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(({ 
  children, 
  open, 
  className,
  value,
  onValueChange,
  setOpen,
  currentValue,
  ...props 
}, ref) => {
  // Filter out props that shouldn't be passed to DOM elements
  const {
    onValueChange: _onValueChange,
    value: _value,
    disabled: _disabled,
    setOpen: _setOpen,
    currentValue: _currentValue,
    ...domProps
  } = props;

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...domProps}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onValueChange,
            setOpen,
            currentValue: value
          });
        }
        return child;
      })}
    </div>
  );
});

SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ 
  value, 
  children, 
  onValueChange, 
  setOpen, 
  currentValue,
  className,
  ...props 
}, ref) => {
  // Filter out props that shouldn't be passed to DOM elements
  const {
    onValueChange: _onValueChange,
    setOpen: _setOpen,
    currentValue: _currentValue,
    open: _open,
    disabled: _disabled,
    ...domProps
  } = props;

  const isSelected = value === currentValue;

  const handleClick = () => {
    if (typeof onValueChange === 'function') {
      onValueChange(value);
    }
    if (typeof setOpen === 'function') {
      setOpen(false);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={handleClick}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 px-3 text-sm outline-none hover:bg-gray-50 focus:bg-gray-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-green-50 text-green-900",
        className
      )}
      {...domProps}
    >
      {isSelected && (
        <Check className="mr-2 h-4 w-4 text-green-600" />
      )}
      {children}
    </button>
  );
});

SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-2 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));

SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
};
