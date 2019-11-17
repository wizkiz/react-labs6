import React from 'react'

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: null,
			isLoading: false,
			isSaving: false,
			showList: false,
			isFormActive: false,
			index: null,
        }
    }

    componentDidMount() {
        this.reloadEmployees();
	}
	
	reloadEmployees() {
		this.setState({
            isLoading: true
        });

        fetch('http://localhost:3004/employees')
            .then(response => response.json())
            .then(data => this.setState({employees: data}))
            .then(() => this.setState({isLoading: false}));
	}

    handlerAddEmployeeButton = () => {

        this.setState({isFormActive: true})
    }

    handlerCancelFormButton = () => {

        this.setState({isFormActive: false})
    }

    handlerFormSubmit = (event) => {
		
		event.preventDefault();
		const data = new FormData(event.target);

		if( !Number(data.get("age"))) {
			console.log("age is not a number");
			return;
		}
		else if( data.get("isActive") != "true" && data.get("isActive") != "false") {
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
			.then(() => this.setState({isSaving: false, isFormActive: false}))
			.then(() => this.reloadEmployees());
    }

    handlerFormReset = (event) =>{

        event.preventDefault();
        this.setState({isFormActive: false});
	}
	
	handlerDeleteEmployee = (id) => {
		console.log(id);
		this.setState({
			index: id,
		})
		fetch(`http://localhost:3004/employees/${id}`, {
			method: "delete"
		})
			.then(response => response.json())
			.then(() => this.setState({index: null}))
            .then(() => this.reloadEmployees());
	}

    render() {
		//console.log("render");
        const addEmployeeButton = (
            <p><button onClick={this.handlerAddEmployeeButton}>Add employee</button></p>
        )

        const addEmployeeForm = (
			this.state.isSaving ? <p>"Saving..."</p> :
            <div>
                <form onSubmit={this.handlerFormSubmit} onReset={this.handlerFormReset}>
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
                    <p><input type="submit" value="Submit"/> <input type="reset" value="Cancel"/></p>
                </form>
            </div>
		)

		// if(this.state.isSaving) {
		// 	return <p>Saving...</p>
		// }

		const noEmployees = (
			<div>
				<p>No employees</p>
				<button onClick={() => this.setState({showList: false})}>Hide employees</button>
			</div>
		)

        if(this.state.isLoading) {
        	return <p>Loading...</p>
		}

        if(this.state.employees) {

			const listEmployees = (
				this.state.employees.length===0 ? noEmployees :
				<div>
					{this.state.employees.map(item => (
						this.state.index === item.id ? <ul key={item.id}>Deleting...</ul> :
						<ul key={item.id}>
							<p>{item.name}, Aged: {item.age}, working in: {item.company}, email: {item.email}, active: {item.isActive.toString()}
							<button onClick={() => {this.handlerDeleteEmployee(item.id)}}>Delete</button></p>
						</ul>
					))}	
					<button onClick={() => this.setState({showList: false})}>Hide employees</button>
				</div>	
			)

            return (
                <div>
                    <p>Data loaded, {this.state.employees.length} employees fetched</p>
					{this.state.isFormActive ? addEmployeeForm : addEmployeeButton}
					{this.state.showList ? listEmployees : <button onClick={() => this.setState({showList: true})}>Show employees</button>}
                </div>
            )
        }

        return <p>Waiting for data to laod</p>
    }
}