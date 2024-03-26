Assessment README
Overview
This repository contains the codebase for an assessment project. The project aims to create a web application for managing multichoice questions. Users can add, edit, delete, and view existing questions along with their options.

Features
Add Question: Users can add new multichoice questions with multiple options.
Edit Question: Users can edit existing questions, including modifying the question itself and its options.
Delete Question: Users can delete questions they no longer need.
View Questions: Users can view a list of existing questions along with their options.
Technologies Used
Next.js: The frontend framework used for building the web application.
React: The JavaScript library for building user interfaces.
Formik: A form library for React to handle form submission and validation.
Yup: A JavaScript schema builder for value parsing and validation.
Axios: A promise-based HTTP client for making API requests.
Tailwind CSS: A utility-first CSS framework for styling the application.
Getting Started
To run the project locally, follow these steps:

Clone the repository to your local machine:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install dependencies:

Copy code
npm install
Start the development server:

arduino
Copy code
npm run dev
Open your browser and visit http://localhost:3000 to view the application.

Project Structure
The project directory structure is organized as follows:

/pages: Contains Next.js page components.
/components: Contains reusable UI components used across the application.
/api: Contains API functions for interacting with the backend server.
/utils: Contains utility functions used within the application.
/tests: Contains test files for unit and integration testing.
Testing
Unit and integration tests are implemented using the Jest testing framework. To run the tests, use the following command:

bash
Copy code
npm test
Contributing
Contributions to this project are welcome! To contribute, follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix: git checkout -b feature-name.
Make your changes and commit them: git commit -m 'Add new feature'.
Push to the branch: git push origin feature-name.
Submit a pull request with a detailed description of your changes.
License
This project is licensed under the MIT License.
