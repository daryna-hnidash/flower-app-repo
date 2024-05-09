import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { globalContext } from '../../helpers/globalContext';
import "./Modal.scss";


export const ModalOrder = () => {
  const { isModalOpen, setIsModalOpen } = useContext(globalContext);

  return isModalOpen ? (
    <div
      className="modal modal--order"
    >
      <div className="modal__wrapper">
        <div className="modal__top modal__top--order">
          <p className="modal__text modal__text--order">
            Your order has been <b>successfully</b> placed!
          </p>
        </div>

        <div className="modal__buttons">
          <Link
            to="/catalog"
            className="button modal__button"
            onClick={() => setIsModalOpen(false)}
          >
            Continue shopping
          </Link>
          <Link
            to="/home"
            className="button button--white modal__button"
            onClick={() => setIsModalOpen(false)}
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  ) : null;
}
