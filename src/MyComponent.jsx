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

    render() {

        if(this.state.isLoading) {
            return <p>Loading...</p>
        }

        if(this.state.employees) {
            return (
                <div>
                    <p>Data loaded, {this.state.employees.length} employees fetched</p>
                </div>
            )
        }

        return <p>Waiting for data to laod</p>
    }
}