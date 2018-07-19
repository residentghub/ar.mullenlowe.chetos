var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ClientTracker needs to be created in order to start the recognition engine. It is initialized with a URL specific to the target collection. Optional parameters are passed as object in the last argument. In this case a callback function for the onLoaded trigger is set. Once the tracker is fully loaded the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
		this.tracker = new AR.ClientTracker("assets/tracker_ar_cheetos.wtc", {
			onLoaded: this.worldLoaded
		});

		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.Trackable2DObject) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/


		var phonegap_gif = new AR.ImageResource("assets/giphy_chester.gif");
		var overlayGif = new AR.ImageDrawable(phonegap_gif, 0.3, {
			offsetX: 0,
			//offsetY: -0.70
			offsetY: 0
		});
		//overlayGif.animate([0, 1, 2, 3, 4], 10, 10);		

		/*var samurai_eyes_animate = new AR.AnimatedImageDrawable(samurai_eyes, 1, 286, 315, {
			offsetX: 0,
			offsetY: 0
		});

		samurai_eyes_animate.animate([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 50, -1);*/

		//var htmlModel3DChester = "<div class='sketchfab-embed-wrapper'><iframe width='640' height='480' src='https://sketchfab.com/models/f0a89b7a5d6346fe87880c123e5bd7fd/embed?autospin=0.2&amp;autostart=1&amp;preload=1' frameborder='0' allow='autoplay; fullscreen; vr' mozallowfullscreen='true' webkitallowfullscreen='true'></iframe></div>";

		// htmlDrawable will use the html representation
		var htmlDrawable = new AR.HtmlDrawable({
		  html:"<div>My div</div>", uri:"http://lowemx.com/archetos/canvas.html"
		}, 1.5);
		// now, uri will take precedence:
		htmlDrawable.uri = "http://lowemx.com/archetos/canvas.html";


		/*var htmlDrawable = new AR.HtmlDrawable({html: htmlModel3DChester }, 03, {
		  offsetX: 0,
		  offsetY: 0
		});*/
 
		var phonegap_text = new AR.ImageResource("assets/cheetos-logo-black-and-white.png");
		var overlayOne = new AR.ImageDrawable(phonegap_text, 0.3, {
			offsetX: 0,
			offsetY: -0.30
		});

		/*
			The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
		*/
		var pageOne = new AR.Trackable2DObject(this.tracker, "*", {
			drawables: {
				cam: [htmlDrawable]
			}
		});
	},

	worldLoaded: function worldLoadedFn() {
		var message = " style='text-align: center; font-family:Arial, sans-serif;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + message + ">Swipe right or use back button to exit.</div>";

		// Remove Scan target message after 10 sec.
		setTimeout(function() {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
		}, 10000);
	}
};

World.init();
