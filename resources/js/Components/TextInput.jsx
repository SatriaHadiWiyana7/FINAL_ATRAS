import { TextField } from "@mui/material";
import {forwardRef, useRef} from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
	const input = ref ? ref : useRef();
    return (
        <TextField
            {...props}
            type={type}
            className={
                'rounded-[4px] shadow-sm mt-3' +
                className
            }
			ref={input}
        />
    );
});
