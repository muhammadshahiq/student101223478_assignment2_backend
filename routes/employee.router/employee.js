const express = require('express');
const Employee = require("../../models/employee/employee");
const router = express.Router();


function join(t, a, s) {
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

//REQUEST Get All Employees

router.get("/v1/employees", async (req, res) => {
    try {
      const all_employees = await Employee.find().sort({ $natural: -1 });
      const total_employee = await Employee.countDocuments();
      res.status(200).json({ all_employees, total_employee })
    }
    catch {
      (err => res.json(`Error: ${err}`))
    }
  })

// Post Api Add employee
router.post("/v1/employees", async (req, res) => {

    var textid = "";
    var possible = +Date.now() + "0123456789";

    for (var i = 0; i < 4; i++)
        textid += possible.charAt(Math.floor(Math.random() * possible.length));

    let a = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
    let dateObj = join(new Date, a, '-');

    let employee = new Employee({
        _id: textid,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailid: req.body.emailid,
        Postdate: dateObj

    });

    try {
        employee = await employee.save();
        (res.status(201).json("A new Employee resource is created"))
    } catch (error) {
        res.status(400).json("A new Employee resource is not created")
        console.log(error)
    }

});

//REQUESt GET Employee BY ID  
router.get("/v1/employees/:id", (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.status(200).json(employee))
        .catch(err => res.status(400).json(`Error: ${err}`))
})


// //REQUESt GET Employee BY ID AND UPDATE 

router.put("/v1/employees/:id", async (req, res) => {

    Employee.findById(req.params.id)
        .then(employee => {
            employee.firstname = req.body.firstname;
            employee.lastname = req.body.lastname;
            employee.emailid = req.body.emailid;
            employee.save()
                .then(() => res.status(200).json("Employee resource is Updated."))
                .catch((err) => res.status(400).json(`Error: ${err}`))
        })

        .catch((err) => res.status(400).json(`Error: ${err}`))
});

// // Employee Deleted

router.delete("/v1/employees/:id", (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).json("Employee resource is Deleted."))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;