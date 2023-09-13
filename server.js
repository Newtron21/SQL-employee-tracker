const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: '143Github!',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);


db.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId);
    console.log(`
    ******** ****     **** *******  **         *******   **    ** ******** ********
    /**///// /**/**   **/**/**////**/**        **/////** //**  ** /**///// /**///// 
    /**      /**//** ** /**/**   /**/**       **     //** //****  /**      /**      
    /******* /** //***  /**/******* /**      /**      /**  //**   /******* /******* 
    /**////  /**  //*   /**/**////  /**      /**      /**   /**   /**////  /**////  
    /**      /**   /    /**/**      /**      //**     **    /**   /**      /**      
    /********/**        /**/**      /******** //*******     /**   /********/********
    //////// //         // //       ////////   ///////      //    //////// //////// 
    
    ****     ****     **     ****     **     **       ********  ******** *******  
    /**/**   **/**    ****   /**/**   /**    ****     **//////**/**///// /**////** 
    /**//** ** /**   **//**  /**//**  /**   **//**   **      // /**      /**   /** 
    /** //***  /**  **  //** /** //** /**  **  //** /**         /******* /*******  
    /**  //*   /** **********/**  //**/** **********/**    *****/**////  /**///**  
    /**   /    /**/**//////**/**   //****/**//////**//**  ////**/**      /**  //** 
    /**        /**/**     /**/**    //***/**     /** //******** /********/**   //**
    //         // //      // //      /// //      //   ////////  //////// //     // 
    
    
    `)
    startProgram();
});
// Query database
function startProgram(){
    inquirer
    .prompt([
      {
        type: 'list',
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Quit"
          ],
        name: 'selection',
      },
    
    ])

    .then(function ({ selection }) {
        switch (selection) {


        case "View all departments":
            viewAllDepartments();
            break;

        case "View all roles":
            viewAllRoles();
            break;
        case "View all employees":
            viewAllEmployees();
            break;
  
          case "Add department":
            addDepartment();
            break;
        case "Add role":
            addRole();
            break;

        case "Add employee":
            addEmployees();
            break;
  
        case "Update employee role":
            updateEmployeeRole();
            break;
  
  
          case "Quit":
            db.end();
            break;
        }
      });
  }

 

  function viewAllDepartments(){
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
        startProgram();
      });
  };

  function viewAllRoles(){
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
        startProgram();
      });
  };
  function viewAllEmployees(){
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
        startProgram();
      });
  };

  function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "newDepartment"
    }).then(function(answer){
            db.query(`INSERT INTO department (name) VALUES (?)`,[answer.newDepartment], (err, result) => {
                if (err) {
                  console.log(err);}
                console.log(answer.newDepartment+" successfully added!")
                startProgram();
              });
          });
    };



  function addRole() {
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the new role?",
        name: "newRole"},
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
          },
          {
            type: "input",
            message: "What is the department id number?",
            name: "departmentId"
          }
        ]).then(function(answer){
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,[answer.newRole, answer.salary, answer.departmentId], (err, result) => {
                if (err) {
                  console.log(err);}
                console.log(answer.newRole, answer.salary, answer.departmentId+" successfully added!")
                startProgram();
              });
          });
    };

    function addEmployees() {
      inquirer.prompt([{
          type: "input",
          message: "What is the first name of the employee?",
          name: "firstName"},
          {
              type: "input",
              message: "What is the last name of the employee?",
              name: "lastName"
            },
            {
              type: "input",
              message: "What is the employee's role id number?",
              name: "roleId"
            },
            {
              type: "input",
              message: "What is the manager id number?",
              name: "managerId"
            }
          ])
          .then(function(answer) {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,[answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, result) => {
                if (err) {
                  console.log(err);}
                console.log(answer.firstName, answer.lastName+" successfully added!")
                startProgram();
              });
          });
      };


      


function updateEmployeeRole() {
 
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee's role would you like to update? (type first name)",
        name: "updateEmployee"
      },

      {
        type: "input",
        message: "What role do you want to update to? (type role ID)",
        name: "updateRole"
      }
    ])

    .then(function(answer) {
        db.query(`UPDATE employee SET role_id=? WHERE first_name= ?`,[answer.updateRole, answer.updateEmployee], (err, result) => {
            if (err) {
              console.log(err);}
            console.log(answer.updateRole, answer.updateEmployee+" successfully updated!")
            startProgram();
          });
      });
};


function end() {
  db.end();
  process.end();
}
    