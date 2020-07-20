import React, { useState, useContext } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Emoji from '../components/Emoji'
import Button from 'react-bootstrap/Button'
import {formatPrice} from '../utils/format'
import {CartContext} from '../context/CartContext'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'

const DishCard = ({dish}) => {
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useContext(CartContext)

    return(
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Added to Cart!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Click on Cart Button on menu bar to checkout.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
        <ListGroup variant="flush" className = "text-center">
            <ListGroup.Item as = "h3" key = {dish.id}style = {{lineHeight:'1.5em', marginBottom:'15px', borderRadius:'10%'}}>
              {dish.title}{' '}<Badge variant="secondary">{formatPrice(dish.price_in_cents)}</Badge>{' '}
              <br/><small><input
                type = "number"
                value = {quantity}
                onChange = {(event) => setQuantity(event.target.value)}
                style = {{height: '28px', width:'40px',textAlign:'center'}}
            /></small>{' '}
              <Button onClick = {() => {
                  addToCart(dish, quantity)
                  handleShow()
                }} variant="dark">
              <Emoji symbol="🛒" label="cart"/>Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </>
    )
}

export default DishCard
