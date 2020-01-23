# Master Framework for all Nexus Internal Systems

This framework was made to integrate KendoUI, Bulma, Bootstrap and AngularJS to create a design standard that adheres to P&A Grant Thornton design standards.

## Built With
* [Bulma 0.7.1](https://github.com/jgthms/bulma) - CSS Framework
* [KendoUI](https://demos.telerik.com/kendo-ui) - Version 2019.3.1023
* [AngularJS 1.4.8](https://angularjs.org) - JS Framework (Optional)
* [Bootstrap 4.0.0](https://getbootstrap.com/) - Bootstrap (Optional)

### Framework Stylesheets


```
<link rel="stylesheet" href="content/assets/css/bulma.css">
<link rel="stylesheet" href="content/assets/css/materialize/1.0.0/material-dashboard.css">
<link rel="stylesheet" href="content/assets/css/sidebar/sidebar.css">
<link rel="stylesheet" href="content/assets/css/icons.min.css">
```

### KendoUI required stylesheets
kendo-override.css is the one I used to modify/customize the design of the existing KendoUI Design to a GT Standard Design.

Take note that this framework will only work for Kendo 2019.3.1023. Should you update the KendoUI version, this file should also be updated.

```
<link rel="stylesheet" href="content/assets/css/kendo/2019.3.1023/kendo.material-v2.min.css" />
<link rel="stylesheet" href="content/assets/css/kendo-override.css">
```

### Project Override Files
Framework-Override is used to modify/customize Bulma and Bootstrap to a GT Standard Design.
Main.css is used to implement custom styles that a client requires. It's also used to override all stylesheets and therefore, this file should always be loaded last among all the stylesheets.

You may also combine the two into one custom stylesheet if this fits your needs.
```
<link rel="stylesheet" href="content/assets/css/framework/1.0.0/framework-override.css">
<link rel="stylesheet" href="content/assets/css/main.css">
```

### GT colors
These are GT approved colors that we use globally to make the design into a GT uniformed design.
```
/* 
* GT International Brand Colors 
* These are the global brand colors of P&A GT and shall be used in part or whole depending on the system
* CSS4 variable style [Usage: var (--GTcolor)]
*/
 :root {
     --GTcolor: #4f2d7f;
     --GTsubcolor: #e92841;
     --GTwhitegray: #c8beaf;
     --GTred: #e92841;
     --GTteal: #00a7b5;
     --GTgreen: #9bd732;
     --GTorange: #FF7d1e;
     --GTpurple: #4f2d7f;
 }

 /* End of GT Brand Colors */
```

### Javascript Files
These files are self-explanatory

```
<script src="scripts/kendo/2019.3.1023/jquery.min.js"></script>
<script src="scripts/angular/1.4.8/angular.min.js"></script>
<script src="scripts/angular/1.4.8/angular-route.min.js"></script>
<script src="scripts/angular/1.4.8/angular-sanitize.min.js"></script>
<script src="scripts/kendo/2019.3.1023/kendo.all.min.js"></script>
```

### Page Loader
How to use it?

```
<div class="pageloader"></div>
<div class="infraloader is-active"></div>
```

```
angular.element(function () {
      if ($('.pageloader').length) {

        $('.pageloader').toggleClass('is-active');

        $(window).on('load', function () {
        var pageloaderTimeout = setTimeout(function () {
        $('.pageloader').toggleClass('is-active');
        $('.infraloader').toggleClass('is-active')
        clearTimeout(pageloaderTimeout);
     }, 1500);
   })
  }
});
```
### Bundle Config Template
Follow this sample template if you're gonna use a bundler.

```
bundles.Add(new StyleBundle("~/Content/css").Include(
    "~/Content/assets/css/bulma.css",
    "~/Content/assets/css/app.css",
    "~/Content/assets/css/icons.min.css",
    "~/Content/assets/css/sidebar/sidebar.css",
    "~/Content/assets/css/bulma-core.css",
    "~/Content/assets/css/bootstrap/4.0.0/bootstrap.css",
    "~/Content/assets/css/materialize/material-dashboard.css",
    "~/Content/assets/css/tooltipster/tooltipster.bundle.css",
    "~/Content/assets/css/kendo/2019.3.1023/kendo.material-v2.min.css",
    "~/Content/assets/css/kendo-override.css",
    "~/Content/assets/css/main.css",
    "~/Content/assets/css/framework/1.0.0/framework-override.css"
    ));
```

```
bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
    "~/Scripts/kendo/2019.3.1023/jquery.min.js"
));
bundles.Add(new ScriptBundle("~/bundles/script").Include(
    "~/Scripts/bootstrap/4.0.0/bootstrap.min.js",
    "~/Scripts/bulma-core/app.js",
    "~/Scripts/angular/1.4.8/angular.js",
    "~/Scripts/angular/1.4.8/angular-route.js",
    "~/Scripts/angular/1.4.8/angular-sanitize.js",
    "~/Scripts/kendo/2019.3.1023/kendo.all.min.js",
    "~/Scripts/kendo/2019.3.1023/jszip.min.js"
));

bundles.Add(new ScriptBundle("~/bundles/external-scripts").Include(
    "~/Scripts/tooltipster/tooltipster.bundle.min.js",
    "~/Scripts/bulma-core/sidebar.js",
    "~/Scripts/bulma-core/notification.js"
));
```
