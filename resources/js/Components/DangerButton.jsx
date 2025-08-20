import { Button } from "@mui/material";

export default function DangerButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            variant="contained"
            color="error"
            {...props}
            className={
                `hover:bg-opacity-80 transition-all ease-in-out duration-200 py-2 sm:px-6 px-3 rounded-lg font-bold bg-red-500 text-white ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
