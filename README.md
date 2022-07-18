

# Contact List
This project is a simple contact list built from scratch.

## Sumary
- [Description](#contact-list)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Tests coverage](#tests-coverage)
- [Next steps](#next-steps)

## Technologies
- Backend:
	- Typescript
	- Node.js
	- MySQL
	- Prisma ORM
	- Tests: Mocha, Chai, Sinon
- Frontend
	- Typescript
	- React
	- Tests: Jest,  React Testing Library

## Getting Started
1. Clone the repository
	-  `git clone git@github.com:braien-machado/contact-list.git`

 2. Go to the cloned repository
	-  `cd contact-list`

2.   Install the dependencies
		- `npm install`

4. Build the mySQL database with *docker-compose*
	- `npm run compose:up`
5. Create a *.env* file with a DATABASE_URL value as in *.env.example* if using db from my docker-compose or edit the value to use another mysql database
6. Go to backend directory and start the api
	-  `cd app/backend && npm start`
7. Open another terminal, go to frontend directory and start the app
	-  `cd app/frontend && npm start`
8. If the app do not open automatically, search for http://localhost:3000/ in any browser

## Tests coverage
### Backend
1. Go to backend directory
	- `cd app/backend`
2. Run the tests
	- `npm run test:coverage`

### Frontend
1. Go to frontend directory
	- `cd app/frontend`
2. Run the tests
	- `npm run test:coverage`

## Next steps
To improve the project, I think I could work on the following subjects:
### Backend
- Create an user table
- Create a login route so user can have access just to their contacts
- Improve patch routes in order to allow user to update multiple tables at once
- Improve post routes in order to allow user to create contact, phone numbers and emails at once
- Improve test coverage
### Frontend
- Create register and login pages
- Improve style
- Display notifications about request errors
- Allow user to update and create all contact info at once
- Improve test coverage

### Other improvements
- Make docker-compose create the backend and frontend together with the database
- Deploy

	
