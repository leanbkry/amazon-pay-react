import React, {Component}     from 'react';
import {appendScript, REGION} from './utils/index';
import PropTypes              from 'prop-types';

export const bootstrapWithAmazon = (WrappedComponent) => {
  class _BootstrappedAmazonComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        scriptLoaded:         false
      }
    }

    componentDidMount() {
      const {isSandbox, onAmazonReady, clientId, region} = this.props;
      const {scriptLoaded} = this.state;

      window.onAmazonLoginReady = () => {
        window.amazon.Login.setClientId(clientId);
        onAmazonReady && onAmazonReady();
      };


      if (window.amazon) {
        if (!scriptLoaded) {
          this.setState({scriptLoaded: true});
          window.onAmazonLoginReady();
        }
        return;
      }

      appendScript(isSandbox, region);
    }

    render() {
      const {amazonScriptLoaded} = this.props;
      if (!amazonScriptLoaded && !window.amazon) return <React.Fragment/>;

      return <WrappedComponent {...this.props}/>;
    }
  }

  _BootstrappedAmazonComponent.propTypes = {
    clientId:           PropTypes.string.isRequired,
    language:           PropTypes.string,
    onAmazonReady:      PropTypes.func,
    amazonScriptLoaded: PropTypes.bool,
    region:             PropTypes.oneOf(Object.values(REGION)),
  };

  return _BootstrappedAmazonComponent;
};
