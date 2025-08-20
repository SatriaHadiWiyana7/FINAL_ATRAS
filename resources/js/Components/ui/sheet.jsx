import * as React from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

const Sheet = ({ open, onOpenChange, children }) => {
  return (
    <>
      {children}
    </>
  )
}

const SheetTrigger = React.forwardRef(({ className, children, onClick, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(className)}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
))
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef(({ className, side = "right", children, open, onOpenChange, ...props }, ref) => (
  <>
    {/* Overlay */}
    {open && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={() => onOpenChange(false)}
      />
    )}
    
    {/* Sheet Content */}
    <div
      ref={ref}
      className={cn(
        "fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out",
        side === "left" && "inset-y-0 left-0 h-full border-r",
        side === "right" && "inset-y-0 right-0 h-full border-l",
        open ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full",
        className
      )}
      {...props}
    >
      {children}
      <button
        onClick={() => onOpenChange(false)}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  </>
))
SheetContent.displayName = "SheetContent"

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
}
