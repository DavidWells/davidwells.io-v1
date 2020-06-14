---
title: "The rise of embarrassingly parallel serverless compute"
description: "How distributed serverless compute changes the game on whats possible"
author: DavidWells
date: 2020-06-09 09:30:00
layout: post
category: dev
---

Let's begin by suspending disbelief for a moment and imagine this scenario:

> Imagine an application that would normally take 1 hour to run on a single machine... What if instead you could spin up 3600 lambdas that each run for one second to return near instantaneous results

Is this science fiction? Perhaps a developer's fever dream? Or possibly fake news?

None of the above. This is a reality today. This quote is an excerpt from this excellent [Stanford seminar](https://www.youtube.com/watch?v=O9qqSZAny3I) by Keith Winstein where he details the research being put into the future of compute.

We've entered an era of the [serverless supercomputer](https://read.acloud.guru/https-medium-com-timawagner-the-serverless-supercomputer-555e93bbfa08?gi=abc7aa084f4b).

A world where **embarrassingly parallel compute** is not only possible but accessible to everyone.

## Monolithic limitations

Even with gigantic instances, there are physical hardware limitations when compute is isolated to an individual machine.

Given these constraints, it makes sense to shard the machines, spin up new instances, and batch up the work for parallel processing. Share the burden & get multiple machines to pitch in. I love it!

This is all well and good, but there are numerous operational complexities with this approach. Requiring data scientists to be masters in the arts of DevOps is a tall order.

Additionally, keeping these giant instances at the ready is cost-prohibitive. Thus, when jobs need to be done, new boxes must be spun up. This a considerable amount of time compared to alternative approaches.

Finally, there are still constraints under this model due to the underlying architecture & shared resources of their "single machine" nature.

There is "no moore free lunch" as processing power seems to be slowing & when [Moore's Law](https://www.technologyreview.com/2020/02/24/905789/were-not-prepared-for-the-end-of-moores-law/) no longer delivers. Come on [quantum computing](https://www.youtube.com/watch?v=1lIfbqfoGMo)!

![no-moore-free-lunch-image](https://user-images.githubusercontent.com/532272/84102123-716eea80-a9c4-11ea-951a-07c733c36bbd.jpg)

**Note:** If you are comfortable with Kubernetes and scaling out clusters for big data jobs & the parallel workloads described below, godspeed! The approach described below in "serverless compute" section would work in in managed servers with the typical manage it yourself caveats.

**For the adventurous**, curious about how this looks in a serverless world, continue reading.

## Enter Serverless Compute

What does this same view look like in a [serverless](https://davidwells.io/blog/the-serverless-revolution) model when a "FAAS" is leveraged.

Like before, jobs are batched up, and thousands of workers are spun up to handle the task. The difference here, however, is how those workers are spun up and the speed at which this happens.

> "gg is more than 45× faster than Google Kubernetes Engine at startup, and 13× faster than Spark-on-Lambda" (see below on GG framework)

Below is a simplified view of how FAAS providers spin up function instances in parallel to respond to requests.

![AutoScaling-Functions](https://user-images.githubusercontent.com/532272/84103816-f4923f80-a9c8-11ea-98d2-69adaffecff3.png)

Using this on-demand scale from serverless FAAS providers, jobs can be spun up in as many workers as required.

This would be equivalent to summoning thousands of threads, running in parallel with an instant startup.

Much like AWS s3 is an "unlimited file storage service", AWS Lambda is effectively leveraged here as "unlimited on-demand compute threads".

Note: The soft limit on AWS accounts is 1000 concurrent function invocations to avoid runaway function calls, but this can be lifted by contacting AWS based on your needs.

## Use cases

What kinds of things can we do with embarrassingly parallel serverless compute?

I'm glad you asked! Turns out quite a bit:

- Software compilation
- Software testing
- Image & Video encoding, analysis, compression
- [Machine Learning](https://medium.com/@hichaelmart/massively-parallel-hyperparameter-optimization-on-aws-lambda-a7a24b1970c8)
- Data visualization
- Genomics
- Monte Carlo simulations
- Fast Search
- CI/CD
- ... dare I say anything?*

Any processes that can be chunked up and processed in pieces in a distributed fashion is suitable for this massive parallel runtime.

So why isn't everything fast, amazing, and running this way already?

One of the challenging parts about this today is that most software is designed to run on single machines, and parallelization may be limited to the number of machine cores or threads available locally.

Because this architecture & "serverless compute" is so new (*cough cough 2014*), most software is not designed to leverage this approach. I see this changing in the future as more become aware of this approach.

Let's explore some real-world examples of massive parallelization working.

## Real-world examples

Before we continue, I highly recommend strapping in and watching the video below. It goes in-depth into several use cases & demonstrations on the efficacy of this approach.

<iframe width="650" height="365" src="https://www.youtube.com/embed/O9qqSZAny3I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Now onto some additional examples!

## Projects

- [Excamera](https://www.usenix.org/conference/nsdi17/technical-sessions/presentation/fouladi) - video encoding, a functional video codec for fine-grained parallelism
- Lepton - JPEG recompression, a functional JPEG codec for boundary oblivious sharding
- Salsify - video conferencing codec to find optimal encoding rates
- [GG](https://github.com/StanfordSNR/gg) - thunk abstraction to infer a lambda expression & evaluate in serverless compute
- [CC-lambda](https://github.com/andresriancho/cc-lambda)
- [Pywren](http://pywren.io/) - Run your existing python code at massive scale via AWS Lambda
- [serverless-artillery](https://github.com/Nordstrom/serverless-artillery) - performance testing at scale
- [lambci](https://github.com/lambci/lambci) - A continuous integration system built on AWS Lambda
- [Parallel image processing](https://github.com/netlify/gatsby-parallel-runner)

### GG Framework

[gg framework](https://github.com/StanfordSNR/gg) is an open-source framework that helps developers execute applications using thousands of parallel threads on a cloud function service to achieve near-interactive completion times.

GG breaks down larger tasks into an intermediate representation, a collection of "thunks", that is cloud-agnostic. That is then sent over the wire to a given cloud service.

"The goal is to provide results to an interactive user—much faster than can be accomplished on the user's own computer or by booting a cold cluster, and cheaper than maintaining a warm cluster for occasional tasks."

"PyWren exposes a Python API and uses AWS Lambda functions for linear algebra and machine learning. Serverless MapReduce and Spark-on-Lambda demonstrate a similar approach."

"gg is more than 45× faster than Google Kubernetes Engine at startup, and 13× faster than Spark-on-Lambda"

### LambCI

Run CI in parallel and go FAST ⚡️

![lambci](https://user-images.githubusercontent.com/532272/84110418-ae91a780-a9d9-11ea-901d-28c1bdcc0423.jpg)

From [hichaelmart](https://twitter.com/hichaelmart/status/1177258441523568641)

[Project Link](https://github.com/lambci/lambci)

### Nordstorm artillery

Stress-test your systems at any scale. 🚀

Hammer services to verify their production readiness with a fleet of functions.

![artillery](https://user-images.githubusercontent.com/532272/84103671-9cf3d400-a9c8-11ea-9ab7-3c4638334d94.jpg)

[Project link](https://github.com/Nordstrom/serverless-artillery)

### CC lambda

Process 3.5 billion webpages or 198TB of uncompressed data in ~3 hours.

Basically `grep` for the internet.

![common crawl](https://user-images.githubusercontent.com/532272/84112574-d97dfa80-a9dd-11ea-998f-2e7ac3fe23e8.jpg)

[Project link](https://github.com/andresriancho/cc-lambda)

## Additional examples

### Speeding up EMR jobs

Using lambda to speed up Elastic map reduce jobs.

![EMR](https://user-images.githubusercontent.com/532272/84111654-4395a000-a9dc-11ea-840a-bd627e00b69e.jpg)

### Scraping at scale

Using Pywren to handle massive scraping jobs.

![Scraping](https://user-images.githubusercontent.com/532272/84111707-5ad48d80-a9dc-11ea-83ee-804d4e73e075.jpg)

### Machine learning

Using lambda to do massively parallel hyperparameter search with fasttext.

> AWS Lambda blows my mind every time I flex it. Currently executing 2000 parallel 15min functions doing a hyperparameter search with fasttext. 🤯 Would take me frikken hours to do this any other way.

[Michael Hart](https://twitter.com/hichaelmart/status/1055925313362890762)

### Others...

There are many many projects out there like this.

If you have seen others. Please let me know in the comments below!

## Resources & links

- [PyWren: Pushing Microservices to Teraflops, Eric Jonas](https://www.youtube.com/watch?v=H7HanVig5Nc)
- [Outsourcing Everyday Jobs to Thousands of Transient Functional Containers](https://www.usenix.org/conference/atc19/presentation/fouladi)
- [Massively Parallel Hyperparameter Optimization on AWS Lambda](https://medium.com/@hichaelmart/massively-parallel-hyperparameter-optimization-on-aws-lambda-a7a24b1970c8)
- [From Laptop to Lambda: Outsourcing Everyday Jobs to Thousands of Transient Functional Containers](https://www.youtube.com/watch?v=Cc_MVldSijA)
- [Serverless State](https://acloud.guru/series/serverlessconf-nyc-2019/view/serverless-state) - Tim Wagner's keynote from SLS conf 2019
- [Tiny functions for codecs, compilation, and (maybe) soon everything](https://www.youtube.com/watch?v=O9qqSZAny3I) - Stanford Seminar
- [GG framework demo](https://youtu.be/O9qqSZAny3I?t=3313)
- [Occupy the Cloud: Distributed Computing for the 99%](https://shivaram.org/publications/pywren-socc17.pdf)
- [A Berkeley View on Serverless Computing](https://acloud.guru/series/serverlessconf-nyc-2019/view/berkeley-view)
- [Parrellel computing history](https://youtu.be/8pTEmbeENF4?t=1318)
- [Jeremy Daly & Michael Hart discuss massively-parallel-hyperparameter-optimization on Lambda](https://www.serverlesschats.com/19)

## Wrapping up

I hope you see as I do; there is much promise in leveraging serverless compute as the supercomputer of the future.

Imagine a world where nearly everything becomes MUCH faster.

Massive data science jobs runtimes can be reduced for scientists to simulate models faster! Search can improve. Software compilation & dev cycles can be dramatically reduced... You get the point.

Think of the possibilities!

Some challenges lie ahead:

- Making current tools operate in a genuinely parallel distributed fashion
- Improving tooling & DX to make these methods approachable by all (not just Ops folks)
- Educating folks on serverless methodologies & what is possible today with managed cloud services

I will leave you with a question:

**What will you do with your serverless supercomputer?**
