Employee-management-with-jwt-login-authentication-role-based-access-audit-login-login-attempts.

This project is a Spring Boot-based Employee Management System featuring a secure login mechanism using JWT (JSON Web Token) authentication. It allows both Admin and Employee roles to log in and access role-specific functionalities.

Features

Login Form with username and password fields
JWT Authentication for secure session management
Role-based access control:
Admins can create, update, and delete employee records
Employees can view employee details
Spring Security Integration with stateless session policy
CORS Configuration to allow frontend access from http://localhost:5173
Password Encryption using BCryptPasswordEncoder
Swagger API Documentation for easy testing and integration

Technologies Used

Spring Boot
Spring Security
JWT
BCrypt
Swagger
React (Frontend)
RESTful APIs

How It Works

Users log in via the frontend form.
Credentials are sent to /auth/login.
On success, a JWT token is returned.
The token is stored in the frontend and used for all protected API calls.
Backend validates the token and grants access based on user roles.

Database Schema Overview

Audit Log Table Screenshot
<img width="960" height="540" alt="{7C867319-2D21-4670-A14C-7C832ABA3CB0}" src="https://github.com/user-attachments/assets/1339bb18-04f9-45b9-ba2a-2d646c28c7c4" />

Shows login attempts, success/failure status, and timestamps for each user.
🧩 Schema Explanation
1. audit_log Table

id – INT: Primary key
action – VARCHAR: e.g., LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGIN_BLOCKED
attempt_count – INT: Number of failed attempts
timestamp – TIMESTAMP: Date and time of the action
username – VARCHAR: User who performed the action

2. employee Table

employee table Screenshot
<img width="943" height="111" alt="{61B550EB-3496-42DD-8083-5BD7BFCB9563}" src="https://github.com/user-attachments/assets/ee065dc5-8968-462e-b399-f5d778574be3" />


id – INT: Primary key
dob – DATE: Date of birth
firstname, last_name – VARCHAR: Employee name
address – VARCHAR: Residential address
email – VARCHAR: Unique email
phonenumber – VARCHAR: Contact number

3. users Table
   
users table screenshot
<img width="960" height="177" alt="{DE40F149-14FD-41F8-9B1F-8BDAC9C1C64D}" src="https://github.com/user-attachments/assets/8d1f870a-0a66-4cf6-8e91-f9adc7f9f764" />

id – INT: Primary key
username – VARCHAR: Login name
password – VARCHAR: Encrypted password (BCrypt)
role – VARCHAR: ROLE_USER or ROLE_ADMIN


Frontend Overview

The frontend is built using React and provides a user-friendly interface for login, dashboard access, and employee management. It communicates securely with the backend using JWT tokens and supports role-based access for Admin and Employee users.

Features:

Login Form with username and password
JWT Token Storage in localStorage
Role-based Routing (Admin vs Employee)
Protected Routes using token validation
Responsive UI with modern styling
Error Handling for failed login attempts

Tech Stack:

React
Axios (for API calls)
React Router
Tailwind CSS / Bootstrap (optional for styling)

Screenshots of the frontend:

Login form:
<img width="960" height="540" alt="{6CB1490F-3570-4D6B-84E9-DA7D9303D561}" src="https://github.com/user-attachments/assets/6ba955b4-fd3c-43e1-9cfc-5cf12100e625" />

SignUp:
<img width="960" height="540" alt="{00C33545-4D10-433F-A59F-3D965C339CAB}" src="https://github.com/user-attachments/assets/a04c8e6f-1b84-48c0-b9d8-c2f51b5b0d04" />

admin dashboard:
<img width="960" height="540" alt="{9040ACF5-EDE5-4529-A596-C60E2E516006}" src="https://github.com/user-attachments/assets/8f7919ee-da98-4e7a-85aa-55a6d483c4fc" />

user dashboard:
<img width="960" height="540" alt="{3EFF13E2-D6F7-40EE-BA8C-DEE630BF061B}" src="https://github.com/user-attachments/assets/1c9a7355-825e-469c-ab89-2280a78c0b46" />



