/* global amazon */
import React, {Component}                from 'react';
import AmazonAddressBook                 from './AmazonAddressBook';
import ConsentWidget                     from './ConsentWidget';
import AmazonPayButton                   from './AmazonPayButton';
import {appendScript, REGION, toBoolean} from '../utils';
import PropTypes                         from 'prop-types';
import WalletWidget                      from './WalletWidget';

class AmazonPay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scriptLoaded:         false,
      shouldDisplayWidgets: false,
      shouldDisplayConsent: false,
      hasConsent:           false,
    };

    this.handleAddressBookReady = this.handleAddressBookReady.bind(this);
    this.handleAddressBookError = this.handleAddressBookError.bind(this);
    this.handleConsentOnReady = this.handleConsentOnReady.bind(this);
    this.handleOnConsent = this.handleOnConsent.bind(this);
    this.handleConsentError = this.handleConsentError.bind(this);
    this.handleBtnOnAuthorization = this.handleBtnOnAuthorization.bind(this);
    this.handleWalletError = this.handleWalletError.bind(this);
    this.handleOnPaymentSelect = this.handleOnPaymentSelect.bind(
      this);
    this.onOrderReferenceCreate = this.onOrderReferenceCreate.bind(
      this);
    this.onAmazonLoginReady = this.onAmazonLoginReady.bind(this);
    this.handleButtonError = this.handleButtonError.bind(this);
    this.handleOnAddressSelect = this.handleOnAddressSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.scriptLoaded !== nextState.scriptLoaded) ||
           (this.state.shouldDisplayWidgets !==
            nextState.shouldDisplayWidgets) ||
           (this.state.shouldDisplayConsent !==
            nextState.shouldDisplayConsent) ||
           (this.props.hasConsent !== nextProps.hasConsent) ||
           (this.props.billingAgreementId !== nextProps.billingAgreementId)
    ;
  }

  componentDidMount() {
    const {isSandbox, region} = this.props;
    const {scriptLoaded} = this.state;

    window.onAmazonLoginReady = this.onAmazonLoginReady;

    if (window.amazon) {
      if (!scriptLoaded) this.onAmazonLoginReady();
      return;
    }

    appendScript(isSandbox, region);
  }

  onAmazonLoginReady() {
    const {onAmazonLoginReady} = this.props;
    this.renderAmazonPayButton();
    onAmazonLoginReady && onAmazonLoginReady();
  }

  handleAddressBookError(err) {
    const {handleAddressBookError} = this.props;
    handleAddressBookError && handleAddressBookError(err);
  }

  renderAmazonPayButton() {
    const {clientId} = this.props;

    window.amazon.Login.setClientId(clientId);
    this.setState({scriptLoaded: true});
  }

  handleAddressBookReady(billingAgreement) {
    this.setState({shouldDisplayConsent: true});
    this.props.handleBillingAgreementId(
      billingAgreement.getAmazonBillingAgreementId(),
    );
  }

  /**
   *
   * @description Called after widget renders.
   * buyerBillingAgreementConsentStatus = billingAgreementConsentStatus.getConsentStatus();
   * getConsentStatus returns true or false
   * true – checkbox is selected
   * false – checkbox is unselected - default
   *
   * @param {object} billingAgreementConsentStatus
   */
  handleConsentOnReady(billingAgreementConsentStatus) {
    if (
      !billingAgreementConsentStatus ||
      typeof billingAgreementConsentStatus.getConsentStatus !== 'function'
    ) {
      return;
    }

    this.props.onConsentChange(
      toBoolean(billingAgreementConsentStatus.getConsentStatus()),
    );
  }

  /**
   * @description getConsentStatus returns true or false.
   * true – checkbox is selected – buyer has consented
   * false – checkbox is unselected – buyer has not consented
   * Replace this code with the action that you want to perform
   * after the consent checkbox is selected/unselected.
   *
   * @param {object} billingAgreementConsentStatus
   */
  handleOnConsent(billingAgreementConsentStatus) {
    const buyerBillingAgreementConsentStatus =
            billingAgreementConsentStatus.getConsentStatus();

    this.props.onConsentChange(toBoolean(buyerBillingAgreementConsentStatus));
  }

  /**
   *
   * @param {Error} err
   */
  handleConsentError(err) {
    const {handleConsentError} = this.props;
    handleConsentError && handleConsentError(err.getErrorMessage());
  }

  handleBtnOnAuthorization(response) {
    if (response.status !== 'complete') return;
    this.setState({shouldDisplayWidgets: true});
  }

  /**
   *
   * @param {Error} err
   */
  handleWalletError(err) {
    const {handleWalletError} = this.props;
    handleWalletError && handleWalletError(err.getErrorMessage());
  }

  /**
   *
   * @param {object} orderReference
   */
  handleOnPaymentSelect(orderReference) {
    const {onPaymentSelect} = this.props;
    onPaymentSelect && onPaymentSelect(orderReference);
  }

  /**
   *
   * @param {object} orderReference
   */
  onOrderReferenceCreate(orderReference) {
    const {onOrderReferenceCreate} = this.props;
    onOrderReferenceCreate && onOrderReferenceCreate(orderReference);
  }

  
  /**
   *
   * @param {Error} err
   */
  handleButtonError(err) {
    const {handleButtonError} = this.props;
    handleButtonError && handleButtonError(err.getErrorMessage());
  }

  /**
   *
   * @description
   * Replace the following code with the action you that want to perform
   * after the address is selected. The amazonBillingAgreementId can be used to
   * retrieve the address details by calling the GetBillingAgreementDetails
   * operation. If rendering the AddressBook and Wallet widgets on the same page,
   * you should wait for this event before you render the Wallet widget for
   * the first time. The Wallet widget will re-render itself on all subsequent
   * onAddressSelect events, without any action from you. It is not
   * recommended that you explicitly refresh it.
   *
   *
   * @param {object} billingAgreement
   */
  handleOnAddressSelect(billingAgreement) {
    const {onAddressSelect} = this.props;
    onAddressSelect && onAddressSelect(billingAgreement);
  }

  render() {
    const {
      sellerId, agreementType, widgetStyle, hideConsentWidget, widgetClassName, hidePayButton, billingAgreementId, scope, language, btnType, btnColor, btnSize,
      useAmazonAddressBook,
    } = this.props;
    const {scriptLoaded, shouldDisplayWidgets, shouldDisplayConsent} = this.state;

    return (
      <React.Fragment>
        {scriptLoaded && !hidePayButton && <AmazonPayButton sellerId={sellerId}
          onAuthorization={this.handleBtnOnAuthorization}
          scope={scope}
          onError={this.handleButtonError}
          type={btnType}
          language={language}
          color={btnColor}
          size={btnSize}
          useAmazonAddressBook={useAmazonAddressBook}
        />}
        {shouldDisplayWidgets && (
          <div className="row">
            <AmazonAddressBook sellerId={sellerId}
              agreementType={agreementType}
              onReady={this.handleAddressBookReady}
              onError={this.handleAddressBookError}
              language={language}
              widgetClassName={widgetClassName}
              widgetStyle={widgetStyle}
              onAddressSelect={this.handleOnAddressSelect}
              onOrderReferenceCreate={this.onOrderReferenceCreate}
            />
            <WalletWidget sellerId={sellerId}
              onError={this.handleWalletError}
              language={language}
              widgetClassName={widgetClassName}
              widgetStyle={widgetStyle}
              onPaymentSelect={this.handleOnPaymentSelect}
            />

            { !hideConsentWidget && shouldDisplayConsent && billingAgreementId &&
             <ConsentWidget sellerId={sellerId}
               amazonBillingAgreementId={billingAgreementId}
               onError={this.handleConsentError}
               language={language}
               widgetClassName={widgetClassName}
               widgetStyle={widgetStyle}
               onReady={this.handleConsentOnReady}
               onConsent={this.handleOnConsent}
             />
            }
          </div>
        )}
      </React.Fragment>
    );
  }
}

AmazonPay.propTypes = {
  clientId:                 PropTypes.string.isRequired,
  sellerId:                 PropTypes.string.isRequired,
  agreementType:            PropTypes.string.isRequired,
  billingAgreementId:       PropTypes.string.isRequired,
  onConsentChange:          PropTypes.func.isRequired,
  handleBillingAgreementId: PropTypes.func.isRequired,
  scope:                    PropTypes.string.isRequired,
  btnType:                  PropTypes.string.isRequired,
  btnColor:                 PropTypes.string.isRequired,
  btnSize:                  PropTypes.string.isRequired,
  language:                 PropTypes.string,
  widgetClassName:          PropTypes.string,
  widgetStyle:              PropTypes.object,
  useAmazonAddressBook:     PropTypes.bool.isRequired,
  hidePayButton:            PropTypes.bool,
  hideConsentWidget:        PropTypes.bool,
  region:                   PropTypes.oneOf(Object.values(REGION)),
  isSandbox:                PropTypes.bool,
  onAddressSelect:          PropTypes.func,
  onPaymentSelect:          PropTypes.func,
  onOrderReferenceCreate:   PropTypes.func,
  onAmazonLoginReady:       PropTypes.func,
  handleAddressBookError:   PropTypes.func,
  handleWalletError:        PropTypes.func,
  handleConsentError:       PropTypes.func,
  handleButtonError:        PropTypes.func,
};

export default AmazonPay;
