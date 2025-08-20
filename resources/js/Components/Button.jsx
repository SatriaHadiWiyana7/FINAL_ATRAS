import React from "react";

export default function Button({
    className = "",
    type,
    disabled,
    children,
    href,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                "hover:bg-opacity-80 transition-all ease-in-out duration-200 py-2 sm:px-6 px-3 rounded-lg font-bold " +
                (type == "secondary"
                    ? "bg-white text-primary border-primary border-2"
                    : "bg-primary text-white ") +
                className
            }
        >
            { children }
        </button>
    );
}
