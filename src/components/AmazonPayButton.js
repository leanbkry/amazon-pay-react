/* global amazon, OffAmazonPayments */
import React, {PureComponent}     from 'react';
import PropTypes                  from 'prop-types';

const AMAZON_PAY_BUTTON_DIV_ID = 'AmazonPayButton';

class AmazonPayButton extends PureComponent {

  constructor(props) {
    super(props);

    this.onAuthorization = this.onAuthorization.bind(this);
    this.onError = this.onError.bind(this);
  }

  onAuthorization(response) {
    const {onAuthorization} = this.props;
    onAuthorization && onAuthorization(response);
  }

  /**
   *
   * @param err
   */
  onError(err) {
    const {onError} = this.props;
    onError && onError(err);
  }

  componentDidMount() {
    const {
      sellerId, scope, type, color, size, language, useAmazonAddressBook,
    } = this.props;

    OffAmazonPayments.Button(AMAZON_PAY_BUTTON_DIV_ID, sellerId, {
      type,
      color,
      size,
      language,
      useAmazonAddressBook,
      authorization: () => {
        const loginOptions = {scope};

        amazon.Login.authorize(loginOptions, this.onAuthorization);
      },
      onError:       this.onError,
    });
  }

  render() {
    return <div id={AMAZON_PAY_BUTTON_DIV_ID}/>;
  }
}

AmazonPayButton.propTypes = {
  sellerId:             PropTypes.string.isRequired,
  scope:                PropTypes.string.isRequired,
  type:                 PropTypes.string.isRequired,
  color:                PropTypes.string.isRequired,
  size:                 PropTypes.string.isRequired,
  useAmazonAddressBook: PropTypes.bool.isRequired,
  onAuthorization:      PropTypes.func.isRequired,
  onError:              PropTypes.func,
  language:             PropTypes.string
};

export default AmazonPayButton;
