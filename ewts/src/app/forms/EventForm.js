import React from 'react'
import  styled  from 'styled-components'


const Title = styled.div`
  margin: 3px;
  color: #585858;
  border: 1px solid grey;
  padding: 4px;
  padding-left: 20px;
  text-align: left;
  font-family: 'Roboto Condensed', sans-serif;
`
console.log(process.env.GRAPHCOOL_URL)

class EventForm extends React.Component {
    render() {
        return (
          <Title> Create a new event </Title>
          
        )
    }
}
export default EventForm