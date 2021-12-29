<p align="center">
    <a href="https://github.com/marketplace/actions/fluent-linter-action">
      <img src="https://img.shields.io/badge/Marketplace-v2-undefined.svg?logo=github&logoColor=white&style=flat" alt="GitHub Marketplace" />
    </a>
    <a href="https://github.com/calyptia/fluent-lint-action/actions/workflows/unit-tests.yml">
      <img src="https://github.com/calyptia/fluent-linter-action/actions/workflows/unit-tests.yml/badge.svg" alt="unit-tests" />
    </a>
    <a href="https://codecov.io/gh/calyptia/fluent-linter-action">
      <img src="https://codecov.io/gh/calyptia/fluent-linter-action/branch/main/graph/badge.svg?token=48gHuQl8zV" alt="codecov" />
    </a>
  <a href="https://github.com/calyptia/fluent-linter-action/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/calyptia/fluent-linter-action" alt="APACHE 2.0 license" />
    </a>
</p>

<p align="center">
  <a href="https://github.com/calyptia/fluent-linter-action">
    <img src="logo.png" alt="Logo" width="128" height="128">
  </a>

  </p>

# Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
  - [Add workflow to your repository](#add-workflow-to-your-repository)
  - [Get Calyptia API Key](#get-calyptia-api-key)
  - [Configure secret in your repository](#configure-secret-in-your-repository)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

# Getting started

Fluent-bit and Fluent-d configurations are simple to use. Over time, when our use grows, complexity grows with it. This action will help stay away from common pitfalls. It will add linting to your development process through workflows.

# Installation

Follow the following steps to make the workflow is correctly set up in your repository.

## Add workflow to your repository

the first step is to actually create the workflow in your repository. There are many way we can achieve this, but we have opted for the plug-n-play approach:

0. Go to the repository you wish to add the fluent-linter-action workflow
1. Under the tab "Actions" look for a button called _New workflow_
2. Under choose workflow, you will find a box, please type "fluent-linter"
3. You will find Fluent-linter-action by Calyptia, look for a button called "configure"
4. Make sure to change `CONFIG_LOCATION_GLOB` to a [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) that points your fluent-d and fluent-bit configuration within the repository

If everything goes well, you will have an editor that will let you change anything on the workflow before committing. Keep in mind that the version could be changed to a specific version instead of `main` (current version `v0.0.10`).

_Make sure to commit the workflow to your repository._

\_for more information about using workflows, take a look at\_ [github documentation](https://docs.github.com/en/actions/learn-github-actions/using-starter-workflows)

## Get Calyptia API Key

In order to get the full linting capabilities from this action, you will need to get a Calyptia token. The token is easy to get, just head over [Calyptia Cloud](https://cloud.calyptia.com/) and login (you can use your github account). On the Left panel you can find Account > settings > Generate API key. Give it a distinct name for safe keeping (ex: linter). please copy this token for the next step.

## Configure secret in your repository

The last step will make use of the API key we generated in Calyptia Cloud.

In order to add a new secret to your repository find Settings > Secrets > New repository secret. the name for this secret should be `CALYPTIA_API_KEY`, paste the secret you obtained in the step before.

> note: Settings is often next to the insights tab. If is missing, you might need administrator permissions to add secrets to the repo.

# Limitations

The current fluent-linter-action only works with Fluent-bit configurations. Fluent-d configurations will be available shortly.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
