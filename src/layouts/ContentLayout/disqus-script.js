/**
 * disqus blog comments script in head
 */

const disqusScript = `
  var disqus_shortname = 'davidwells';
  (function() {
      var id = 'disqus-script'
      if (!document.getElementById(id)) {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        dsq.id = 'disqus-script';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      } else {
        setTimeout(function() {
          DISQUS.reset({
            reload: true,
            config: function () {
              this.page.url = window.location.href;
              this.page.title = document.title;
              this.language = 'en';
            }
          });
        }, 20);
      }
  })();
`

module.exports = disqusScript
