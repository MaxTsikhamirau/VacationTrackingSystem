class EmployeeModel {
    constructor(id, firstName, lastName, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    // validate = () => this.id && this.firstName && this.lastName && this.email;
}

export default EmployeeModel;