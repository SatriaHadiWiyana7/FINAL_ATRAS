import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Dropdown({ placeholder, menuItems, ...props }) {
  return (
    <div>
      <Select
        displayEmpty
        input={<OutlinedInput />}
        sx={{ width: '100%' }}
        renderValue={(selected) => {
          if (!selected) {
            return <span className='opacity-60'>{placeholder}</span>;
          }
          const selectedItem = menuItems.find((item) => item.value === selected);
          return selectedItem ? selectedItem.label : placeholder;
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        {...props}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            sx={{ borderBottom: '1px solid rgba(0,0,0,0.6' }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
