import React from 'react';
import Store from '../utils/store';
import {
    withStyles,
    Dialog,
    DialogContent,
    DialogTitle,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    DialogActions,
    Button,
    TextField,
    Typography,
} from '@material-ui/core';

import api from '../utils/api';
import FileInput from './form/FileInput';
import { fetchShows } from '../utils/actions';

const styles = {
    stepArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
    },
    nextButton: {
        marginTop: 16,
    },
    fileInput: {
        display: 'none',
    },
    fileInputArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileName: {
        marginLeft: 16,
    }
}

class CreateShowDialog extends React.Component {
    
    state = {
        activeStep: 0,
        fetching: false,
        createdShow: null,
        name: '',
        nameError: '',
        audioFile: null,
        audioFileName: '(None selected)',
        audioFileError: '',
    }
    
    handleClose = () => {
        this.props.store.set('createShowDialog.open')(false);
    }
    
    handleNext = () => {
        const nextStep = this.state.activeStep + 1;
        this.setState({ activeStep: nextStep })
    }
    
    handleNameChange = e => {
        this.setState({
            name: e.target.value,
            nameError: '',
        });
    }
    
    handleNameSubmit = () => {
        const { name } = this.state;
        this.setState({ fetching: true });
        
        if(name && name.length > 0) {
            api.createShow(name)
                .then(res => {
                    this.setState({
                        activeStep: 1,
                        createdShow: res.data.show,
                    });
                })
                .catch(err => {
                    if(err.response && err.response.data.error) {
                        this.setState({ nameError: err.response.data.error })
                    }
                })
                .then(() => {
                    this.setState({ fetching: false });
                    fetchShows();
                });
        }
        else {
            this.setState({
                nameError: 'Enter a name',
            });
        }
    }
    
    handleFileChange = e => {
        let files = e.target.files;
        
        if(files && files[0]) {
            let file = files[0];
            let name = file.name;
            let ext = name.replace(/^.*\./g, '');
            
            if(ext === 'mp3') {
                this.setState({
                    audioFile: file,
                    audioFileName: name,
                    audioFileError: '',
                });
            }
            else {
                this.setState({
                    audioFile: null,
                    audioFileName: '(None selected)',
                    audioFileError: 'Only .mp3 files accepted',
                });
            }
        }
    }
    
    handleFileSubmit = e => {
        if(!this.state.audioFile || !this.state.createdShow) {
            return;
        }
        
        const showName = this.state.createdShow.name;
        const file = this.state.audioFile;
        
        this.setState({ fetching: true });
        
        api.createShowAudio(showName, file)
            .then(res => {
                this.setState({ activeStep: 2 });
            })
            .catch(err => {
                this.setState({ audioFileError: 'There was an error processing the file' });
                console.log({ err })
            })
            .then(() => {
                this.setState({ fetching: false });
                fetchShows();
            })
    }
    
    render() {
        const { store, classes } = this.props;
        const {
            activeStep,
            fetching,
            name,
            nameError,
            audioFile,
            audioFileName,
            createdShow,
        } = this.state;
        
        return(
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={store.get('createShowDialog.open')}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm' >
                <DialogTitle>Create New</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep} orientation='vertical' color='secondary'>
                        <Step>
                            <StepLabel>Show/Song Name</StepLabel>
                            <StepContent>
                                <div className={classes.stepArea}>
                                    <TextField
                                        label='Name'
                                        value={name}
                                        variant='outlined'
                                        error={!!nameError}
                                        helperText={nameError}
                                        onChange={this.handleNameChange} />
                                    <Button
                                        className={classes.nextButton}
                                        color='primary'
                                        variant='outlined'
                                        disabled={fetching}
                                        onClick={this.handleNameSubmit}>
                                        Next
                                    </Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Music File</StepLabel>
                            <StepContent>
                                <div className={classes.stepArea}>
                                    <FileInput
                                        label='Audio file'
                                        accept='.mp3'
                                        value={audioFile}
                                        onChange={this.handleFileChange} />
                                    <Button
                                        className={classes.nextButton}
                                        color='primary'
                                        variant='outlined'
                                        disabled={fetching}
                                        onClick={this.handleFileSubmit}>
                                        Next
                                    </Button>
                                </div>
                            </StepContent>
                        </Step>
                    </Stepper>
                    {activeStep === 2 && (
                        <>
                            <Typography variant='h6'>Your new show has been created!</Typography>
                            <Button
                                className={classes.nextButton}
                                color='primary'
                                onClick={() => {
                                    const shows = store.get('shows');
                                    const s = shows.find(s => s.name === createdShow.name) || null;
                                    store.set('editor.show')(s);
                                    this.handleClose();
                                }}>
                                Open in editor
                            </Button>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        {activeStep === 2 ? 'Finish' : 'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default Store.withStore(withStyles(styles)(CreateShowDialog));