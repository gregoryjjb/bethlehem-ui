import React from 'react';
import SettingsCard from '../components/SettingsCard';
import Store from '../utils/store';
import api from '../utils/api';

const settingsShape = [{
    name: 'gpioPinNumbers',
    type: 'text',
    helperText: 'List the pin numbers of the channels available',
    validate: s => /^(\d+)(,\d+)*$/.test(s.replace(/\s+/, '')),
    invalidMessage: 'Enter a comma-separated list of numbers',
    toConfig: s => s.replace(/\s+/, '').split(',').map(s => Number(s)),
    toSettings: c => c.join(', '),
}]

class SettingsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleSubmit = results => {
        this.props.store.set('config.fetching')(true);
        
        // Clean results
        const config = {
            ...results,
            gpioPinNumbers: results.gpioPinNumbers
                .replace(/\s+/, '')
                .split(',')
                .filter(s => s !== '')
                .map(s => Number(s)),
            interShowDelay: Number(results.interShowDelay),
        }
        
        api.setConfig(config)
        .then(res => console.log(res))
        .catch()
        .finally(() => this.props.store.set('config.fetching')(false))
    }
    
    render() {
        const { store } = this.props;
        
        const config = {
            gpioPinNumbers: store.get('config.gpioPinNumbers').join(', '),
            useBoardPinNumbering: store.get('config.useBoardPinNumbering'),
            invertPinOutput: store.get('config.invertPinOutput'),
            interShowDelay: store.get('config.interShowDelay'),
        }
        
        return (
            <SettingsCard config={config} onSubmit={this.handleSubmit} fetching={store.get('config.fetching')} />
        )
    }
}

export default Store.withStore(SettingsContainer);