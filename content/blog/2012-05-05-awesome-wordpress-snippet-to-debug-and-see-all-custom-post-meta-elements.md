---
ID: 4314
title: Awesome WordPress Snippet to Debug and See all Custom Post Meta Elements
author: David Wells
date: 2012-05-05 03:39:43
layout: post
permalink: >
  http://davidwells.io/awesome-wordpress-snippet-to-debug-and-see-all-custom-post-meta-elements/
---
Ran across this script earlier today.

It helped be see a huge list of custom post fields aka, wordpress post meta, to use in a WordPress Custom Post template.

Place it in the single.php or custom page template loop and you can echo out all of the available post variables.

```php
<h3>All Post Meta</h3>

<?php $getPostCustom=get_post_custom(); // Get all the data ?>

<?php
    foreach($getPostCustom as $name=>$value) {

        echo "<strong>".$name."</strong>"."  =>  ";

        foreach($value as $nameAr=>$valueAr) {
                echo "<br />     ";
                echo $nameAr."  =>  ";
                echo var_dump($valueAr);
        }

        echo "<br /><br />";

    }
?>
```


<p><a href="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2012/05/all-variables.png"><img class=" wp-image-4316 aligncenter" title="all variables" src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/legacy/2012/05/all-variables-1024x768.png" alt="" width="614" height="461" /></a></p>
I highly recommend saving it.

Once you echo out all of your custom post meta you can set up conditional logic like:

```php
<?php if (get_post_meta($post->ID, 'landing_page_checkbox', true) == "") {
  echo "#menu {display:none;}"; } ?>
```

This code above is hiding my sites navigation is the custom meta box is checked.
