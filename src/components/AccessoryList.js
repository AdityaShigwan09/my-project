import React, { useEffect, useState } from "react";
import { getAccessories, addAccessory, deleteAccessory } from "../services/AccessoryService";
import { getCurrentUserRole } from "../services/AuthService";
import "../styles/AccessoryList.css";
import { Modal, Button } from "react-bootstrap";
import AddToCart from "./AddToCart";

const AccessoryList = ({ addToCart }) => {
  const [accessories, setAccessories] = useState([]);
  const [newAccessory, setNewAccessory] = useState({
    name: "",
    type: "",
    price: 0,
    description: "",
    image_url: "",
  });
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    fetchAccessories();
    fetchUserRole();
  }, []);

  const fetchAccessories = async () => {
    const data = await getAccessories();
    setAccessories(data);
  };

  const fetchUserRole = async () => {
    const role = await getCurrentUserRole();
    setUserRole(role);
  };

  const handleAddAccessory = async () => {
    await addAccessory(newAccessory);
    setNewAccessory({ name: "", type: "", price: 0, description: "", image_url: "" });
    fetchAccessories();
  };

  const handleDeleteAccessory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this accessory?");
    if (confirmDelete) {
      await deleteAccessory(id);
      fetchAccessories();
    }
  };

  const handleShowModal = (accessory) => {
    setSelectedAccessory(accessory);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccessory(null);
  };

  const handleShowCartModal = (accessory) => {
    setSelectedAccessory(accessory);
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
    setSelectedAccessory(null);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Accessory List 🛍️</h2>

      {/* Accessory Cards */}
      <div className="row">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={accessory.image_url} alt={accessory.name} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{accessory.name}</h5>
                <p className="text-muted">{accessory.type}</p>
                <p className="fw-bold text-success">Rs. {accessory.price}</p>
                <button className="btn btn-outline-dark btn-sm" onClick={() => handleShowModal(accessory)}>
                  More
                </button>
                <button className="btn btn-success btn-sm ms-2" onClick={() => handleShowCartModal(accessory)}>
                  Add to Cart
                </button>
                {userRole === "admin" && (
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteAccessory(accessory.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Section - Add New Accessory */}
      {userRole === "admin" && (
        <div className="card mt-5 shadow-lg form-card">
          <div className="card-body">
            <h3 className="text-center">➕ Add New Accessory</h3>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={newAccessory.name}
                  onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  value={newAccessory.type}
                  onChange={(e) => setNewAccessory({ ...newAccessory, type: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={newAccessory.price}
                  onChange={(e) => setNewAccessory({ ...newAccessory, price: parseFloat(e.target.value) })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  value={newAccessory.image_url}
                  onChange={(e) => setNewAccessory({ ...newAccessory, image_url: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newAccessory.description}
                  onChange={(e) => setNewAccessory({ ...newAccessory, description: e.target.value })}
                ></textarea>
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-outline-light w-50 mt-3" onClick={handleAddAccessory}>
                  Add Accessory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying accessory details */}
      {selectedAccessory && (
        <Modal className="detail-card" show={showModal} onHide={handleCloseModal}>
          <Modal.Header className="detail-body" closeButton>
            <Modal.Title>{selectedAccessory.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="detail-body">
            <img src={selectedAccessory.image_url} alt={selectedAccessory.name} className="img-fluid mb-3" />
            <p><strong>Type:</strong> {selectedAccessory.type}</p>
            <p><strong>Price:</strong> Rs. {selectedAccessory.price}</p>
            <p><strong>Description:</strong> {selectedAccessory.description}</p>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal for adding accessory to cart */}
      {selectedAccessory && (
        <AddToCart
          pet={selectedAccessory}
          show={showCartModal}
          handleClose={handleCloseCartModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default AccessoryList;