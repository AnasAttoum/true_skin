import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialog({ open, handleClose, handleAgree, text }: { open: boolean, handleClose: () => void, handleAgree: () => void, text:string }) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{text}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'gray' }}>Disagree</Button>
                    <Button onClick={handleAgree} sx={{ color: 'var(--primary)' }}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default React.memo(DeleteDialog)