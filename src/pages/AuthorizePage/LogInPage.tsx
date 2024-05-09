import "./AuthorizePage.scss";
import { useState } from 'react'
import { Link } from "react-router-dom";
import classNames from "classnames";
// export type ServerLogInResponse = {
//   token: string,
// }

export const LogInPage = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormError('');

    const newFormData = {
      ...formData,
      [name]: value
    }
    const filled = Object.values(newFormData).every(value => value.trim() !== '');
    setIsFilled(filled);

    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError('Invalid email format');
      return;
    }

    // const data: LogInData = {
    //   email: formData.email,
    //   password: formData.password,
    // }

    // Sending data to server:

    // logIn(data)
    //   .then((response) => {
    //     localStorage.setItem('token', JSON.stringify(response.token));
    //   })
    //   .then(() => getUserByEmail(formData.email))
    //   .then(response => dispatch(actions.setUser(response)))
    //   .catch((e) => console.log('failed', e))
  };

  return (
    <div className="authorize-page__container">
      <div className="authorize-page__left">
        <div className="autorize-page__text">
          <h2 className="authorize-page__title">Don’t have an Account?</h2>

          <p className="authorize-page__p">
            Sign up now to stay connected with us! Enter your personal information to create your account.
          </p>
        </div>
        <Link to="/profile/sign-in" className="button button--white">
          Sign Up
        </Link>
      </div>

      <div className="authorize-page__right">
        <h2 className="authorize-page__title authorize-page__title--right">
          Log in
        </h2>
        <form className="authorize-page__form">
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
            {formError && (
              <p className="authorize-page__error">{formError}</p>
            )}
          </div>

          <div className="authorize-page__input-block">
            <input
              type="password"
              className="input input--password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
        </form>
        <button
          className={classNames(
            'button button--wide',
            { 'button--disabled': !isFilled }
          )}
          disabled={!isFilled}
          type="submit"
          onClick={handleSubmit}
        >
          Log in
        </button>
      </div>
    </div>
  )
}
