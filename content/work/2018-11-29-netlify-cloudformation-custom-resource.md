---
title: Netlify + AWS CloudFormation
description: Deploy netlify sites as part of CloudFormation stack
thumbnail: https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-cloudformation-thumb.jpg
date: 2018-11-29
layout: portfolio
---

Deploy Netlify sites as part of serverless, SAM, or raw AWS cloudformation stacks.

This project lets you define your site as infrastructure as code.

- [Post](https://www.netlify.com/blog/2018/11/29/deploying-netlify-sites-with-aws-cloudformation/)
- [Example](https://github.com/DavidWells/netlify-site-as-aws-custom-resource-example)

##  Demo

<iframe width="720" height="315" src="https://www.youtube.com/embed/AQ-f-U8Pncc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## How to use it?

Declare one or many Netlify sites in your AWS CloudFormation template by adding the following to your [`Resources` section](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html) of your CF template.

```yml
# Logical ID
myNetlifySite:
  # Resource type
  Type: Custom::NetlifySite
  # Resource properties
  Properties:
    # AWS ARN of provisioning function uses to create Netlify site
    ServiceToken: {
      "Fn::Join": ["",
        ["arn:aws:lambda:",{"Ref":"AWS::Region"},":453208706738:function:custom-resource-netlify-site"]
      ]
    }
    # Settings required for provisioning Netlify site
    netlifyToken: xyz-123-netlify-token
    githubToken:  xyz-123-github-token
    name: new-new-new-site-new-name
    custom_domain: lol-wow-cool.com
    build_settings:
      repo_url: https://github.com/DavidWells/test-site
      repo_branch: master
      dir: build
      cmd: npm run build
      allowed_branches:
        - master
      env:
        MY_ENV_KEY: hello
        MY_OTHER_KEY: there
```

### Raw CloudFormation Example

Below is an example of using the custom resource using [AWS CloudFormation](https://docs.aws.amazon.com/cloudformation/index.html#lang/en_us)

```yml
---
AWSTemplateFormatVersion: '2010-09-09'
Description: The AWS CloudFormation template with Netlify Site
Resources:
  myNetlifySite:
    Type: Custom::NetlifySite
    Properties:
      ServiceToken: {
        "Fn::Join": ["",
          ["arn:aws:lambda:",{"Ref":"AWS::Region"},":453208706738:function:custom-resource-netlify-site"]
        ]
      }
      netlifyToken: your-netlify-token
      githubToken: your-github-token
      name: your-netlify-site-name
      # custom_domain: site.com
      build_settings:
        repo_url: https://github.com/username/site-repo
        repo_branch: master
        dir: build
        cmd: npm run build
        allowed_branches:
          - master
        env:
          MY_ENV_KEY: hello
          MY_OTHER_KEY: there
```

### AWS SAM example

Below is an example of using the custom resource using [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

```yml
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Description: 'SAM template for Serverless framework service: '
Resources:
  myNetlifySite:
    Type: Custom::NetlifySite
    Properties:
      ServiceToken: {
        "Fn::Join": ["",
          ["arn:aws:lambda:",{"Ref":"AWS::Region"},":453208706738:function:custom-resource-netlify-site"]
        ]
      }
      netlifyToken: your-netlify-token
      githubToken: your-github-token
      name: your-netlify-site-name
      # custom_domain: site.com
      build_settings:
        repo_url: https://github.com/username/site-repo
        repo_branch: master
        dir: build
        cmd: npm run build
        allowed_branches:
          - master
        env:
          MY_ENV_KEY: hello
          MY_OTHER_KEY: there
```

### Serverless Framework example

Below is an example of using the custom resource using the [serverless framework](https://github.com/serverless/serverless/)

Contents of the `serverless.yml` config file:

```yml
service: my-service-with-netlify-site

provider:
  name: aws
  runtime: nodejs8.10

resources:
  Resources:
    myNetlifySite:
      Type: Custom::NetlifySite
      Properties:
        ServiceToken: {
          "Fn::Join": ["",
            ["arn:aws:lambda:",{"Ref":"AWS::Region"},":453208706738:function:custom-resource-netlify-site"]
          ]
        }
        netlifyToken: your-netlify-token
        githubToken: your-github-token
        name: your-netlify-site-name
        # custom_domain: site.com
        build_settings:
          repo_url: https://github.com/username/site-repo
          repo_branch: master
          dir: build
          cmd: npm run build
          allowed_branches:
            - master
          env:
            MY_ENV_KEY: hello
            MY_OTHER_KEY: there
```
