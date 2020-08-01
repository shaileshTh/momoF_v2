import React, {useContext} from "react"
import { Link } from "gatsby"
import Emoji from '../components/Emoji'
import PropTypes from "prop-types"
import {CartContext} from '../context/CartContext'

const Header = () => {

  const {cart} = useContext(CartContext)
  // console.log("header", cart)
  return(
    <header
    style={{
      background: `#212529`,
      marginBottom: `1.45rem`,
      position:'fixed',
      zIndex:'100',
      width:'100%',
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
        <Emoji symbol="🥟" label="dumpling"/>
        <span  style = {{fontSize:'25px'}}>
        momoATL
        </span></Link>
        <Link
          to="/cart"
          style={{
            color: `white`,
            textDecoration: `none`,
            float:'right'
          }}
        >
        <span  style = {{fontSize:'25px'}}>Cart{' '}</span><Emoji symbol="🛒" label="cart"/>
        {cart &&
          <span style = {{marginLeft:'-10px', background:'white', color:'#212529', borderRadius:'50%', height:'28px', width:'28px', fontSize:'20px', display:'inline-block', textAlign:'center', verticalAlign:'middle'}}>
            {' '}
            {cart.reduce((counter, dish) => {
              return counter + dish.quantity
            }, 0)}
            {' '}
            </span>
        </Link>
      </h2>
    </div>
  </header>
  )
}   


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
