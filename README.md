# Exchange
## Preparation
Before running test use should install NodeJS > 6.1.0 at you environment: https://nodejs.org/en/download/
## Running tests
### 1. Load the project from the GitHub:
> git clone https://github.com/KsenyaSwir/Exchange.git 
### 2. Install dependences and components
Go to the root of project and perform command
> npm install

It will install all components based on package.json file into node_modules folder.

### 3. Running of auto-tests locally

#### 3. 1 To run all tests in Electron:
If you not interested in seeing GUI
> npx cypress run

#### 3. 2 To run all tests in Chrome:
If you prefer to see the GUI while test running
> npx cypress run -b chrome

#### 3. 3 In order to get the report in the Cypress Dashboard you should add some more parameters:
> npx cypress run --record --key 8f967a09-48ee-4128-91ad-b8fe98216d80

#### 3.4 Run single test file
Choose single test in cypress window
> npx cypress open
