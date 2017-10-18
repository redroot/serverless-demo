## Serverless Demo Example

An attempt to get some serverless stuff running with a good developer experience, deployment experience
and monitoring experience.

### Standards

- Service folder containing a serverless.yml, and a handler.js that exports a `lambda` function which is was is deployed as a Lambda in AWS.

TODO

- how do we specific stages?
- Setup backend film service (a) lambda that returns json for all films and popular film
- Setup backend like service that uses amazon dynamo db / local equivalent to persist like between client uuid and film uuid
- Unit tests locally
- Deployable to staging environment and production environment in obvious way
- Work out steps for static frontend for doing this.
- Work out nice deployment steps
- Work out easy monitoring an metric steps
