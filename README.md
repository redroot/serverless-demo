## Serverless Demo Example

An attempt to get some serverless stuff running with a good developer experience, deployment experience and monitoring experience.

VERY MUCH WIP

### Standards

- Service folder containing a serverless.yml, and a handler.js that exports one or more functions is deployed as a Lambda in AWS.
- Deploys to 'dev' by default or whatever is in serverless.yml
- One 'stage' or Cloudformation stack per serverless service.

### Setup

- Create a user in AWS IAM with the correct policy for your role (e.g. developer/admin - TODO manage policies as terraform?). Update
`~/.aws/credentials`
- Make a copy of the .envrc-example to .envrc and add your the name of the aws profile from the previous step.
- Add a unique username-based stack name to the DEV_STACK_NAME value (whoever is helping onboard you should be able to help)

### Development

-----

TODO

- Setup backend like service (b) that uses amazon dynamo db to persist like between client uuid and film uuid
- - can we make it work locally or is that not important? Try as uploading all the time is a pain, and differences between event contents when invoking locally and curling url
- - add scripts to Curl endpoint easily - somehow read endpoint for current stage out of environment - might not be necessary as invoking function locally uses resources in prod, but probably still useful
- - add ability to query List endpoint
- let us use Babel with webpack maybe?
- Move individual service tests into their own folder, add include and exclude lines to serverless.yml
- Add ability to view all 'production' functions and 'staging' functions somehow in top level folder
- Deployable to staging environment and production environment in obvious way - aliasing maybe?
- Work out steps for static frontend for doing this.
- Work out nice deployment steps
- Work out easy monitoring an metric steps

PRODUCTION MONITORING TODO

- Can we somehow manage shared production env variables for production resources like the kinesis stream that several sources need to read from.
- Can we create production only alarms in Cloudwatch easily?

NOTES

- how do we specify stages?
- - Looks like DEV by default
- - can we add specific new stage like dev-luke - yep just run `serverless deploy -v --stage dev-luke` or
- - potentially have dev specific Access Policies - can create a dev stack but only the admin / Travis / Jenkins has access to deploying to production stage?
- - Offboarding - remove dev-name stack by running `serverless remove --verbose --stage dev-luke` for potentially every function on the stage
- This might be useful https://github.com/svdgraaf/serverless-plugin-stage-variables
- And this https://github.com/FidelLimited/serverless-plugin-warmup
- DynamoDB table doesn't get delete on stage removal
- `package.json` required in local directory of each service, cant rely on outwards file structure
- Updating to cloud every single time to use non local DynamoDb is a pain ... maybe all locally is better? But code works locally but not in Lambda.
