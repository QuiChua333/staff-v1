import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from './customize-axios'
import { useEffect, useState } from 'react';

function InfoModal({ showModal, setShowModal, action, getStaffs, staff }) {
  const [post, setPost] = useState(action === 'update' ? staff : {
    name: '',
    phone: '',
    email: '',
    avatar: '',
    basicSalary: '',
    type: '',
    overtimeHours: '',
    detectedErrors: ''
  })
  
 
  const handleInput = (e) => {
    let key = e.target.name;
    let value;
    if (key === 'avatar') {
        if (e.target.files[0]) {
          const file = e.target.files[0]
          const url = URL.createObjectURL(file)
          value = url;
        }
    }
    else {
      value = e.target.value;
    }
    
    

    setPost(prev => {
      const nextState = { ...prev };
      nextState[key] = value;
      nextState.id = new Date().getTime();
      return nextState;

    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === 'add') {
      axios.post('/api/v1/staff/add', post)
        .then(res => {
          console.log(res)
          getStaffs();
          setShowModal(false)

        })
        .catch(err => {
          console.log(err)
        })
    }
    else if (action === 'update') {
      axios.put('/api/v1/staff/' + staff.id, post)
        .then(res => {
          console.log(res)
          getStaffs();
          setShowModal(false)
        })
        .catch(err => {
          console.log(err)
        })
    }




  }
  return (
    <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              name='name'
              onChange={handleInput}
              type="text"
              value={post.name}
              placeholder="Nguyễn Văn A"
              autoFocus

            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={handleInput}
              name='phone'
              type="text"
              value={post.phone}
              placeholder="0123456789"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Email</Form.Label>
            <Form.Control

              onChange={handleInput}
              name='email'
              type="email"
              value={post.email}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Ảnh đại diện</Form.Label>
            <Form.Control

              onChange={handleInput}
              name='avatar'
              type="file"
              accept="image/jpg, image/jpeg, image/png"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control

              onChange={handleInput}
              name='basicSalary'
              type="text"
              value={post.basicSalary}
              placeholder="200000"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Type</Form.Label>
            <Form.Control
              onChange={handleInput}
              name='type'
              type="text"
              value={post.type}
              placeholder="tester/programmer"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Overtime Hours</Form.Label>
            <Form.Control
              onChange={handleInput}
              name='overtimeHours'
              value={post.overtimeHours}
              type="text"

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Detected Errors</Form.Label>
            <Form.Control
              onChange={handleInput}
              name='detectedErrors'
              value={post.detectedErrors}
              type="text"

            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type='submit'>
              Submit
            </Button>
          </Modal.Footer>

        </Form>
      </Modal.Body>

    </Modal>
  );
}

export default InfoModal;