import React from 'react';
import Header from '../components/Header';

class HeaderContainer extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.headerRef = null;
        
        this.state = {
            height: 0,
        };
    }
    
    updateHeight = () => {
        if(this.headerRef) {
            const height = this.headerRef.clientHeight;
            this.setState({ height });
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
        return (
            <React.Fragment>
                <div
                    ref={r => this.headerRef = r}
                    style={{ position: 'fixed', width: '100%', zIndex: 1000 }} >
                    <Header  />
                </div>
                <div style={{ height: this.state.height }} ></div>
            </React.Fragment>
        )
    }
}

export default HeaderContainer;