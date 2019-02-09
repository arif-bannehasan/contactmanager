import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

/**
 * Confirmation dialogs give users the ability to provide final confirmation of a choice
 * before committing to it, so they have a chance to change their minds if necessary.
 * If the user confirms a choice, it’s carried out. Otherwise, the user can dismiss the
 * dialog. For example, users can listen to multiple ringtones but only make a final
 * selection upon touching “OK.”
 */
class ConfirmationDialog extends Component {
  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.props.onOkClick();
    }
  };

  render() {
    /**
     * Properties
     */

    // Dialog
    const { open } = this.props;

    // Custom
    const { title, contentText, cancelText, okText, highlightOkButton } = this.props;

    /**
     * Events
     */

    // Dialog
    const { onClose } = this.props;

    // Custom
    const { onCancelClick, onOkClick } = this.props;

    return (
      <Dialog open={open} onClose={onClose} onKeyPress={this.handleKeyPress}>
        {title && <DialogTitle>{title}</DialogTitle>}

        {contentText &&
          <DialogContent>
            <DialogContentText>{contentText}</DialogContentText>
          </DialogContent>
        }

        {(onCancelClick || onOkClick) &&
          <DialogActions>
            {onCancelClick &&
              <Button color="primary" onClick={onCancelClick}>
                {cancelText || 'Cancel'}
              </Button>
            }

            {onOkClick &&
              <Button color="primary" variant={highlightOkButton && 'contained'} onClick={onOkClick}>
                {okText || 'OK'}
              </Button>
            }
          </DialogActions>
        }
      </Dialog>
    );
  }
}

export default ConfirmationDialog;