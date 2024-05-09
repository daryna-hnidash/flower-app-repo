import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { CartTotal } from '../../components/CartTotal'
import { ModalOrder } from '../../components/Modal/ModalOrder'
import { actions as cartItemsActions } from '../../features/cartItemsSlice'
import { actions as ordersActions } from '../../features/ordersSlice'
import { actions as userActions } from '../../features/userSlice'
import { globalContext } from '../../helpers/globalContext'
import { Order, OrderInfo, User } from '../../helpers/types'
import "./CheckOutPage.scss"

export default function CheckOutPage() {
  const { setIsModalOpen } = useContext(globalContext);
  const user = useAppSelector(state => state.user.user) as User;
  const cartItems = useAppSelector(state => state.cartItems);
  const [hasErrors, setHasErrors] = useState('');
  const [paymentData, setPaymentData] = useState({
    isChecked: false,
    isDisabled: true,
    isFilled: false,
    cardNumber: '',
    expiryDate: '',
    cvvCode: '',
    rememberCard: false
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const paymentDataFromStorage = localStorage.getItem('paymentData');

    if (paymentDataFromStorage) {
      setPaymentData(JSON.parse(paymentDataFromStorage))
      setFormData(prevValue => {
        return {
          ...prevValue,
          payment: JSON.parse(paymentDataFromStorage)
        }
      })
    }
  }, [])

  const [formData, setFormData] = useState({
    contactInfo: {
      isChecked: false,
      isDisabled: false,
      isFilled: false,
      name: user?.firstName || '',
      surname: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.numberPhone || '',
    },
    shippingDetails: {
      isChecked: false,
      isDisabled: true,
      isFilled: false,
      country: user?.orderDetails?.country || '',
      city: user?.orderDetails?.city || '',
      street: user?.orderDetails?.street || '',
      apartment: user?.orderDetails?.apartment || ''
    },
    payment: {
      isChecked: false,
      isDisabled: true,
      isFilled: false,
      cardNumber: paymentData?.cardNumber || '',
      expiryDate: paymentData?.expiryDate || '',
      cvvCode: paymentData.cvvCode || '',
      rememberCard: paymentData.rememberCard || false,
    }
  });
  const [activeFieldset, setActiveFieldset] = useState('contactInfo');

  const validateContactInfo = () => {
    setHasErrors('');

    const filled = formData.contactInfo.name?.trim() && formData.contactInfo.surname?.trim() && formData.contactInfo.phoneNumber?.trim() && formData.contactInfo.email?.trim();

    if (filled) {
      let isValid = true;
      if (!/^[A-Za-z]+$/.test(formData.contactInfo.name)) {
        setHasErrors((prevText) => {
          const newText = prevText + 'First name is not valid! '
          return newText;
        })
        isValid = false;
      }
      if (!/^[A-Za-z]+$/.test(formData.contactInfo.surname)) {
        setHasErrors((prevText) => {
          const newText = prevText + 'Last name is not valid! ';
          return newText;
        })
        isValid = false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.contactInfo
        .email)) {
        setHasErrors((prevText) => {
          const newText = prevText + 'Email is not valid! ';
          return newText;
        })
        isValid = false;
      }
      return isValid;
    } else {
      setHasErrors('All fields are required!');
      return false;
    }
  }

  const validateShippingDetails = () => {
    setHasErrors('');

    const filled = formData.shippingDetails.apartment.trim() && formData.shippingDetails.city.trim() && formData.shippingDetails.country.trim() && formData.shippingDetails.street.trim();

    if (filled) {
      let isValid = true;
      if (!/^[A-Za-z]+$/.test(formData.shippingDetails.country)) {
        setHasErrors((prevText) => {
          const newText = prevText + 'Country name is not valid! '
          return newText;
        })
        isValid = false;
      }
      if (!/^[A-Za-z]+$/.test(formData.shippingDetails.city)) {
        setHasErrors((prevText) => {
          const newText = prevText + 'Sity name is not valid! ';
          return newText;
        })
        isValid = false;
      }
      return isValid;
    } else {
      setHasErrors('All fields are required!');
      return false;
    }
  }

  const validatePayment = () => {
    setHasErrors('');

    const filled = formData.payment.cardNumber.trim() && formData.payment.cvvCode.trim() && formData.payment.expiryDate.trim();

    if (filled) {
      console.log(!(/^\d+/).test(formData.payment.cvvCode));

      let isValid = true;
      if (!(/^\d+/).test(formData.payment.cardNumber) || formData.payment.cardNumber.toString().length !== 16) {
        setHasErrors((prevText) => {
          const newText = prevText + 'Card number is not valid! '
          return newText;
        })
        isValid = false;
      }
      if (!(/^\d+/).test(formData.payment.cvvCode) || formData.payment.cvvCode.toString().length !== 3) {
        setHasErrors((prevText) => {
          const newText = prevText + 'CVV code is not valid! ';
          return newText;
        })
        isValid = false;
      }

      if (formData.payment.rememberCard) {
        const data = {
          ...formData.payment,
          isChecked: false,
          isDisabled: true,
          isFilled: false,
        }
        localStorage.setItem('paymentData', JSON.stringify(data))
      }

      return isValid;
    } else {
      setHasErrors('All fields are required!');
      return false;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const updatedFormData: any = { ...formData };

    if (type === 'checkbox') {
      updatedFormData.payment[name] = checked;
    } else if (name === 'expiryDate') {
      const newValue = value.replace(/\D/g, '');
      if (newValue.length > 2) {
        updatedFormData.payment.expiryDate = newValue.slice(0, 2) + '/' + newValue.slice(2);
      } else {
        updatedFormData.payment.expiryDate = newValue;
      }
    }
    else {
      updatedFormData[activeFieldset][name] = value;
    }
    setFormData(updatedFormData);
  };

  const handleEdit = (currentFieldset: any) => {
    switch (activeFieldset) {
      case 'contactInfo':
        if (validateContactInfo()) {
          formData.contactInfo.isChecked = true;
          formData.contactInfo.isDisabled = false;
          setActiveFieldset(currentFieldset);
        }
        break;
      case 'shippingDetails':
        if (validateShippingDetails()) {
          formData.shippingDetails.isChecked = true;
          formData.shippingDetails.isDisabled = false;
          setActiveFieldset(currentFieldset);
        }
        break;
      case 'payment':
        if (validatePayment()) {
          formData.payment.isChecked = true;
          formData.payment.isDisabled = false;
          setActiveFieldset(currentFieldset);
        }
        break;
      default:
        break;
    }
  }

  const handleSubmit = () => {
    switch (activeFieldset) {
      case 'contactInfo':
        if (validateContactInfo()) {
          formData.contactInfo.isChecked = true;
          formData.contactInfo.isDisabled = false;
          formData.shippingDetails.isDisabled = false;
          setActiveFieldset('shippingDetails');
        }
        break;
      case 'shippingDetails':
        if (validateShippingDetails()) {
          formData.shippingDetails.isChecked = true;
          formData.shippingDetails.isDisabled = false;
          formData.payment.isDisabled = false;
          setActiveFieldset('payment');
        }
        break;
      case 'payment':
        break;
      default:
        break;
    }
  };

  const totalAmount = cartItems
    .map(item => item.price * item.amount)
    .reduce((sum, i) => sum + i, 0);

  const handlePurchse = () => {
    if (validatePayment()) {
      const data: OrderInfo = {
        country: formData.shippingDetails.country,
        street: formData.shippingDetails.street,
        city: formData.shippingDetails.city,
        apartment: formData.shippingDetails.apartment,
        cardNumber: formData.payment.cardNumber,
        mmyy: formData.payment.expiryDate,
        cvvCode: formData.payment.cvvCode,
      }

      const date = new Date().toUTCString();

      const order: Order = {
        id: +(new Date().valueOf().toString().slice(-6)),
        userId: user.id,
        orderItems: cartItems,
        orderDate: date.slice(date.indexOf(" ") + 1, -13),
        total: totalAmount,
        status: "PROCESSING",
      }

      dispatch(userActions.setOrderDerails(data));
      dispatch(ordersActions.add(order))
      cartItems.forEach(item => dispatch(cartItemsActions.remove(item.id)))

      setIsModalOpen(true)
    } else {
      console.log('error');
    }
  }

  return (
    <div className="check-out-page">
      <ModalOrder />
      <div className="check-out-page__top">
        <h2 className="check-out-page__title">Check out</h2>
        <Breadcrumbs />
      </div>
      <div className="check-out-page__content">
        <div className="check-out__left">
          <form className="check-out-page__form">
            <fieldset className="check-out-page__fieldset">
              <div
                className={classNames(
                  'check-out-page__legend-wrapper',
                  {
                    'check-out-page__legend-wrapper--checked': formData.contactInfo.isChecked && activeFieldset !== 'contactInfo',
                  }
                )}
              >
                <legend
                  className={classNames(
                    'check-out-page__legend',
                  )}
                >
                  {formData.contactInfo.isChecked && activeFieldset !== 'contactInfo' && (
                    <span
                      className="check-out-page__check"
                    ></span>)}
                  1. Contact information
                </legend>
                {formData.contactInfo.isChecked && activeFieldset !== 'contactInfo' && (
                  <button
                    aria-label="edit"
                    className="check-out-page__edit-btn"
                    type="button"
                    onClick={() => handleEdit('contactInfo')}
                  ></button>)}
              </div>

              {activeFieldset === 'contactInfo' && (
                <div className="check-out-page__fields">
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    name="name"
                    value={formData.contactInfo.name}
                    onChange={handleChange}
                    autoComplete='name'
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Surname"
                    name="surname"
                    value={formData.contactInfo.surname}
                    onChange={handleChange}
                    autoComplete='surname'
                  />
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    name="email"
                    value={formData.contactInfo.email}
                    onChange={handleChange}
                    autoComplete='email'
                  />
                  <input
                    type="tel"
                    className="input"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={formData.contactInfo.phoneNumber}
                    onChange={handleChange}
                    autoComplete='phone'
                  />
                  {hasErrors && (
                    <p className='check-out-page__error'>{hasErrors}</p>
                  )}
                  <button
                    className="button button--wide"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Continue to shipping
                  </button>
                </div>
              )}
            </fieldset>

            <fieldset className="check-out-page__fieldset">
              <div
                className={classNames(
                  'check-out-page__legend-wrapper',
                  {
                    'check-out-page__legend-wrapper--checked': formData.shippingDetails.isChecked && activeFieldset !== "shippingDetails",
                    'check-out-page__legend-wrapper--disabled': formData.shippingDetails.isDisabled,
                  }
                )}
              >
                <legend
                  className={classNames(
                    'check-out-page__legend',
                  )}
                >
                  {formData.shippingDetails.isChecked && activeFieldset !== "shippingDetails" && (
                    <span
                      className="check-out-page__check"
                    ></span>)}
                  2. Shipping details
                </legend>
                {formData.shippingDetails.isChecked && activeFieldset !== "shippingDetails" && (
                  <button
                    aria-label="edit"
                    className="check-out-page__edit-btn"
                    type="button"
                    onClick={() => handleEdit('shippingDetails')}
                  ></button>)}
              </div>

              {activeFieldset === 'shippingDetails' && (
                <div className={classNames(
                  'check-out-page__fields',
                  { 'check-out-page__fields--disabled': formData.shippingDetails.isDisabled }
                )}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Country"
                    name='country'
                    value={formData.shippingDetails.country}
                    onChange={handleChange}
                    autoComplete='country'
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="City"
                    name='city'
                    value={formData.shippingDetails.city}
                    onChange={handleChange}
                    autoComplete='city'
                  />
                  <div className='check-out-page__inputs-wrapper'>
                    <input
                      type="text"
                      className="input"
                      placeholder="Street"
                      name='street'
                      value={formData.shippingDetails.street}
                      onChange={handleChange}
                      autoComplete='street'
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="Apartment"
                      name='apartment'
                      value={formData.shippingDetails.apartment}
                      onChange={handleChange}
                      autoComplete='apartment'
                    />
                  </div>
                  {hasErrors && (
                    <p className='check-out-page__error'>{hasErrors}</p>
                  )}
                  <button
                    className="button button--wide"
                    type='button'
                    onClick={handleSubmit}
                  >
                    Continue to payment
                  </button>
                </div>
              )}
            </fieldset>

            <fieldset className="check-out-page__fieldset">
              <div
                className={classNames(
                  'check-out-page__legend-wrapper',
                  {
                    'check-out-page__legend-wrapper--checked': formData.payment.isChecked && activeFieldset !== "payment",
                    'check-out-page__legend-wrapper--disabled': formData.payment.isDisabled,
                  }
                )}
              >
                <legend
                  className={classNames(
                    'check-out-page__legend',
                  )}
                >
                  {formData.payment.isChecked && activeFieldset !== "payment" && (
                    <span
                      className="check-out-page__check"
                    ></span>)}
                  3. Payment
                </legend>
                {formData.payment.isChecked && activeFieldset !== "payment" && (
                  <button
                    aria-label="edit"
                    className="check-out-page__edit-btn"
                    type="button"
                    onClick={() => handleEdit('payment')}
                  ></button>)}
              </div>

              {activeFieldset === 'payment' && (
                <div className={classNames(
                  'check-out-page__fields',
                  { 'check-out-page__fields--disabled': formData.payment.isDisabled }
                )}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Card number"
                    name='cardNumber'
                    value={formData.payment.cardNumber}
                    onChange={handleChange}
                    autoComplete='card'
                  />
                  <div className='check-out-page__inputs-wrapper'>
                    <input
                      type="text"
                      className="input"
                      placeholder="MM/YY"
                      id="expiryDate"
                      maxLength={5}
                      name='expiryDate'
                      value={formData.payment.expiryDate}
                      onChange={handleChange}
                      autoComplete='expiryDate'
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="CVV code"
                      name='cvvCode'
                      value={formData.payment.cvvCode}
                      onChange={handleChange}
                      autoComplete='cvv'
                    />
                  </div>
                  <label className="check-out-page__remember-container">
                    <input
                      type="checkbox"
                      className="check-out-page__remember-checkbox"
                      name='rememberCard'
                      checked={formData.payment.rememberCard}
                      onChange={handleChange}
                    />
                    <span className="check-out-page__remember-checkmark"></span>
                    Remember the card
                  </label>

                  {hasErrors && (
                    <p className='check-out-page__error'>{hasErrors}</p>
                  )}
                  <button
                    type='button'
                    className={classNames(
                      'button button--wide',
                      { "button--disabled": !formData.payment.cardNumber && !formData.payment.cvvCode && !formData.payment.expiryDate }
                    )}
                    onClick={handlePurchse}
                  >
                    Make a purchase
                  </button>
                </div>
              )}
            </fieldset>
          </form>
        </div>
        <CartTotal />
      </div>
    </div>
  )
}
