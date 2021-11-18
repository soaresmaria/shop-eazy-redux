import React from 'react';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

const Cart = () => {

    const state = useSelector((state) => {
        return state
    });

    const dispatch = useDispatch();

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
      }

      if (!state.cartOpen) {
        return (
          <div className="cart-closed" onClick={toggleCart}>
            <span
              role="img"
              aria-label="trash">🛒</span>
          </div>
        );
      }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
                                <button onClick={submitCheckout}>
                                    Checkout
                                </button>
                                :
                                <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                <h3>
                    <span role="img" aria-label="shocked">
                        😱
                    </span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>

    );
};

export default Cart;