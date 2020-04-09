---
title: How to Recover Your WordPress Site after a Plugin Install Goes Wrong
author: David Wells
date: 2012-03-25 22:49:04
layout: post
permalink: >
  http://davidwells.io/how-to-recover-your-wordpress-site-after-a-plugin-install-goes-wrong/
---
Sometimes <em>shit happens</em>, in all areas of life, and WordPress is not immune from the age old saying.
<div class="LessonContent">
<div class="LessonSummary">

Every time you install a new plugin on your site, especially if it's a third party plugin not from the <a href="http://wordpress.org/extend/plugins/">Wordpress repository</a> you run the risk of seeing the infamous White Screen of Death and your wordpress installation breaking.

Not to panic though, you can fix this issue quickly and easily in a couple of steps.

</div>
<div class="LessonStep top">
<h3>Step 1 - Log into your FTP client and delete the plugin file or folder from your wp-content/plugins folder.</h3>
<div class="StepImage"> <img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2012/03/Step_1_-_Log_into_your_FTP_client_and_delete_the_plugin_file_or_folder_from_your_wp-contentplugins_folder..png"/></div>
<div class="StepInstructions">

I use <a href="http://filezilla-project.org/">Filezilla</a> as my FTP client to connect to my server. Here is a <a href="https://www.youtube.com/watch?v=80rc8Ky__bs">quick video showing you how to connected to your server to manage your wordpress files </a>

Once you find and delete the new plugin folder (or file) it will reset the site and automatically deactivate the plugin.

<strong>If you are updating an existing plugin and the site breaks,</strong> follow the above procedure by deleting the plugin from your wordpress wp-content/plugins folder and then re-upload the older working version of the plugin you were using.

You can see all the old versions of a wordpress plugin in the <a href="http://wordpress.org/extend/plugins/">wordpress repository</a>.

</div>
</div>
<div class="LessonStep top">
<div class="StepImage"> <img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2012/03/media_1332715123808.png"/></div>
</div>
<div class="LessonStep top">
<h3>Step 2 - Download the older version of the plugin and upload it to your wp-content/plugins folder, then activate it</h3>
<div class="StepInstructions">

Once you upload the older version of the plugin back to your site, you can simply head into the plugins settings inside of wordpress and activate the older version.

The plugin will continue to prompt you to upgrade, <strong>DO NOT DO THAT.</strong> (unless you want to go through these steps again)

Until the conflicting plugin/code is fixed, you are going to want to hold off on upgrading it.

Typically plugin updates are done to add features, but <strong>if the update is concerning a security issue</strong>, you will want to consult with a wordpress ninja (or the plugin developer) to get the issue resolved.

</div>
</div>
<div class="LessonStep top">
<h3>How to Troubleshoot the issue</h3>
<div class="StepInstructions">

<strong>This post is purely meant to get your site back up and running as quickly as possible</strong>.

<a href="http://jaredheinrichs.com/how-to-troubleshoot-wordpress-white-screen-of-death.html">To troubleshoot exactly where and what is causing the conflict lies you will want to consult this post</a>.

I also highly recommend you have daily/weekly backups running on your server and via a <a href="http://wordpress.org/extend/plugins/wp-db-backup/">backup plugin</a>,  just in case all hell breaks lose and you completely fry your wordpress installation.

Getting a fresh wordpress installation up and running is a pretty quick and simple process but without a backup of your database and your wp-content folder, you could be in trouble.

<strong>So, always have a backup of your wordpress databases and a copy of your wp-content folder. ***** This is important *****</strong>

</div>
</div>
</div>
