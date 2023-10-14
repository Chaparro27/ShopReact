import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

import {AppBar,Box,Toolbar,Typography,Container,Button} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#0077C0', color: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PhoneCRUD
          </Typography>
          {isAuthenticated ? ( 
            <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'  } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{ textDecoration: 'none', color: 'white' }} to='/newProduct'>Add Product</Link>
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                  backgroundColor: '#1414B8',
                }, }}
              >
                <Link style={{ textDecoration: 'none', color: 'white' }} to='/productslist'>List Of products</Link>
              </Button>
            </Box>
            <Button
              sx={{ my: 2, color: 'white', backgroundColor: '#DC143C', ml: 2, '&:hover': {
                backgroundColor: '#8B0000',
              }, }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
            {/* <Box sx={{ flexGrow: 1 }}>
            <Button
              sx={{ my: 2, color: 'white', backgroundColor: 'red', ml: 2 }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
            </Box> */}
            </>
          ) : (
            <>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
