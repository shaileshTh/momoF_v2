import React, { useState, useContext } from 'react'
import Emoji from '../components/Emoji'
import Button from 'react-bootstrap/Button'
import {formatPrice} from '../utils/format'
import {CartContext} from '../context/CartContext'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
// import momo from '../../src/images/plate.jpg'
import {API_URL} from '../utils/url'



const NewCard = ({dish}) => {
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

        <Card style={{ maxWidth: '500px', margin:'70px auto 0 auto', borderBottom:'none', borderRight:'none', borderLeft:'none'}}>
            <Card.Header as="h3" className= "text-center">{dish.strapiId}.{' '}{dish.title}<br/><small>{dish.description}</small></Card.Header>
            <Card.Img variant="top" src={`${API_URL}${dish.image[0].url}`} style = {{marginBottom: '0'}}/>
            <Card.Body style = {{backgroundImage:'linear-gradient(lightgrey, lightgrey, lightgrey, white)'}}>
            <ListGroup variant="flush" className = "text-center">
            
            <ListGroup.Item as = "h4" key = {dish.id}style = {{lineHeight:'1.5em', marginBottom:'15px', borderRadius:'10%'}}>{dish.title}{' '}
              <Badge variant="secondary">{formatPrice(dish.price_in_cents)}</Badge>{' '}
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
        </Card.Body>
      </Card>
        {/* <ListGroup variant="flush" className = "text-center">
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
          </ListGroup> */}
        </>
    )
}

export default NewCard
