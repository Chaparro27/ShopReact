import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ModalAction({ open, onClose, onConfirm, action, itemId }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>Confirm action</DialogTitle>
      <DialogContent>
        {action === 'delete' ? (
          <p>¿Are you sure you want to delete this item??</p>
        ) : (
          <p>¿Do you want to edit this item??</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onConfirm(action, itemId)} color="error">
         Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAction;