import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import Login from '../login/login'
import Register from '../Register/register'


export default function ModalComponent({ open = false, onClose = () => {}, mode = 'login', setMode = () => {} }) {
  const handleSuccess = () => {
    // After login or auto-login (post-signup), close the modal
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{mode === 'signup' ? 'Sign up' : 'Login'}</DialogTitle>
      <DialogContent>
        {mode === 'signup' ? (
          <Register onSuccess={handleSuccess} />
        ) : (
          <Login onSuccess={handleSuccess} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}