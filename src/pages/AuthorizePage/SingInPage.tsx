import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/userSlice';
import { User } from '../../helpers/types';
import "./AuthorizePage.scss"

export type FormData = {
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
};

export const SingInPage = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
  });


  const [formErrors, setFormErrors] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
  });
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormErrors({
      ...formErrors,
      [name]: ''
    });

    const newFormData = {
      ...formData,
      [name]: value
    }

    const filled = Object.values(newFormData).every(value => value.trim() !== '');
    setIsFilled(filled);

    setFormData(newFormData);
  };

  const validateForm = () => {
    const errors = {
      email: '',
      phoneNumber: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
    };

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid';
    }

    // Phone number validation
    if (!/^\d{10,}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number is not valid. 0663456789 format required';
    }

    // Password validation
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(formData.password)) {
      errors.password = 'Password must contain at least one digit';
    } else if (!/[a-z]/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase and one lowercase letter';
    }

    // Repeat password validation
    if (formData.repeatPassword !== formData.password) {
      errors.repeatPassword = 'Passwords do not match';
    }

    // First name and last name validation
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = 'First name is not valid';
    }

    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = 'Last name is not valid';
    }

    const valid = Object.values(errors).every(value => value.trim() === '');

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    validateForm();

    if (validateForm()) {
      const newUser: User = {
        id: Math.floor(100000 + Math.random() * 900000),
        email: formData.email,
        numberPhone: formData.phoneNumber,
        // password: formData.password,
        // repeatPassword: formData.repeatPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        orderDetails: null,
      }

      dispatch(actions.setUser(newUser))

      // Sending data to server 

      // const logInData = {
      //   email: formData.email,
      //   password: formData.password,
      // }

      // signIn(newUser)
      //   .then((userFromServer) => {
      //     logIn(logInData)
      //       .then((response) => {
      //         localStorage.setItem('token', JSON.stringify(response.token));
      //       })
      //       .catch((e) => console.log('failed', e));
      //     dispatch(actions.setUser(userFromServer))
      //   })

    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  };


  return (
    <div className="authorize-page__container">
      <div className="authorize-page__left">
        <div className="autorize-page__text">
          <h2 className="authorize-page__title">Welcome Back!</h2>

          <p className="authorize-page__p">
            To keep connecting with us please login with your personal info
          </p>
        </div>
        <Link to="/profile/log-in" className="button button--white">Log in</Link>
      </div>

      <div className="authorize-page__right">
        <h2 className="authorize-page__title authorize-page__title--right">
          Create Account
        </h2>
        <form
          className="authorize-page__form"
          onSubmit={handleSubmit}
        >
          <div className="authorize-page__fieldset">
            <div className="authorize-page__input-block">
              <input
                type="text"
                className={classNames(
                  "input input--person",
                  { 'input--error': formErrors.firstName }
                )}
                placeholder="Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                autoComplete="name"
              />
              {formErrors.firstName && (
                <p className="authorize-page__error">{formErrors.firstName}</p>
              )}
            </div>
            <div className="authorize-page__input-block">
              <input
                type="text"
                className="input"
                placeholder="Surname"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                autoComplete="family-name"
              />
              {formErrors.lastName && <span className="authorize-page__error">{formErrors.lastName}</span>}
            </div>
          </div>
          <div className="authorize-page__input-block">
            <input
              type="tel"
              className="input input--phone"
              placeholder="Phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {formErrors.phoneNumber && <span className="authorize-page__error">{formErrors.phoneNumber}</span>}
          </div>
          <div className="authorize-page__input-block">
            <input
              type="email"
              className="input input--email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="username"
            />
            {formErrors.email && <span className="authorize-page__error">{formErrors.email}</span>}
          </div>
          <div className="authorize-page__input-block">
            <input
              type="password"
              className="input input--password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            {formErrors.password && <span className="authorize-page__error">{formErrors.password}</span>}
          </div>
          <div className="authorize-page__input-block">
            <input
              type="password"
              className="input input--password"
              placeholder="Repeat Password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            {formErrors.repeatPassword && <span className="authorize-page__error">{formErrors.repeatPassword}</span>}
          </div>
          <button
            className={classNames(
              'button button--wide',
              { 'button--disabled': !isFilled }
            )}
            disabled={!isFilled}
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
