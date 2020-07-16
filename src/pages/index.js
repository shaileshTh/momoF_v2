import React from "react"
// import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import DishCard from '../components/DishCard'
import SEO from "../components/seo"


const IndexPage = ({data}) => (
    <Layout>
      <SEO title="Home" />
      {/* {console.log(data)} */}
      {data.allStrapiDish.nodes.map(dish => (
        <DishCard dish = {dish}/>
      ))}
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
      }
    }
  }
`
