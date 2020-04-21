function generateMarkdown(answers, badge, picture, email) {
  return `
# ${answers.project}
${badge}

## Description

${answers.description}

### Table of Contents

* [Installation](#installation "Installation")

* [Usage](#usage "Usage")

* [License](#license "License")

* [Contributing](#contributing "Contributing")

* [Tests](#tests "Tests")

* [Questions](#quesitons "Questions")

## Installation

To install dependencies, run the following command:

${answers.install}

## Usage

${answers.use}

## License

${answers.license}

## Contributing

${answers.contribute}

## Tests

To run tests, run the following command:

${answers.test}

## Questions

![profile image](${picture})

If you have any questions about the repo, open an issue or cantact ${email} directly.
`;
}

module.exports = generateMarkdown;
