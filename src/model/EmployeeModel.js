class EmployeeModel {
    constructor(id, first_name, last_name, email) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }

    validate = () => this.id && this.first_name && this.last_name && this.email;
}

export default EmployeeModel;