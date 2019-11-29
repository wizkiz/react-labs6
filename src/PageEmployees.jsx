import React from 'react'


class PageEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: null,
			isLoading: false,
            index: null
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
    
    render () {
        
        if(this.state.isLoading) {
        	return <p>Loading...</p>
		}

        if(this.state.employees) {
			const listEmployees = (
				this.state.employees.length === 0 ? <div>No employees</div> :
				<div>
					{this.state.employees.map(item => (
						this.state.index === item.id ? <ul key={item.id}>Deleting...</ul> :
						<ul key={item.id}>
							<p>{item.name}, Aged: {item.age}, working in: {item.company}, email: {item.email}, active: {item.isActive.toString()}
							<button onClick={() => this.handlerDeleteEmployee(item.id)}>Delete</button></p>
						</ul>
					))}		
				</div>	
			)

            return (
                <div>
                    <p>Data loaded, {this.state.employees.length} employees fetched</p>
                    {listEmployees}
                </div>
            )
        }   

        return <h1>PageEmployees</h1>
    }
}

export default PageEmployees