# Info Box Plug-In Version 1.0

## Convenient HTML5 component for advertisements.

Include the components below somewhere in the `<head>` section.

### CSS:
```<link rel="stylesheet" href="info_box.css" />```

### jQuery Library:
```<script src="js/jquery-2.1.4.min.js"></script>``` or connect from any available CDN

### jQuery Plug-In:
```<script src="js/jquery.info_box_v_1_0.js"></script>```

### Plug-In Initialization:
```
<script>
	jQuery(document).ready(function($) {

		$(document).infoBox({

			themeStyle: 'orange',

			expandInterval: 300,

			easing: 'easeOutBounce'

		});

	});
</script>
```

### Plug-In Options:

Theme color: red, green, blue; Default: orange; Type: string;

Animation duration: 300 (Minimum: 1); Default: 300; Type: number;

Easing animation effect: swing, easeInOutBack, easeOutBounce; Default: easeOutBounce; Type: string;

Shadow style: light, dark; Default: none; Type: string;

### Custom Theme:

Instead of themeStyle you can pass your own 3 parameters:

color, bgTopColor and bgBottomColor.

- `color` accepts any available css color value for colored text nodes;

- `bgTopColor` accepts any available css value for buttons top gradient color;

- `bgBottomColor` is the same as bgTopColor but for buttons bottom gradient color;

Example:
```
<script>
	$(document).infoBox({

		bgTopColor: '#fe7f1e',

		bgBottomColor: '#fc4203',

		color: '#ff6200'

	});
</script>
```

### JSON Support.



None of parameters is mandatory.

z.grigoriy@inbox.ru

