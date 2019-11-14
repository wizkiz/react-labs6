import React from 'react'

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: null,
            isLoading: false,
        }
    }

    componentDidMount() {
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
    }

    handlerFormReset = (event) =>{

        event.preventDefault();
        this.setState({isFormActive: false});
    }

    render() {

        const addEmployeeButton = (
            <p><button onClick={this.handlerAddEmployeeButton}>Add employee</button></p>
        )

        const addEmployeeForm = (
            <div>
                <form onSubmit={this.handlerFormSubmit} onReset={this.handlerFormReset}>
                    <h1>Add an employee</h1>
                    <p><label>
                        Name:
                        <input/>
                    </label></p>
                    <p><label>
                        Age: 
                        <input/>
                    </label></p>
                    <p><label>
                        Company: 
                        <input/>
                    </label></p>
                    <p><label>
                        Email: 
                        <input/>
                    </label></p>
                    <p><label>
                        IsActive: 
                        <input/>
                    </label></p>
                    <p><input type="submit"/></p>
                    <p><input type="reset"/></p>
                </form>
            </div>
        )

        if(this.state.isLoading) {
            return <p>Loading...</p>
        }

        if(this.state.employees) {
            return (
                <div>
                    <p>Data loaded, {this.state.employees.length} employees fetched</p>
                    {this.state.isFormActive ? addEmployeeForm : addEmployeeButton}
                </div>
            )
        }

        return <p>Waiting for data to laod</p>
    }
}