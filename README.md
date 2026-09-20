# Playwright Automation Project

## Project Overview

This project contains Playwright UI automation tests using JavaScript.

## Tools & Technologies

- Playwright
- JavaScript
- Node.js
- Git
- GitHub

## What I Practiced

- Playwright locators and element interactions
- Assertions and validations
- Page Object Model (POM)
- Reusable methods
- External JSON test data
- Data-driven testing
- Calendar and date handling
- Dropdown handling
- Test organization
- Git and GitHub version control

## Project Structure

- `pages/` – Page Object Model classes and reusable UI methods
- `tests/` – Playwright test scenarios
- `test-data/` – External JSON test data
- `playwright.config.js` – Playwright configuration
- `package.json` – Project dependencies and scripts
- `.gitignore` – Files and folders excluded from Git

## How to Run the Tests
Install dependencies: npm install
Install Playwright browsers: npx playwright install
Run a test: npx playwright test tests/assignleave.spec.js
Run with browser visible: npx playwright test tests/assignleave.spec.js --headed
View the test report: npx playwright show-report