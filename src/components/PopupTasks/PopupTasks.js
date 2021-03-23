import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from '../Controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
      padding: theme.spacing(2),
      position:'absolute',
      top: theme.spacing(5)
    },
    dialogTitle: {
      paddingRight: '0px'
    }
}))
// function to handle popup for form
function PopupTasks(props) {
  // set data for form as props
  const { title, children, showTaskList, setShowTaskList } = props;
  // use styling for theme
  const classes = useStyles();

  return (
    <Dialog open={showTaskList} fullWidth maxWidth="md" classes={{ paper :classes.dialogWrapper }}>
        <DialogTitle>
            <div style={{display: 'flex'}}>
              <Typography variant="h5" component="div" style={{flexGrow:1}}>
                {title}
              </Typography>
              <Controls.ActionButton
                color="secondary"
                variant="outlined"
                onClick={() => {setShowTaskList(false)}}>
                <CloseIcon />
              </Controls.ActionButton>
            </div>
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}

export default PopupTasks;