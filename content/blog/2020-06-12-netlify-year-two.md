---
title: "Netlify Year Two Recap Extravaganza."
description: "Many awesome things were shipped & many lessons learned"
author: DavidWells
date: 2020-06-12 09:30:00
layout: post
---

Another year flew by at Netlify. Its high time for another [yearly round up](https://davidwells.io/blog/netlify-year-one).

Many awesome things were shipped 🚀, the team **tripled** in size, I learned quite a bit about the CI landscape and building product.

**Let's dive into it.** Strap in partner 🤠.

## Managing Product

Earlier last year, I moved into a technical product management position with the mission of modernizing our build pipeline.

Building products for developers is a challenge but a rewarding one. It's a high wire balancing act between **nailing the developer experience** and **providing the raw power** devs need to solve their particular use case.

This is the ethos of the product at Netlify:

**How can we make this thing as approachable as possible, with escape hatches for advanced users.**

When we hit this mark, it makes folks fall in love with the product.

Heck, this is the primary reason I joined  Netlify 2 years ago. The combination of the ease of use, how much time it saved me, and the overall utility of the product was how I put it at the tippy top of my list of places to work.

---

## Managing Product Management

Building & shipping products to millions of developers is one of the best jobs on the planet, but it's not without its challenges.

Bringing together the various stakeholders in a company is probably the **hardest** thing I have ever tried to do. Syncing product vision with docs, support, developer relations, marketing, C Suite, and engineering is an ongoing process. It requires a lot of patience, trust & delegation.

Writing a master Notion doc helps, but in reality, most folks don't have the bandwidth to read all of those beautiful words, use cases, and whys. 😅

As an aside, I highly recommend John Cutler's "one-pager" format for dispersing ideas. Keep things short and sweet. There is nothing worse than spending months on the perfect document that no one reads.

![one-pager-template](https://user-images.githubusercontent.com/532272/87268079-52a9bb00-c47e-11ea-8e93-9dd225c38523.png)

These communication challenges get amplified when you are trying to build something that is brand new. Valid criticisms, confusion, and FUD will pop in to say hello from time to time. It's important to keep these framed as coming with the **best of intentions**. Everyone is on the same team, and we all want what is best for the company & our users.

Keeping a humble attitude and having thick skin is a prerequisite when creating, pitching, & re-pitching ideas. This is especially true when various stakeholders want opposite outcomes or different priorities covered first. It's the PM's job to balance this intake & plan accordingly.

It takes constant communication, repetition, re-phrasing, and sync ups to keep folks on the same page. This was one of the learning curves and an area I got a mega crash course in this past year.

Do me a favor and [**hug your PM**](http://eleganthack.com/the-myths-of-product-management/) next time you see them.

If you are curious to learn more product management, I highly recommend the book [Inspired](https://www.amazon.com/INSPIRED-Create-Tech-Products-Customers-ebook/dp/B077NRB36N) and following [John Cutler](https://twitter.com/johncutlefish) and [Shreyas Doshi](https://twitter.com/shreyas) on twitter.

Also, soft skills. Soft skills are a crucial part in keeping teams cohesive.

Contrary to popular belief, soft skills are not acquired by drinking copious amounts of soft-serve ice cream. Instead, it's about empathizing with your compatriots & taking the time to deepen relationships & trust.

---

## Netlify Build Plugins

One of the larger initiatives of the previous year was Netlify build plugins. The project was born out of this [lil' repo](http://github.com/DavidWells/new-build-bot) with wide eyes and a dream: Leveling up our build pipeline & creating a remarkable developer experience!

From there, the idea & [early prototype](https://www.youtube.com/watch?v=G0du75AClC0&feature=youtu.be) picked up steam, and the team grew. It was amazing & humbling to watch.

Launching build plugins on stage at [JAMstack conf 2019](https://www.youtube.com/watch?v=4m6Hi4_qEVE&feature=emb_title) in front of hundreds of developers was a highlight of my career.

![jamstack-sf-2019](https://user-images.githubusercontent.com/532272/87262674-b37dc700-c46f-11ea-8714-adf787f9044b.jpg)

After the initial early alpha launch, things slowly started to change. This lil' project was now becoming a big piece of Netlify, and everyone was rallying around the cause. Talk about mounting pressures 😅.

As my hat shifted from developing features into more project & product management, there were many bumps & hurdles along the way. Ultimately, the team came together and had a great launch.

Kudos to all involved.

![build-plugin-thanks](https://user-images.githubusercontent.com/532272/87263169-289dcc00-c471-11ea-87ed-8a6aff773336.jpg)

It's an amazing feeling when a project you built is processing **millions and millions** of site builds!

You can learn more about the design & ideas behind build plugins [here](https://davidwells.io/work/netlify-build-plugins).

We ran a successful beta program with our beautiful developer community ❤️ and got so much fantastic feedback on different use cases and problems folks are trying to solve. This was a big highlight in the product dev cycle.

We also launched the [plugins directory](https://github.com/netlify/plugins) for the broader community to share what they build with others.

### Building Plugins

In addition to project management work, I built a bunch of plugins.

This was to showcase what they can do and, more importantly, to stress test the various plugin APIs that were being designed.

It's ** essential** the developer ergonomics of the tools I help create are top-notch. Dogfooding and building with the product you're creating is the **best** way to know if an API is wonky or what needs to be streamlined further. This helps hone in on the perfect experience.

Dogfooding + beta user feedback is critical at the early stages of product development.

**Some of the plugins created:**

The [sitemap plugin](https://github.com/netlify-labs/netlify-plugin-sitemap) enables automatic a sitemap generation for any static site tool.

The [sentry build plugin](https://github.com/getsentry/sentry-netlify-build-plugin) automatically notifies [Sentry](https://sentry.io/) of new releases being deployed to your site.

The [save money plugin](https://github.com/DavidWells/jamstack-sf/blob/33839c866f6a0589740981ee03d499f9f6d831ac/plugins/save-money/index.js#L4) that allows you programmatically disable builds when you are running out of build minutes 😅.

The [serverless plugin](https://github.com/DavidWells/jamstack-sf/blob/33839c866f6a0589740981ee03d499f9f6d831ac/plugins/serverless/index.js) that allows folks to manage + deploy AWS resources with Netlify.

The [debug cache plugin](https://github.com/DavidWells/netlify-plugin-debug) for getting what's in your build cache to help folks optimize their builds with the build plugins [caching utilities](https://github.com/netlify/build/tree/1d89e3cfd3ce02297815fab3afbbc27f3b9e27f8/packages/cache-utils).

The [REST Functions plugin](https://youtu.be/IGIW0FOcpHE) adds the ability to define your API routes to your Netlify serverless functions and specify the type of `http` method that is allowed to access the function (e.g. `GET` only). It also enables users to organize backend serverless function code any way they would like. This allows for more flexible code bases and not just inside the putting code in the `functions` folder.

### Programmatic Git Util

This was a fun one. Misson: **Make git easier to interact with**.

The [git utilities](https://github.com/netlify/build/tree/1d89e3cfd3ce02297815fab3afbbc27f3b9e27f8/packages/git-utils) for build plugins allow for users to stop their builds if specific assets haven't changed in git history.

You can use this functionality to:

- Stop builds early if no javascript has changed
- Only reprocess directories if files have changed
- Ignore `README.md` changes
- etc.

Here is an example of the git utility in action.

It's available on `utils.git` inside of the plugin lifecycle methods. Here it is running on the `onPreBuild` hook.

```js
module.exports = {
  onPreBuild: ({ utils }) => {
    const { git } = utils

    /* Do stuff if files modified */
    if (git.modifiedFiles.length) {
      console.log('Modified files:', git.modifiedFiles)
    }

    /* Do stuff only if html code edited */
    const htmlFiles = git.fileMatch('**/*.html')
    console.log('html files git info:', htmlFiles)

    if (htmlFiles.edited.length !== 0) {
      console.log('>> Run thing because HTML has changed\n')
    }
    //
    /* Do stuff only if markdown files edited */
    const markdownFiles = git.fileMatch('**/*.md')
    console.log('markdown files git info:', markdownFiles)

    if (markdownFiles.modified.length !== 0) {
      console.log('>> Run thing because Markdown files have been created/changed/deleted\n')
    }

    /* Do stuff only if css files edited */
    const cssFiles = git.fileMatch('**/*.css')
    if (cssFiles.deleted.length !== 0) {
      console.log('>> Run thing because css files have been deleted\n')
      console.log(cssFiles)
    }
  },
}
```

---

## CLI Improvements

The [Netlify CLI](https://github.com/netlify/cli/) is used by many developers to work on their projects locally via the `netlify dev` command and for [fast local deploys](https://www.netlify.com/blog/2019/05/28/deploy-in-seconds-with-netlify-cli/).

The other primary user of the CLI is other CI systems (CircleCI, Github Actions, etc.). To better support programmatic usage of the CLI, I added a couple of features to support these folks.

### Netlify API CLI command

The `netlify api` [command](https://github.com/netlify/cli/pull/379) was added.

This really opens up what you can achieve with the CLI. It gives you full programmatic access to [Netlify's Open API](https://open-api.netlify.com/).

Here is an example of how to use it to get a site's Details

```bash
netlify api getSite --data '{ "site_id": "123456"}'
```

Run `netlify api --list` to see all available methods.

```bash
netlify api --list
.----------------------------------------------------------------------------------------------------.
|                                        Netlify API Methods                                         |
|----------------------------------------------------------------------------------------------------|
|         API Method          |                              Docs Link                               |
|-----------------------------|----------------------------------------------------------------------|
| listSites                   | https://open-api.netlify.com/#/operation/listSites                   |
| createSite                  | https://open-api.netlify.com/#/operation/createSite                  |
| getSite                     | https://open-api.netlify.com/#/operation/getSite                     |
| updateSite                  | https://open-api.netlify.com/#/operation/updateSite                  |
| deleteSite                  | https://open-api.netlify.com/#/operation/deleteSite                  |
| provisionSiteTLSCertificate | https://open-api.netlify.com/#/operation/provisionSiteTLSCertificate |
| showSiteTLSCertificate      | https://open-api.netlify.com/#/operation/showSiteTLSCertificate      |
| listSiteForms               | https://open-api.netlify.com/#/operation/listSiteForms               |
| listSiteSubmissions         | https://open-api.netlify.com/#/operation/listSiteSubmissions         |
| listSiteFiles               | https://open-api.netlify.com/#/operation/listSiteFiles               |
| listSiteAssets              | https://open-api.netlify.com/#/operation/listSiteAssets              |
| createSiteAsset             | https://open-api.netlify.com/#/operation/createSiteAsset             |
| getSiteAssetInfo            | https://open-api.netlify.com/#/operation/getSiteAssetInfo            |
| updateSiteAsset             | https://open-api.netlify.com/#/operation/updateSiteAsset             |
| deleteSiteAsset             | https://open-api.netlify.com/#/operation/deleteSiteAsset             |
| getSiteAssetPublicSignature | https://open-api.netlify.com/#/operation/getSiteAssetPublicSignature |
| getSiteFileByPathName       | https://open-api.netlify.com/#/operation/getSiteFileByPathName       |
| listSiteSnippets            | https://open-api.netlify.com/#/operation/listSiteSnippets            |
| createSiteSnippet           | https://open-api.netlify.com/#/operation/createSiteSnippet           |
| getSiteSnippet              | https://open-api.netlify.com/#/operation/getSiteSnippet              |
| updateSiteSnippet           | https://open-api.netlify.com/#/operation/updateSiteSnippet           |
| deleteSiteSnippet           | https://open-api.netlify.com/#/operation/deleteSiteSnippet           |
| getSiteMetadata             | https://open-api.netlify.com/#/operation/getSiteMetadata             |
| updateSiteMetadata          | https://open-api.netlify.com/#/operation/updateSiteMetadata          |
| listSiteBuildHooks          | https://open-api.netlify.com/#/operation/listSiteBuildHooks          |
| createSiteBuildHook         | https://open-api.netlify.com/#/operation/createSiteBuildHook         |
| getSiteBuildHook            | https://open-api.netlify.com/#/operation/getSiteBuildHook            |
| updateSiteBuildHook         | https://open-api.netlify.com/#/operation/updateSiteBuildHook         |
| deleteSiteBuildHook         | https://open-api.netlify.com/#/operation/deleteSiteBuildHook         |
| listSiteDeploys             | https://open-api.netlify.com/#/operation/listSiteDeploys             |
| createSiteDeploy            | https://open-api.netlify.com/#/operation/createSiteDeploy            |
| getSiteDeploy               | https://open-api.netlify.com/#/operation/getSiteDeploy               |
| updateSiteDeploy            | https://open-api.netlify.com/#/operation/updateSiteDeploy            |
| cancelSiteDeploy            | https://open-api.netlify.com/#/operation/cancelSiteDeploy            |
| restoreSiteDeploy           | https://open-api.netlify.com/#/operation/restoreSiteDeploy           |
| listSiteBuilds              | https://open-api.netlify.com/#/operation/listSiteBuilds              |
| createSiteBuild             | https://open-api.netlify.com/#/operation/createSiteBuild             |
| listSiteDeployedBranches    | https://open-api.netlify.com/#/operation/listSiteDeployedBranches    |
| getSiteBuild                | https://open-api.netlify.com/#/operation/getSiteBuild                |
| updateSiteBuildLog          | https://open-api.netlify.com/#/operation/updateSiteBuildLog          |
| notifyBuildStart            | https://open-api.netlify.com/#/operation/notifyBuildStart            |
| getDNSForSite               | https://open-api.netlify.com/#/operation/getDNSForSite               |
| configureDNSForSite         | https://open-api.netlify.com/#/operation/configureDNSForSite         |
| getDeploy                   | https://open-api.netlify.com/#/operation/getDeploy                   |
| lockDeploy                  | https://open-api.netlify.com/#/operation/lockDeploy                  |
| unlockDeploy                | https://open-api.netlify.com/#/operation/unlockDeploy                |
| uploadDeployFile            | https://open-api.netlify.com/#/operation/uploadDeployFile            |
| uploadDeployFunction        | https://open-api.netlify.com/#/operation/uploadDeployFunction        |
| createPluginRun             | https://open-api.netlify.com/#/operation/createPluginRun             |
| listForms                   | https://open-api.netlify.com/#/operation/listForms                   |
| listFormSubmissions         | https://open-api.netlify.com/#/operation/listFormSubmissions         |
| listHooksBySiteId           | https://open-api.netlify.com/#/operation/listHooksBySiteId           |
| createHookBySiteId          | https://open-api.netlify.com/#/operation/createHookBySiteId          |
| getHook                     | https://open-api.netlify.com/#/operation/getHook                     |
| updateHook                  | https://open-api.netlify.com/#/operation/updateHook                  |
| deleteHook                  | https://open-api.netlify.com/#/operation/deleteHook                  |
| enableHook                  | https://open-api.netlify.com/#/operation/enableHook                  |
| listHookTypes               | https://open-api.netlify.com/#/operation/listHookTypes               |
| createTicket                | https://open-api.netlify.com/#/operation/createTicket                |
| showTicket                  | https://open-api.netlify.com/#/operation/showTicket                  |
| exchangeTicket              | https://open-api.netlify.com/#/operation/exchangeTicket              |
| listDeployKeys              | https://open-api.netlify.com/#/operation/listDeployKeys              |
| createDeployKey             | https://open-api.netlify.com/#/operation/createDeployKey             |
| getDeployKey                | https://open-api.netlify.com/#/operation/getDeployKey                |
| deleteDeployKey             | https://open-api.netlify.com/#/operation/deleteDeployKey             |
| createSiteInTeam            | https://open-api.netlify.com/#/operation/createSiteInTeam            |
| listSitesForAccount         | https://open-api.netlify.com/#/operation/listSitesForAccount         |
| listMembersForAccount       | https://open-api.netlify.com/#/operation/listMembersForAccount       |
| addMemberToAccount          | https://open-api.netlify.com/#/operation/addMemberToAccount          |
| listPaymentMethodsForUser   | https://open-api.netlify.com/#/operation/listPaymentMethodsForUser   |
| listAccountTypesForUser     | https://open-api.netlify.com/#/operation/listAccountTypesForUser     |
| listAccountsForUser         | https://open-api.netlify.com/#/operation/listAccountsForUser         |
| createAccount               | https://open-api.netlify.com/#/operation/createAccount               |
| getAccount                  | https://open-api.netlify.com/#/operation/getAccount                  |
| updateAccount               | https://open-api.netlify.com/#/operation/updateAccount               |
| cancelAccount               | https://open-api.netlify.com/#/operation/cancelAccount               |
| listAccountAuditEvents      | https://open-api.netlify.com/#/operation/listAccountAuditEvents      |
| listFormSubmission          | https://open-api.netlify.com/#/operation/listFormSubmission          |
| deleteSubmission            | https://open-api.netlify.com/#/operation/deleteSubmission            |
| createServiceInstance       | https://open-api.netlify.com/#/operation/createServiceInstance       |
| showServiceInstance         | https://open-api.netlify.com/#/operation/showServiceInstance         |
| updateServiceInstance       | https://open-api.netlify.com/#/operation/updateServiceInstance       |
| deleteServiceInstance       | https://open-api.netlify.com/#/operation/deleteServiceInstance       |
| getServices                 | https://open-api.netlify.com/#/operation/getServices                 |
| showService                 | https://open-api.netlify.com/#/operation/showService                 |
| showServiceManifest         | https://open-api.netlify.com/#/operation/showServiceManifest         |
| getCurrentUser              | https://open-api.netlify.com/#/operation/getCurrentUser              |
| createSplitTest             | https://open-api.netlify.com/#/operation/createSplitTest             |
| getSplitTests               | https://open-api.netlify.com/#/operation/getSplitTests               |
| updateSplitTest             | https://open-api.netlify.com/#/operation/updateSplitTest             |
| getSplitTest                | https://open-api.netlify.com/#/operation/getSplitTest                |
| enableSplitTest             | https://open-api.netlify.com/#/operation/enableSplitTest             |
| disableSplitTest            | https://open-api.netlify.com/#/operation/disableSplitTest            |
| createDnsZone               | https://open-api.netlify.com/#/operation/createDnsZone               |
| getDnsZones                 | https://open-api.netlify.com/#/operation/getDnsZones                 |
| getDnsZone                  | https://open-api.netlify.com/#/operation/getDnsZone                  |
| deleteDnsZone               | https://open-api.netlify.com/#/operation/deleteDnsZone               |
| transferDnsZone             | https://open-api.netlify.com/#/operation/transferDnsZone             |
| getDnsRecords               | https://open-api.netlify.com/#/operation/getDnsRecords               |
| createDnsRecord             | https://open-api.netlify.com/#/operation/createDnsRecord             |
| getIndividualDnsRecord      | https://open-api.netlify.com/#/operation/getIndividualDnsRecord      |
| deleteDnsRecord             | https://open-api.netlify.com/#/operation/deleteDnsRecord             |
'----------------------------------------------------------------------------------------------------'
```

### CLI Global json flag

CLI's that print out a bunch of unstructured logs & messages to help users are great, however, this gets in the way of chaining or "piping" together CLI commands.

The `--json` flag was added to make all CLI commands silent and force them only to print out the JSON returned from the various commands. This makes that command chaining possible & allows folks to achieve much more on the terminal with single-line commands.

For example, here is how you list out all sites as JSON with the `--json` flag & parse the results with [jq](https://stedolan.github.io/jq/tutorial/).

```bash
netlify sites:list --json | jq '.[0]'
```

Or if you wanted to get information back about the current CLI user programmatically:

```bash
netlify status --json | jq '.account'
```

### Silent flag

Sometimes users might want to mute verbose build logs or other things to save on log storage or keep things private. The `--silent` flag helps with this and mutes all console.logs in the CLI.

```bash
netlify deploy --silent
```

### Netlify Build Command

The original [design concept](https://davidwells.io/work/netlify-build-plugins) behind Netlify build plugins was to have a provider agnostic layer to allow for build plugins to work on any CI system.

1. Plugins just fit right into your build
2. Plugins run locally & remotely
3. Plugins are sharable bits of logic
4. Plugins are framework/build tool agnostic to abstract up the stack

Following these principles, we wanted users to have the same local build experience they have in Netlify on their local machine. This includes running the build lifecycle hooks and all plugins installed.

The `netlify build` command allows users to do this.

## Other odds and ends

- Helped get a security vulnerability fixed. 🎉 (Ask me about this in 20 years)
- Setup a solid telemetry pipeline for our build system
- Continued with some of the marketing Ops work from [last year](https://davidwells.io/blog/netlify-year-one), helping build/maintain various serverless microservices.
- Worked on a couple different partner [add-on integrations](https://github.com/netlify/addons)
- Wrote many many specs, notion docs, GitHub issues, & slack messages 😅
- Learned a metric F ton!

## Wrapping up

While I think [my first year](https://davidwells.io/blog/netlify-year-one) I shipped **more** projects, I believe the things shipped in the past year will have a more significant impact on the future of the company.

Many thanks to the whole team at Netlify for world-class & awesome ❤️.

![netlify-team](https://user-images.githubusercontent.com/532272/87264450-dc548b00-c474-11ea-9fb3-e51e03bac44d.png)

And once again shoutout to [Matt](https://twitter.com/biilmann) & [Chris](https://twitter.com/chr_bach), the founders of Netlify for building such a diverse team and enabling all of this.

Thanks for reading and remember: **Have fun and build awesome.**
