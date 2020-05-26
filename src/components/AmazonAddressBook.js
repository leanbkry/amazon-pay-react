/* global OffAmazonPayments */
import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';

const DEFAULT_STYLE = {
  width:  '400px',
  height: '228px',
};

const AMAZON_ADDRESS_BOOK_DIV_ID = 'addressBookWidgetDiv';

class AmazonAddressBook extends PureComponent {

  constructor(props) {
    super(props);

    this.onOrderReferenceCreate = this.onOrderReferenceCreate.bind(this);
    this.onAddressSelect = this.onAddressSelect.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onError = this.onError.bind(this);
  }

  /**
   * @description Here is where you can grab the Order Reference ID.
   * orderReference.getAmazonOrderReferenceId();
   *
   * @param orderReference
   */
  onOrderReferenceCreate(orderReference) {
    const {onOrderReferenceCreate} = this.props;
    onOrderReferenceCreate && onOrderReferenceCreate(orderReference);
  }

  /**
   *
   * @description Replace the following code with the action that you want
   * to perform after the address is selected. The amazonOrderReferenceId can
   * be used to retrieve the address details by calling the
   * GetOrderReferenceDetails operation. If rendering the AddressBook and Wallet
   * widgets on the same page, you do not have to provide any additional.
   * logic to load the Wallet widget after the AddressBook widget. The Wallet
   * widget will re-render itself on all subsequent onAddressSelect events
   * without any action from you. We don't recommend that you explicitly
   * refresh it.
   *
   * @param orderReference
   */
  onAddressSelect(orderReference) {
    const {onAddressSelect} = this.props;

    onAddressSelect && onAddressSelect(orderReference);
  }

  /**
   *
   * @description Enter code here that you want to be executed when the address
   * widget has been rendered.
   *
   * @param orderReference
   */
  onReady(orderReference) {
    const {onReady} = this.props;
    onReady && onReady(orderReference);
  }

  /**
   *
   * @description During development you can use the following code to view
   * error messages:
   *
   * console.log(err.getErrorCode() + ': ' + err.getErrorMessage());
   *
   * See "Handling Errors" for more information.
   *
   * @param err
   */
  onError(err) {
    const {onError} = this.props;
    onError && onError(err);
  }

  componentDidMount() {
    const {sellerId, agreementType, language} = this.props;

    new OffAmazonPayments.Widgets.AddressBook({
      onOrderReferenceCreate: this.onOrderReferenceCreate,
      onReady:                this.onReady,
      onAddressSelect:        this.onAddressSelect,
      onError:                this.onError,
      language,
      sellerId,
      agreementType,
      design:                 {
        designMode: 'responsive',
      },
    }).bind(AMAZON_ADDRESS_BOOK_DIV_ID);
  }

  render() {
    const {style, widgetClassName, widgetStyle} = this.props;

    return (
      <div className={widgetClassName} id={AMAZON_ADDRESS_BOOK_DIV_ID} style={widgetStyle ? widgetStyle : AmazonAddressBook.getStyle(style)}/>
    );
  }
}

AmazonAddressBook.getStyle = (style) => {
  if (typeof style === 'object') return style;

  return DEFAULT_STYLE;
};

AmazonAddressBook.propTypes = {
  sellerId:               PropTypes.string.isRequired,
  agreementType:          PropTypes.string.isRequired,
  language:               PropTypes.string,
  widgetClassName:        PropTypes.string,
  widgetStyle:            PropTypes.object,
  style:                  PropTypes.object,
  onReady:                PropTypes.func,
  onError:                PropTypes.func,
  onAddressSelect:        PropTypes.func,
  onOrderReferenceCreate: PropTypes.func,
};

export default AmazonAddressBook;
