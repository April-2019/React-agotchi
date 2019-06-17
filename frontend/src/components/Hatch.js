import React, { Component } from 'react'


export default class Hatch extends Component{
    

 

    pikachu = (e) => {
        // e.preventDefault()
        
        debugger
    }

    sylveon = (name) => {
        // e.preventDefault()
        
        debugger

    }

    syther = (name) => {
        // e.preventDefault()
        
        debugger

    }

    charmander = (name) => {
        // e.preventDefault()
        
        debugger

    }

    poplio = (name) => {
        // e.preventDefault()
        
        debugger

    }
   ob = {
        pikachu: this.pikachu,
        charmander: this.charmander,
        sylveon: this.sylveon,
        syther: this.syther,
        poplio: this.poplio
    }

    render(){
        return(
            <div>
                This is to make a Pet
                <form onSubmit={(e) => {e.preventDefault(); console.log(this.ob); this.ob[e.target.children[1].value](e.target.children[0].value)}} >
                    <input type="text"></input>
                    <select>
                        <option value="pikachu">Pikachu</option>
                        <option value="sylveon">Sylveon</option>
                        <option value="charmander">Charmander</option>
                        <option value="scyther">Scyther</option>
                        <option value="poplio">Poplio</option>
                    </select>
                    <input type="submit"  ></input>
                </form>
            </div>
        )
    }
}

