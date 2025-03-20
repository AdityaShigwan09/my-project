import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Cart.css';

const Cart = ({ cartItems, show, handleClose, updateCartItem, removeCartItem }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    updateCartItem(id, quantity);
  };

  const handleRemoveItem = (id) => {
    removeCartItem(id);
  };

  return (
    <Modal className='Cart-Back' show={show} onHide={handleClose}>
      <Modal.Header className='Cart-Header' closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body className='Cart-Body'>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="Cart-Body">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div className='Cart-Body-Border'>

                <div>
                  <h5>{item.name}</h5>
                  <p>Price: Rs. {item.price}</p>
                  <p>Total: Rs. {item.price * item.quantity}</p>
                </div>
                <div>
                  <label className="form-label">Quantity</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                  <span>{item.quantity}</span>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </Button>
                </div>

                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer className='Cart-Footer'>
        <h5 className="total">Total Price: Rs. {totalPrice}</h5>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-success" onClick={() => alert('Proceed to Checkout')}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;