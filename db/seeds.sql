USE employee_db;
INSERT INTO department (name)
VALUES ('Sales'),
       ('Marketing'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
        ('Growth Director', 200000, 2),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 3),
        ('Software Engineer', 120000, 3),
        ('Account Manager', 160000, 4),
        ('Accountant', 120000, 4),
        ('Head of Legal', 250000, 5),
        ('Lawyer', 190000, 5),
        ('Marketing analyst', 90000, 2);
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cline", "Mattingly", 1, NULL),
        ("Alice", "Vickers", 2, NULL),
        ("Becky", "Tasker", 3, 1),
        ("Jenn", "Andrus", 3, 1),
        ("Peter", "MacArthur", 10, 2),
        ("Anna", "Newton", 4, NULL),
        ("Lauren", "Likes", 5, 6),
        ("Annika", "Erickson", 6, NULL),
        ("Garrett", "Wessman", 7, 8),
        ("Erin", "O'Neill", 8, NULL),
        ("John", "Johnson", 9, 10),
        ("Jane", "Doe", 10, 2);
