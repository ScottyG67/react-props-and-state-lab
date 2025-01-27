import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // onChangeType = ({ target: { value } }) => {
  //   this.setState({ filters: { ...this.state.filters, type: value } });
  // };

  onChangeType = ({target:{value}}) => {
    // this.setState({ filters: { ...this.state.filters, type: value } });
    this.setState({filters:{type: value}})
  }

  onFindPetsClick = async() => {
    console.log("change Filters Called")
    let searchURL = "/api/pets"
    if(this.state.filters.type !== "all"){
      searchURL = searchURL +"?type=" +this.state.filters.type
    }
    console.log(searchURL)
    const res = await fetch(searchURL)
    const pets = await res.json()

    this.setState({pets})
  }

  onAdoptPet = (petId) => {
    console.log(petId)
    console.log(this.state.pets.find(pet => pet.id == petId))
    this.state.pets.find(pet => pet.id == petId).isAdopted = true
    console.log(this.state.pets.find(pet => pet.id == petId))

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType} 
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
             <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
