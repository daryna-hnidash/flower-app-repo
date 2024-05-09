import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as userActions } from '../../features/userSlice';
import { Order } from '../../helpers/types';
import "./AuthorizePage.scss";
import "./Profile.scss";


export default function ProfilePage() {
  const orders = useAppSelector<Order[]>(state => state.orders);


  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const reversedOrders = [...orders].reverse();

  function handleLogOut() {
    dispatch(userActions.deleteUser());
  }

  return (
    <div className="authorize-page">
      {user?.email
        ? (<div className="profile">
          <h2 className="profile__title">Your Account</h2>
          <div className="profile__info">
            <div className="profile__subtitle">
              Your account and contact info:
            </div>
            <div className="profile__block">
              <div>
                <p className="profile__field-title">
                  Name:
                </p>
                <div className="input">{user.firstName}</div>
              </div>

              <div>
                <p className="profile__field-title">
                  Last Name:
                </p>
                <div className="input">{user.lastName}</div>
              </div>
            </div>
            <div className="profile__block">
              <div>
                <p className="profile__field-title">
                  Email:
                </p>
                <div className="input">{user.email}</div>
              </div>

              <div>
                <p className="profile__field-title">
                  Phone:
                </p>
                <div className="input">{user.numberPhone}</div>
              </div>
            </div>
            <div className="profile__subtitle">
              Your account orders:
            </div>
            {
              orders?.length
                ? (
                  <ul className="profile__orders">
                    {reversedOrders.map(order => {
                      return (
                        <li className="profile__order" key={order.id}>
                          <div className="profile__order-info">
                            <div className="profile__order-id">
                              {"#" + order.id}
                            </div>

                            <p className="profile__order-date">{order.orderDate}</p>
                            <p className="profile__order-total">{order.total.toFixed(2) + "$"}</p>

                          </div>
                          <div className="profile__order-status">
                            Status:
                            <p>{order.status}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )
                : (
                  <p>There is no orders yet...</p>
                )
            }
          </div>

          <button
            className='profile__log-out'
            onClick={handleLogOut}
          >
            <span className="profile__log-out-icon"></span>
            Log out
          </button>
        </div>
        )
        : <Outlet />
      }
    </div>
  )
}
