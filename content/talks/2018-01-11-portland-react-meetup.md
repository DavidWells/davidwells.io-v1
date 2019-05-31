---
title: "Using Auth0 & AWS custom authorizers for Serverless APIs"
event: Portland React meetup @ New Relic
date: 2018-01-11
layout: talk
---

About the talk:

Learn how to use JWT and Auth0 to protect serverless APIs.

David will walk you through using React, AWS Lambda, custom authorizers, and Auth0 JWTs to create a full stack react + serverless app.

[Event Details](https://www.meetup.com/Portland-ReactJS/events/246021633/) | [Slides](http://bit.ly/sls-auth-slides) | [Github Repo](https://github.com/serverless/forms-service)

<iframe width="560" height="315" src="https://www.youtube.com/embed/UGrGce6-cX4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

About the Frontend
------------------

*   React application based on [create react app](https://github.com/facebookincubator/create-react-app)
*   Routing via [react router 4](https://reacttraining.com/react-router/web/guides/philosophy)
*   State management via [redux](https://redux.js.org/)
*   Talks to AWS API Gateway via [axios](https://github.com/axios/axios)
*   User auth via [Auth0](https://auth0.com)
*   Hosted on [Netlify](https://www.netlify.com/)

About the Backend
-----------------

*   Node backend running in AWS Lambda Functions
*   Using AWS DynamoDB noSQL database
*   User Authorization handled via API Gateway Custom Authorizer Functions
*   Made possible with the [serverless framework](https://github.com/serverless/serverless)

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/images/form-service-backend.png" />
