import React ,{ useContext ,useState} from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';


const Cart = (props) => {
  const [isSubmitting,setIsSubmitting]=useState(false);
  const[isSubmitted,setIsSubmitted]=useState(false);
  const [isCheckout,setIsCheckout]= useState(false);
  const orderHandler=()=>{
    setIsCheckout(true);
  }
  const cartCtx = useContext(CartContext);

  const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalAction =<div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>;

const onSubmitOrderHandler=(userData)=>{
  fetch('https://foodorder-5f947-default-rtdb.firebaseio.com/orders.json',{
    method:'POST',
    body:JSON.stringify({
      user:userData,
      OrderedItem:cartCtx.items
    })

  });
  setIsSubmitting(true);
  setIsSubmitted(true);
  cartCtx.clearCart();

}
const modalData =<React.Fragment> {cartItems}
<div className={classes.total}>
  <span>Total Amount</span>
  <span>{totalAmount}</span>
</div>
{!isCheckout && modalAction}

{isCheckout && <Checkout onConfirm={onSubmitOrderHandler} onClose={props.onClose}/>}</React.Fragment>


const submitting =<p>Sending Your Data...</p>
const submitted=<p>Saved SuccessFully....!!</p>








  return (
    <Modal onClose={props.onClose}>
  
      {!isSubmitting&&!isSubmitted&&modalData}
      {isSubmitting&&!isSubmitted&&submitting}
      {isSubmitted &&submitted}
     
    </Modal>
  );
};

export default Cart;
