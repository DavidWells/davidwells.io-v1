---
title: How to programmatically import your external blog post links into WordPress
author: DavidWells
date: 2016-02-10 19:13:14
layout: post
category: dev
tags:
  - wordpress
---

I recently imported all the links to external posts I'd written into this blog.

## Why?

I wanted to collect/showcase all the content I've written over the ages in one place.

## Problem

Some content was located in other WordPress sites and other posts were not.

So, WordPress XML imports wouldn't work for everything.

I also didn't want to duplicate all the post_meta and content for all the posts but rather just link out to them.

## Solution?

Glad you asked!

In the end, I decided to simply use javascript to grab an array of the post titles, dates and URLs via the browser console.

# Step 1. Grab the data

Grab your post data.

From the WordPress admin page `http://www.inboundnow.com/wp-admin/edit.php?post_type=post&amp;author=3` viewing my posts.

`http://www.site.com/wp-admin/edit.php?post_type=post&amp;author=YOUR_AUTHOR_ID`

Set the 'Number of items per page' to as high as you need to view all the posts at once, then run this script in the browser console.

```javascript
var row = document.querySelectorAll('#the-list tr')

var data = [];
for (var i = 0; i < row.length; i++) {
  var title = row[i].querySelectorAll('.row-title')[0].innerText;
  var link = row[i].querySelectorAll('.view a')[0].getAttribute('href');
  var date = row[i].querySelectorAll('.column-date abbr')[0].getAttribute('title');
  data[i] = { url: link, title: title, date: date}
};
console.log(JSON.stringify(data)) // blam all of the posts in a nice lil javascript array
```

I grabbed all the posts I created while I was at HubSpot from this page `http://blog.hubspot.com/marketing/author/david-wells` using the below script.

```javascript
var article = document.querySelectorAll('.post-item');
var data = [];
for (var i = 0; i < article.length; i++) {
  var url = "http:" + article[i].querySelectorAll('.post-title__link--preview')[0].getAttribute('href');
  var title = article[i].querySelectorAll('.post-title__link--preview')[0].innerText;
  var date = article[i].querySelectorAll('meta')[1].getAttribute('content');
  data[i] = { url: url, title: title, date: date}
};
console.log(JSON.stringify(data))
```

Now I have my data to import!

# Step 2 - Import into Wordpress

This code goes in your functions.php file. Alter it to suite your needs. (aka post author number and category number )

```php
function insert_wordpress_posts_from_json(){
  // Add your json block here
  $json = '[{
  "url": "http://www.inboundnow.com/bulk-manage-web-leads-directly-wordpress/",
  "title": "Bulk Edit & Manage Web Leads Directly from WordPress",
  "date": "2014/01/30 2:08:17 pm"
  }, {
  "url": "http://www.inboundnow.com/create-awesome-lead-tracking-forms-site/",
  "title": "How to Create Awesome Lead Tracking Forms for Your Site",
  "date": "2014/01/12 12:07:18 am"
  }, {
  "url": "http://www.inboundnow.com/create-awesome-unordered-lists-with-icons/",
  "title": "How to Create Awesome Unordered Lists with Icons for Your WordPress Site",
  "date": "2014/01/07 9:54:30 pm"
  }]';
  // convert to usable PHP array
  $jsonToPHPArray = json_decode($json, true);

  // Loop over that shit
  foreach ($jsonToPHPArray as $key => $value) {
    // Check if post by that title already exists or not
    $post_exists = post_exists( $value['title'] );
    if (!$post_exists) {
      // format to correct wordpress specific date  '2010-02-23 18:57:33'
      $postdate = date('Y-m-d H:i:s', strtotime($value['date']));
      $url = $value['url'];
      $new_post = array(
      'post_title'    =>   $value['title'],
      'post_date'     =>   $postdate,
      'post_status'   =>   'publish',
      // change this to your wordpress id
      'post_author'   =>   3,
      // change this to your correct category ID
      'post_category' => array( 5 )
      );
      // create post in wordpress. Yay!
      $new_post_id = wp_insert_post($new_post);
      // add custom post meta to imported posts
      add_post_meta( $new_post_id, 'what_ever_post_meta_you_want', true );
      // This is to be google friendly when using Yoast WordPress SEO
      add_post_meta( $new_post_id, '_yoast_wpseo_canonical', $url );
    }
  }
}
// I am triggering in the admin head, but you can fire this however you want
add_action('admin_head', 'insert_wordpress_posts_from_json');
```

Wordpress and PHP have some shitty memory limits so I kept the array to around 25 items per import.

Have fun!

P.S there are probably other ways to do this. This worked for me.
