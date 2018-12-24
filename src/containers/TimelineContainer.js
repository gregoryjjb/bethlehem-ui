import React from 'react';
import Timeline, { timelineRenderUpdate } from '../utils/timeline';
import WaveSurfer from '../utils/wavesurfer';
import Store from '../utils/store';

class TimelineContainer extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.tlContainer = null;
        this.wsContainer = null;
        
        this.wavesurfer = null;
        
        this.loadedProjectName = null;
    }
    
    componentDidMount() {
        this.wavesurfer = WaveSurfer.create({
            container: this.wsContainer,
            partialRender: true,
            pixelRatio: 1,
            audioRate: 1,
            autoCenter: false,
            hideScrollbar: true,
            cursorColor: 'white',
        });
        
        Timeline.init(this.tlContainer, this.wavesurfer);
        timelineRenderUpdate();
        
        this.wavesurfer.on('ready', () => {
            this.wavesurfer.zoom(Timeline.timeScale);
            Timeline.duration = this.wavesurfer.getDuration();
        })
        
        document.addEventListener('keydown', this.handleKeypress);
        
        const show = this.props.store.get('editor.show');
        
        if(show) {
            this.loadProject(show.name);
        }
        
        //setTimeout(() => {
        //    this.props.store.set('editor.show')({ displayName: 'Wizards in Winter', name: 'my_show' });
        //}, 2000)
        
        // Load default
        //this.wavesurfer.load('/api/shows/my_show/audio');
        //fetch('/api/shows/my_show/project')
        //    .then(res => res.json())
        //    .then(res => Timeline.loadProjectObject(res.project));
    }
    
    componentWillUnmount() {
        this.wavesurfer.destroy();
        document.removeEventListener('keydown', this.handleKeypress);
    }
    
    componentDidUpdate(prevProps) {
        const { store } = this.props;
        const show = store.get('editor.show');
        
        if(show && show.name !== this.loadedProjectName) {
            console.log('Change in open show detected; RELOADING')
            this.loadProject(show.name);
        }
    }
    
    loadProject = name => {
        if(!name) {
            console.error('Empty name passed to loadProject!');
            return;
        }
        
        this.loadedProjectName = name;
        
        this.wavesurfer.load(`/api/shows/${name}/audio`);
        fetch(`/api/shows/${name}/project`)
            .then(res => res.json())
            .then(res => Timeline.loadProjectObject(res.project));
    }
    
    handleKeypress = e => {
        if(document.activeElement.tagName !== 'CANVAS') {
            console.log('Space pressed, but not in canvas');
            return;
        }
        
        if(e.key === ' ') {
            this.mediaPlayPause();
        }
    }
    
    mediaPlayPause = () => {
        this.wavesurfer.playPause();
        this.props.store.set('editor.playing')(this.wavesurfer.isPlaying());
    }
    
    render() {
        return(
            <div style={{
                background: 'rgb(51, 51, 51)',
                position: 'relative',
                height: 528,
                width: '100%',
            }}>
                <div
                    ref={r => this.wsContainer = r}
                    style={{
                        position: 'absolute',
                        bottom: 400,
                        left: 100,
                        right: 0,
                    }}
                ></div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                    ref={r => this.tlContainer = r}></div>
            </div>
        )
    }
}

export default Store.withStore(TimelineContainer);