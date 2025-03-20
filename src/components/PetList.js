import React, { useEffect, useState } from "react";
import { getPets, addPet, deletePet } from "../services/PetService";
import { getCurrentUserRole } from "../services/AuthService";
import "../styles/PetList.css";
import { Modal, Button } from "react-bootstrap";
import AddToCart from "./AddToCart";

const PetList = ({ addToCart }) => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: 0,
    price: 0,
    description: "",
    image_url: "",
  });
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    fetchPets();
    fetchUserRole();
  }, []);

  const fetchPets = async () => {
    const data = await getPets();
    setPets(data);
  };

  const fetchUserRole = async () => {
    const role = await getCurrentUserRole();
    setUserRole(role);
  };

  const handleAddPet = async () => {
    await addPet(newPet);
    setNewPet({ name: "", type: "", breed: "", age: 0, price: 0, description: "", image_url: "" });
    fetchPets();
  };

  const handleDeletePet = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet?");
    if (confirmDelete) {
      await deletePet(id);
      fetchPets();
    }
  };

  const handleShowModal = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  const handleShowCartModal = (pet) => {
    setSelectedPet(pet);
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
    setSelectedPet(null);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🐶 Pet List 🐱</h2>

      {/* Pet Cards */}
      <div className="row">
        {pets.map((pet) => (
          <div key={pet.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={pet.image_url} alt={pet.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body text-center">
                <h5 className="card-title">{pet.name}</h5>
                <p className="text-muted">{pet.type} ({pet.breed})</p>
                <p className="fw-bold text-success">Rs. {pet.price}</p>
                <button className="btn btn-outline-dark btn-sm" onClick={() => handleShowModal(pet)}>
                  More
                </button>
                <button className="btn btn-success btn-sm ms-2" onClick={() => handleShowCartModal(pet)}>
                  Add to Cart
                </button>
                {userRole === "admin" && (
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeletePet(pet.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Section - Add New Pet */}
      {userRole === "admin" && (
        <div className="card mt-5 shadow-lg form-card">
          <div className="card-body">
            <h3 className="text-center">➕ Add New Pet</h3>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  value={newPet.type}
                  onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Breed</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Breed"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  value={newPet.age}
                  onChange={(e) => setNewPet({ ...newPet, age: parseInt(e.target.value) })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={newPet.price}
                  onChange={(e) => setNewPet({ ...newPet, price: parseFloat(e.target.value) })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  value={newPet.image_url}
                  onChange={(e) => setNewPet({ ...newPet, image_url: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newPet.description}
                  onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                ></textarea>
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-outline-light w-50 mt-3" onClick={handleAddPet}>
                  Add Pet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying pet details */}
      {selectedPet && (
        <Modal className="detail-card"show={showModal} onHide={handleCloseModal}>
          <Modal.Header className="detail-body" closeButton>
            <Modal.Title>{selectedPet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="detail-body">
            <img src={selectedPet.image_url} alt={selectedPet.name} className="img-fluid mb-3" />
            <p><strong>Type:</strong> {selectedPet.type}</p>
            <p><strong>Breed:</strong> {selectedPet.breed}</p>
            <p><strong>Age:</strong> {selectedPet.age}</p>
            <p><strong>Price:</strong> Rs. {selectedPet.price}</p>
            <p><strong>Description:</strong> {selectedPet.description}</p>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Body>
          {/* <Modal.Footer className="detail-body">
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      )}

      {/* Modal for adding pet to cart */}
      {selectedPet && (
        <AddToCart
          pet={selectedPet}
          show={showCartModal}
          handleClose={handleCloseCartModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default PetList;