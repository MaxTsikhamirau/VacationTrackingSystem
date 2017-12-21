const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const validate = require('express-validation');

let employees = require('./app/data/employees');
const validation = {
  employee: require('./validation/employee')
};

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/employees/:id', (request, response) =>
  response.send(employees.find(e => e.id.toString() === request.params.id)));

app.get('/employees', (request, response) => response.send(employees));

app.post('/employees', validate(validation.employee.addEmployee), (request, response) => {
  const { id, firstName, lastName, email, groups } = request.body;
  employees.push({ id, firstName, lastName, email, groups });
  response.send({ status: "OK" });
});

app.put('/employees/:id', validate(validation.employee.updateEmployee), (request, response) => {
  const { firstName, lastName, email, groups } = request.body;
  const found = employees.find(e => e.id.toString() === request.params.id);
  if (found) {
    found.firstName = firstName;
    found.lastName = lastName;
    found.email = email;
    found.groups = groups;
    response.send({ status: "OK" });
  } else {
    response.send({ status: "NOT_FOUND" });
  }
});

app.delete('/employees/:id', validate(validation.employee.removeEmployee), (request, response) => {
  const found = employees.find(empl => empl.id.toString() === request.params.id);
  if (found) {
    employees = employees.filter(empl => empl.id.toString() !== request.params.id);
    response.send({ status: "OK" });
  } else {
    response.send({ status: "NOT_FOUND" });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});
