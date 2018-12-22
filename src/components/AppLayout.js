import React from 'react';
import { withStyles } from '@material-ui/core';
import SideMenu from './SideMenu';
import HeaderContainer from '../containers/HeaderContainer';
import Header from './Header';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        minHeight: '100vh',
        width: '100%',
    },
    across: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    grow: {
        flex: '1 1 auto',
    },
    area: {
        flex: '1 1 100%',
        paddingBottom: 80, // Leave space for FAB
        maxWidth: '100%',
    }
})

class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            menuOpen: false,
            headerHeight: 0,
        }
        
        this.headerRef = null;
    }
    
    updateHeight = () => {
        if(this.headerRef) {
            const headerHeight = this.headerRef.clientHeight;
            this.setState({ headerHeight });
        }
    }
    
    componentDidMount() {
        this.updateHeight();
        window.addEventListener('resize', this.updateHeight);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeight);
    }
    
    render() {
        const { classes, children } = this.props;
        
        return(
            <div className={classes.root}>
                <div
                    ref={r => this.headerRef = r}
                    style={{ position: 'fixed', width: '100%', zIndex: 1000 }} >
                    <HeaderContainer />
                </div>
                <div style={{ height: this.state.headerHeight }}></div>
                <div className={classes.across}>
                    <SideMenu
                        spacerHeight={this.state.headerHeight}
                        isOpen={this.state.menuOpen}
                        onOpen={() => this.setState({ menuOpen: true })}
                        onClose={() => this.setState({ menuOpen: false })} />
                    <div className={classes.area}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AppLayout);