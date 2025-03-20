import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../styles/AddToCart.css";

const AddToCart = ({ pet, show, handleClose, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const cartItem = {
      id: pet.id,
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      price: pet.price,
      description: pet.description,
      image_url: pet.image_url,
      quantity: quantity,
    };
    addToCart(cartItem);
    handleClose();
  };

  return (
    <Modal className='Card-Back' show={show} onHide={handleClose}>
      <Modal.Header className='Card-Header' closeButton>
        <Modal.Title>Add {pet.name} to Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body className='Card-Body'>
        <img src={pet.image_url} alt={pet.name} className="img-fluid mb-3" />
        <p><strong>Type:</strong> {pet.type}</p>
        {pet.breed && <p><strong>Breed:</strong> {pet.breed}</p>}
        {pet.age && <p><strong>Age:</strong> {pet.age}</p>}
        <p><strong>Price:</strong> Rs. {pet.price}</p>
        <p><strong>Description:</strong> {pet.description}</p>
        <div className="mb-3">
          <label className="form-label Card-Label">Quantity</label>
          <input
            type="number"
            className="Card-Input"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className='Card-Footer'>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
        <Button className="closebtn" variant="outline-success" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToCart;