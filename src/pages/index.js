import React from "react"
// import { Link } from "gatsby"
import Emoji from '../components/Emoji'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
// import Card from 'react-bootstrap/Card'
// import ListGroup from 'react-bootstrap/ListGroup'
// import Button from 'react-bootstrap/Button'
// import DishCard from '../components/DishCard'
import SEO from "../components/seo"
import NewCard from '../components/NewCard'

const IndexPage = ({data}) => (
    <Layout>
      <SEO title="Free Momo Delivery in and around Atlanta and Marietta, Georgia" />
      {/* {console.log(data)} */}
      {/* <Card style={{ maxWidth: '500px', margin:'70px auto 0 auto', borderBottom:'none', borderRight:'none', borderLeft:'none'}}>
      <Card.Header as="h3" className= "text-center">Steamed Momo<br/><small>served with Tomato Sesame Sauce</small></Card.Header>
        <Card.Img variant="top" src={momo} style = {{marginBottom: '0'}}/>
        <Card.Body style = {{backgroundImage:'linear-gradient(lightgrey, lightgrey, lightgrey, white)'}}>
          {data.allStrapiDish.nodes.map(dish => (
            <DishCard dish = {dish} key = {dish.id}/>
          ))}
        </Card.Body>
      </Card> */}


      {data.allStrapiDish.nodes.map(dish => (
        <NewCard dish = {dish} key = {dish.id}/>
      ))}

      <div style = {{position:'relative', maxWidth:'500px', margin:'0 auto'}}>
        <img src = "https://goseveth.sirv.com/momo-01.png" alt="momoATL" style={{marginBottom: '0', width:"100%"}}/>
        <h3 style = {{textAlign:'center', width: '100%', position:'absolute', bottom:'0',textShadow: '2px 2px 4px white'}}>Authentic Nepali Dumplings Delivered.</h3>
      </div>
      <div style = {{position:'relative', minHeight: '150px', maxWidth:'500px', margin:'0 auto', backgroundImage:'linear-gradient(white, lightgrey)'}}>
            <p style = {{textAlign:'center', width:'100%', bottom:'-10px', position:'absolute'}}><strong>momoATL</strong>
            <br/><Emoji symbol="🏠" label="home"/>
            {' '}2600 Bentley RD SE
            <br/><Emoji symbol = "📞" label="call"/>
            {' '}+1 470-455-2434
            </p>
     </div>
    </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query MyQuery {
    allStrapiDish {
      nodes {
        id
        strapiId
        title
        description
        price_in_cents
        image {
          url
        }
      }
    }
  }
`