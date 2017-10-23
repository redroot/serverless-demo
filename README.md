## Serverless Demo Example

An attempt to get a demo for Serverless running, plus notes an opinionated structure/process for running Serverless, with a good developer experience, deployment experience and monitoring experience. For now this assumes using AWS as the provider.

## Desired features of a serverless product

- User facing parts of the product are outside of the Serverless setup - thinking of Single Page Apps or landing pages, though they can use serverless plugins to deploy in a similar way.
- Low-latency development environment, allowing new developers to make changes quickly, existing developers to be happy that they are adding features in an environment similar to production.
- Where possible development should be done with the `dev` environment within AWS, rather than having to rely on faking resources like API Gateway or Kinesis streams etc locally. Code should still be structured in such a way to allow unit tests regardless of environment and have a universal way to mock HTTP requests, stream events etc. Developers should also be allowed to deploy to their own `dev` environments for short lived testing.
- Idea of multiple `services`, which take care of their own resources, own development and production environment, as well as any monitoring alarms and logs if configurable using
- Ability for each service to make use of shared infrastructure (via a Terraform powered `infrastructure` repo for example) such as a Kinesis stream, shared environment variables, and have knowledge of each other's service endpoints if exposed.
- Deployment to production should involve some sort of CI pipeline, and in that case you can take advantage of build scripts to inject production secrets.
- Logs should be easily accessible and alarms easily configurable.

### Setup for New Devs

- Create a user in AWS IAM with the correct policy for your role (e.g. developer/admin - TODO manage policies as terraform?). Update
`~/.aws/credentials`
- Make a copy of the .envrc-example to .envrc and add your the name of the aws profile from the previous step.

### Development

### Production

### Useful plugins

- https://github.com/ACloudGuru/serverless-plugin-aws-alerts
- https://github.com/FidelLimited/serverless-plugin-warmup
- https://github.com/svdgraaf/serverless-plugin-stage-variables
- https://github.com/dougmoscrop/serverless-plugin-log-subscription
