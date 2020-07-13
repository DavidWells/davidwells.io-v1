---
title: Netlify Build Plugins
description: Programmable interface for Netlify CI/CD pipeline
thumbnail: https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-build-plugins.png
date: 2019-10-16
layout: portfolio
---

**Date**: 2019

[Netlify Build Plugins](https://github.com/netlify/build/) are a layer on top of Netlify's CI pipeline that adds a pluggable programmatic interface for users to extend to fit any use case.

- [Background & vision](#project-background)
- [Build Plugin Spec](#netlify-build-plugins-spec)
- [Build Plugin API Design](#plugin-api-design)

<br/>

## Launch video

<iframe width="720" height="315" src="https://www.youtube.com/embed/4m6Hi4_qEVE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT6et0kYScZbSEPdAv1oMSXqY6J9trgpyzHKdEDl66ncZXx53TaXx-2D3F5rgfmFhL9xEZyH1S7dw8J/embed?start=true&loop=false&delayms=60000" frameborder="0" width="720" height="434" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

---

## Project background

Users of Netlify's build system, including myself, have the following questions:

1. [How can I make things faster?](#1-how-can-i-make-things-faster)
2. [How can I save on cost?](#2-how-can-i-save-on-cost)
3. [How can I streamline workflows, developer productivity & time to market?](#3-how-can-i-streamline-workflows-developer-productivity--time-to-market)
4. [How can we improve product quality?](#4-how-can-we-improve-product-quality)
5. [How can we ensure compliance?](#5-how-can-we-ensure-compliance)

At Netlify, we are striving to answer these questions & provide a superior developer experience around the solutions we bring to the market. Netlify build plugins are no exception and a core component of the overall product experience we provide to our users.

Let's explore these key questions in our customer's minds & see how build plugins can be used to address these critical areas.


### 1. How can I make things faster?

Making builds faster is top of mind.

Using a smart build plugin, you could avoid expensive time-consuming build processes such as optimizing the same images every build, avoiding long-running builds if relevant files haven't changed, or running incremental builds.

**Some plugin examples:**

- **Gatsby cache plugin** - speed up gatsby builds via intelligent caching
- **Cypress cache plugin** - Only running cypress tests if src/route hashes change
- **Ignore site build scripts** - if only serverless functions change
- Ignore site build if source files we change about, e.g., markdown/src directory's haven't changed
- **Short circuit** build process if external content from third-party CMS hasn't changed
- Optimize only new images not found in the previous build cache.
- Only build relevant subdirectories that have changed & restore the rest of the site from the last build cache.
- Aggressively cache dependencies for faster boot-up times.

### 2. How can I save on cost?

As we begin to package & charge for build minutes, the cost is at the forefront of the developer's consideration when choosing a platform.

Any tools we can provide to allow users to glean insights on usage & optimize costs are going to be a big win for transparency and the overall developer experience.

Cost optimization examples are very similar to the `How can I make things faster?` section.

**Some plugin examples:**

- NoOp component library/storybook builds if component src files haven't changed. Save on build minutes
- Automatically disable builds during specific times of the day.

### 3. How can I streamline workflows, developer productivity & time to market?

Setting up new projects & build tools is no easy feat. The amount of complexity that comes with setting up a production build environment is non-trivial & typically replicated over and over again for projects.

How can we streamline this flow & make it easy for companies to standardize their projects & CI flows without recreating the wheel each time?

How can we scale processes across a growing organization?

Build plugins are one way.

By design, build plugins are meant to be shared. This means a couple of things.

First, we can begin abstracting common build tasks up the stack out of specific static site generator tools. This allows for plugins to be used in any type of project regardless of the frontend framework or static site generator used.

Second, because these are dependencies that can be shared across projects from a centralized location, this allows organizations to begin standardizing their deployment flows.

**Benefits that fall out of standardizing these flows include:**

1. Better security practices
- Increased compliance & accessibility
- Enforcing performance budgets
- Less time onboarding new developers
- Lower project maintenance
- Easier project scaffolding
- and ultimately a faster time to market

**Some plugin examples:**

- **Company XYZ standards plugin** - For example, Unilever creates a plugin that encompasses performance, accessibility & security requirements for all their web properties. This plugin uses various performance + accessibility regression testing tools and scans dependencies for critical vulnerabilities. This plugin also sends back build metrics to a centralized logging tool for further BI processing. This plugin can be installed as a one-liner in all Netlify projects for the org.
- **A component tracking plugin** -  This plugin scans the src code for components used from a component library & tracks which products are using which components, their versions, & other metadata. This helps inform the component library team what teams they need to coordinate with to test & release changes across the organization safely.
- **"Analytics assurance plugin"** - This plugin scans built output and verifies that every page on the site includes their google analytics tracking code & that the code is not malformed.
- **"SEO audit" plugin.**  - This plugin scans built a site to ensure all pages have required meta tags, properly formatted schema tags & social open graph tags. It also verifies the validity of the sitemap and submits the new sitemap to google webmaster tools when a new page is added to ensure a hasty indexation time.

### 4. How can we improve product quality?

Whether a bug in the code, an issue with an older browser, a missing dependency in a serverless function, or performance degradation, shipping regressions is never a good time.

How can we improve & help users ensure the quality of their projects to guard against these regressions?

**Some plugin examples:**

- **404 no more plugin.** - guards against pages being removed & not having a proper redirect setup, eliminating accidental 404s.
- **Lighthouse performance** testing to guard against performance degradation.
- **A text linting plugin** - This plugin would scan the built output of the site for common misspellings & brand keywords that need to be consistent across the product & cancel build or report these.
- **A sauce labs plugin** - Automatically run deploy previews their every known browser to verify your app works consistently across all browsers you support
- **"Self-healing" deploy plugins.** These plugins would detect a regression in a postDeployment hook and automatically report the issue & rollback the regression to a previously verified deployment.
-  **"Canary deployments" plugin** - These plugins can use the A/B routing tool to gradually route traffic to the newly deployed version while "retiring" the previously deployed app if no error threshold is passed

### 5. How can we ensure compliance?

Compliance is often overlooked at the offset of smaller projects but becomes increasingly important as a company matures until it becomes non-negotiable in larger enterprises.

How can we provide our larger enterprise customers the security features they need to fall within compliance standards?

**Some plugin examples:**

- "CSP (Content security policy) audit plugin". This plugin checks the content security policy of the site & warns + enforces a security policy to prevent cross script scripting attacks
- "Third-party script + GDPR auditor plugin". This plugin scans the site for any third party script tags included, loads the page & reports the find output of scripts loaded on the page, the cookies/storage they produce & report + track them for the user. These values are increasingly crucial with GPDR & cookie consent laws.
- As previously mentioned a dependency scanner plugin to ensure no compromised dependencies are present.
- "Ingress / Egress Rules" plugin - This plugin ensures that any HTTP calls during the build process are to approved endpoints & not to malicious third-parties leaking secrets etc.
- **"XSS payload injection plugin".** - This plugin runs post-deployment & hammers form inputs with common XSS payloads to verify inputs & requests are properly sanitized.

[Additional plugin use cases and examples can be found here](https://github.com/netlify/build/issues/709)

---

## Netlify Build plugins spec

Below is the original spec of build plugins.

### Design principles

- Stellar DX is paramount
- Lightweight core
- Extensible
- Sane defaults that are configurable

### Plugins

Plugins are a way for users to extend the functionality of the Netlify Platform.

**Plugins have the ability to:**

- Alter the behavior of the flow of logic in the Netlify Build. This includes running custom functionality before, after, and during a given point in the build lifecycle.
- Override default behavior of the build lifecycle.
- Provision third party resources.
- Extend the build lifecycle with their own hooks.

### Plugins Must

- Be able to hook into the various stages of the build lifecycle
- Be able to create their own lifecycle stages or "hooks"
- Be able to add CLI commands
- Be able to provision (create/update/delete) resources
- Be able to return output data for other plugins to use
- Provide utilities via core API to allow for easy manipulation of common build activities

### Lifecycle

Plugins can listen to core lifecycle events that happen during different Netlify activities, for example during the build, while Netlify dev is running, or during a Netlify deployment.

### Extensibility

The lifecycle is extendable; plugins can define their own lifecycle events that other plugins and listen to and react to. For example, the `mongoDb` plugin can expose an `afterDatabaseCreated` hook that other plugins can run functionality from.

### Logging

All plugin logs should flow through a structured logging system.

Every console.log/warn/etc. should be grouped for the UI + plugins to consume.

Logging should be as secure as possible without sacrificing performance. This means automatically redacting known `env` variables from plugins trying to console.log them out. Plugins installed should be vetted by users to ensure they are not installing malware.

### Outputs & Manifest

Plugins can return outputs that other plugins may leverage.

This means a mongoDB provisioning plugin might pass a connection string back as an output that a "mongo crud function" plugin can reference  

This means the order is essential in how plugins are defined in the configuration, and a dependency graph of outputs is required to ensure things run in the correct order.

#### Manifest

The manifest is the aggregated list of all outputs returned from the build.

This includes things like `liveSiteUrl`, deployId, plugin outputs, function names, function URLs, etc.

This manifest file is written to `.netlify/manifest.json`

### CLI commands

Plugins can expose additional commands to the Netlify CLI.

For example the `mongoDb` plugin could expose a `netlify mongo:delete` command that tears down the given resource.

---

## Plugin API design

Below is the original plugin API design.

1. Plugins are simple objects that expose hooks into lifecycle methods
2. Each lifecycle method gets a standard `pluginApi` input.
3. Plugins get included in `netlify.yml`

**Example build plugin:**

```js
module.exports = function myBuildPlugin(pluginConfig) {
  return {
    onInit: (pluginApi) => { /* do stuff on onInit */ },
    onPreBuild: (pluginApi) => { /* do stuff on onPreBuild */ },
    onPostBuild: (pluginApi) => { /* do stuff on onPostBuild*/ },
    onPostDeploy: (pluginApi) => { /* do stuff on onPostDeploy */ },
    onSuccess: (pluginApi) => { /* do stuff on onSuccess */ },
    onError: (pluginApi) => { /* do stuff on onError*/ },
  }
}
```

**The `pluginApi` definition** is listed below

```js
module.exports = function myBuildPlugin(pluginConfig) {
  return {
    /**
     * Plugin API
     * @param  {object} netlifyConfig   - Resolved value of Netlify configuration file
     * @param  {object} pluginConfig    - Initial plugin configuration
     * @param  {object} utils           - set of utility functions for working with Netlify
     * @param  {object} utils.cache     - Helper functions for dealing with build cache
     * @param  {object} utils.git       - Helper functions for dealing with git
     * @param  {object} utils.run       - Helper functions for dealing with executables
     * @param  {object} utils.functions - Helper functions for dealing with Netlify functions
     * @param  {object} utils.redirects - Helper functions for dealing with Netlify redirects
     * @param  {object} utils.headers   - Helper functions for dealing with Netlify headers
     * @param  {object} constants       - constant values referencing various env paths
     * @param  {string} constants.CONFIG_PATH     - path to netlify config file
     * @param  {string} constants.BUILD_DIR       - path to site build directory
     * @param  {string} constants.CACHE_DIR       - path to cache directory
     * @param  {string} constants.FUNCTIONS_SRC   - path to functions source code directory
     * @param  {string} constants.FUNCTIONS_DIST  - path to functions build directory
     * @param  {object} api             - scoped API instance of Netlify sdk
     * @return {object} outputs - output values from call
     */
    onPreBuild: ({ netlifyConfig, pluginConfig, utils, constants, api }) => {
      // do the thing
    },
  }
}
```

Attaching a plugin to your build would be done in `netlify.yml`

```yml
# Build settings
build:
  functions: functions
  publish: build
  # Inline lifecycle hooks
  lifecycle:
    onInit:
      - echo "starting the build"
    onPostBuild:
      - echo "build complete the build"

# Build plugins
plugins:
  pluginOne:
    # Local plugin definition
    package: ./plugins/one
    # plugin inputs
    inputs:
      foo: bar
  sitemapPlugin:
    # Remote plugin from NPM
    package: netlify-sitemap-plugin
```

### Available event handlers

The events that build plugins can hook into are as follows

| Event                                     | Description                        |
| :---------------------------------------- | :--------------------------------- |
| **onInit** ‏‏‎ ‏‏‎ ‏‏‎      | Runs before anything else          |
| **onPreBuild** ‏‏‎ ‏‏‎ ‏‏‎  | Before build commands are executed |
| **onBuild** ‏‏‎ ‏‏‎ ‏‏‎     | Build commands are executed        |
| **onPostBuild** ‏‏‎ ‏‏‎ ‏‏‎ | After Build commands are executed  |
| **onSuccess** ‏‏‎ ‏‏‎ ‏‏‎   | Runs on build success              |
| **onError** ‏‏‎ ‏‏‎ ‏‏‎     | Runs on build error                |
| **onEnd** ‏‏‎ ‏‏‎ ‏‏‎       | Runs on build error or success     |

### Inputs & Outputs

[Read the full input/output spec here](https://gist.github.com/DavidWells/1e05977a9a4aaf184f53f456fac2889c)

Plugin outputs are a way for values to be passed between plugins.

These outputs will allow for more advances use cases of plugins that depend on values from each other.

For example, a `mongodb-atlas-plugin` might pass a connection string back as an output that a custom-rest-api-function-plugin might use to automatically scaffold a serverless function with said connection string.

To achieve a feature like this, Netlify Build requires additional configuration from the plugin author so outputs and build order can be correctly executed.
