import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField
} from '@mui/material';

const ReplyModal = ({ open, handleClose, handleSave, parentCommentId }) => {
    const [reply, setReply] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(parentCommentId, reply);
        setReply('');
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Reply to Comment</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your reply below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="reply"
                    label="Reply"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save Reply</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReplyModal;
