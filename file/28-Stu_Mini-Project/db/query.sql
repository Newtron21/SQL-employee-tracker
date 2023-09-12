SELECT 
employee.manager_id
FROM employee
JOIN employee ON employee.manager_id = employee.id;


