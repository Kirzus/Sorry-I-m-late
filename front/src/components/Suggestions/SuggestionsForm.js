import React, { Component } from "react";

import "./SuggestionsForm.css";

class SuggestionsForm extends Component {
    state = {
        category: "funny",
        issue: "",
        image: "",
        excuse: "",
        likes: 0
    };

    handleSubmit = (e) => {
        e.preventDefault()
        // Get data from the form state
        const data = this.state
        console.log(data)
        // HTTP REQUEST
        const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        // Api Request
        fetch("/excuses/addSuggestion", config)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                alert("Excuse submited ! :D ")
                document.location.reload()
            }
        })
        .catch(e => {
            console.error(e);
            alert("Erreur lors de l'ajout de l'excuse");
          });
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }


  render() {
    // Defining states
    const {category, issue, image, excuse} = this.state;
    return (
      <>
        <p>{category}</p>
        <p>{issue}</p>
        <p>{image}</p>
        <p>{excuse}</p>
        <form className="form-layout" onSubmit={this.handleSubmit}>
          <label htmlFor="category">Choose a category:</label>
          <select id="category" name="category">
            <option value="funny" >Insolite</option>
            <option value="serious">Sérieuses</option>
          </select>
          <label htmlFor="issue">Problème:</label>
          <input
            type="text"
            id="issue"
            name="issue"
            value={issue}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="excuse">Excuse:</label>
          <textarea
            id="excuse"
            name="excuse"
            value={excuse}
            placeholder="Ecrivez ici votre excuse"
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Submit my excuse" />
        </form>
      </>
    );
  }
}

export default SuggestionsForm;
