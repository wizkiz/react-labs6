import React from 'react'
import {withRouter} from 'react-router-dom'

class PageAddEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			isSaving: false
        }
    }

    handlerFormSubmit = (event) => {
		
		event.preventDefault();
		const data = new FormData(event.target);

		if(!Number(data.get("age"))) {
			console.log("age is not a number");
			return;
		}
		else if(data.get("isActive") != "true" && data.get("isActive") != "false") {
			console.log("isActive is not bool");
			return;
		}

		this.setState({
			isSaving: true
		})
		
		fetch('http://localhost:3004/employees', {
			method: "post",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				isActive: data.get("isActive")==="true" ? true : false,
				age: Number(data.get("age")),
				name: data.get("name"),
				company: data.get("company"),
				email: data.get("email")
			})
		})
			.then(response => response.json())
            .then(() => this.setState({isSaving: false}));
    }

    render () {
        const addEmployeeForm = (
			this.state.isSaving ? <p>Saving...</p> :
            <div>
                <form onSubmit={this.handlerFormSubmit} onReset={() => this.props.history.push("/")}>
                    <h1>Add an employee</h1>
					<p><label>
                        IsActive: 
                        <input name="isActive"/>
                    </label></p>
					<p><label>
                        Age: 
                        <input name="age"/>
                    </label></p>
                    <p><label>
                        Name:
                        <input name="name"/>
                    </label></p>
                    <p><label>
                        Company: 
                        <input name="company"/>
                    </label></p>
                    <p><label>
                        Email: 
                        <input name="email"/>
                    </label></p>
                    <p><input type="submit" value="Submit"/> <input type="reset" value="Back"/></p>
                </form>
            </div>
		)

        return (
            <div>
                {addEmployeeForm}
            </div>
        )
    }
}

export default withRouter(PageAddEmployee)