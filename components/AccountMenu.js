import { useState } from 'react';
import NextLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { LogoutIcon } from './icons/LogoutIcon';
import { Typography } from '@mui/material';

export default function AccountMenu({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small">
          <Avatar
            alt={user.name}
            src={user.picture}
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            boxShadow:
              'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            padding: '0.5rem 1rem'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack
          sx={{
            px: '16px',
            pb: '6px'
            // ':hover': {
            //   backgroundColor: 'transparent',
            //   cursor: 'default'
            // }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={user.picture} />
            <Stack>
              <Typography variant="p" component="p" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="p" component="p" sx={{ color: '#98a1b3' }}>
                {user.email}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ my: '8px' }} />
        {/* <MenuItem>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          Your Profile
        </MenuItem>
        <Divider /> */}
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <NextLink href="/api/auth/logout">
            <a>Logout</a>
          </NextLink>
        </MenuItem>
      </Menu>
    </>
  );
}
