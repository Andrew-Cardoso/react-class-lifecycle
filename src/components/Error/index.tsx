import React from "react";


export class ErrorComponent extends React.Component { 
  render () {
    throw new Error('Error component has an error, who would have guessed?')
    return (<h1>Teste</h1>)
  }
}