---
title: "Keyboard Navigation Fundamentals"
description: "Learn how users navigate the web using keyboards and how to design accessible keyboard experiences."
order: 3
---

# Keyboard Navigation Fundamentals

Many users rely on keyboards to navigate websites instead of using a mouse. This includes people with motor disabilities, users of assistive technologies, and those who simply prefer keyboard navigation for efficiency.

## Who Uses Keyboard Navigation?

- **Users with motor disabilities** who cannot use a mouse or trackpad
- **Screen reader users** who rely on keyboard commands to navigate
- **Users with tremors or limited fine motor control**
- **Power users** who prefer keyboard shortcuts for speed
- **Users with temporary injuries** (broken arm, RSI, etc.)

## Essential Keyboard Navigation Patterns

### Tab Order

The **Tab key** is the primary way users move through interactive elements on a page. When you press Tab, focus should move logically through:

1. Links
2. Buttons
3. Form inputs
4. Custom interactive elements

```html
<!-- Good: Logical tab order -->
<nav>
	<a href="#main">Skip to main content</a>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
</nav>

<main id="main">
	<h1>Welcome</h1>
	<button>Get Started</button>
	<form>
		<input type="text" placeholder="Search" />
		<button type="submit">Search</button>
	</form>
</main>
```

## Focus Management

### Visible Focus Indicators

Users need to see where they are on the page. Every focusable element should have a clear visual indicator when focused.

```css
/* Good: Clear focus indicator */
button:focus,
a:focus {
	outline: 2px solid #005fcc;
	outline-offset: 2px;
}

/* Bad: Removing focus indicators */
button:focus {
	outline: none; /* Never do this without an alternative! */
}
```

### Focus Trapping

When a modal or dialog opens, focus should be trapped within it until the user closes it.

```javascript
// Example: Simple focus trap for a modal
function trapFocus(element) {
	const focusableElements = element.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
	);

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	element.addEventListener("keydown", (e) => {
		if (e.key === "Tab") {
			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
		}
	});
}
```

## Skip Links

Skip links allow keyboard users to bypass repetitive navigation and jump straight to main content.

```html
<body>
	<a href="#main-content" class="skip-link"> Skip to main content </a>

	<nav>
		<!-- Navigation items -->
	</nav>

	<main id="main-content">
		<h1>Main Content</h1>
		<!-- Page content -->
	</main>
</body>
```

```css
.skip-link {
	position: absolute;
	top: -40px;
	left: 6px;
	background: #000;
	color: #fff;
	padding: 8px;
	text-decoration: none;
	border-radius: 4px;
	z-index: 1000;
}

.skip-link:focus {
	top: 6px;
}
```

## Common Keyboard Navigation Issues

### 1. Invisible Focus

```html
<!-- Bad: Focus is invisible -->
<button style="outline: none;">Click me</button>

<!-- Good: Clear focus indicator -->
<button class="btn-with-focus">Click me</button>
```

### 2. Illogical Tab Order

```html
<!-- Bad: Tab order doesn't match visual order -->
<div>
	<button tabindex="3">Third</button>
	<button tabindex="1">First</button>
	<button tabindex="2">Second</button>
</div>

<!-- Good: Natural DOM order -->
<div>
	<button>First</button>
	<button>Second</button>
	<button>Third</button>
</div>
```

### 3. Keyboard Traps

```html
<!-- Bad: Focus gets stuck in this input -->
<input onblur="this.focus()" />

<!-- Good: Users can navigate away freely -->
<input placeholder="Enter your name" />
```

## Testing Keyboard Navigation

### Manual Testing Steps

1. **Unplug your mouse** or put it aside
2. **Use only the Tab key** to navigate through your site
3. **Check that all interactive elements** can be reached
4. **Verify focus is visible** on every element
5. **Test that you can activate** buttons and links with Enter/Space
6. **Ensure you can escape** from modals and menus

### Automated Testing

```javascript
// Example: Check for focusable elements without visible focus
function checkFocusIndicators() {
	const focusableElements = document.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
	);

	focusableElements.forEach((element) => {
		element.addEventListener("focus", () => {
			const styles = getComputedStyle(element);
			if (styles.outline === "none" && styles.boxShadow === "none") {
				console.warn(
					"Element has no visible focus indicator:",
					element,
				);
			}
		});
	});
}
```

## Best Practices Summary

1. **Ensure logical tab order** that follows the visual layout
2. **Provide clear focus indicators** for all interactive elements
3. **Include skip links** for main navigation
4. **Trap focus** in modals and dialogs
5. **Use semantic HTML** (`<button>`, `<a>`) instead of generic divs
6. **Test with keyboard only** regularly
7. **Don't rely on hover** for important functionality
8. **Provide keyboard alternatives** for mouse-specific interactions

## What's Next?

Now that you understand how users navigate with keyboards, you're ready to learn about semantic HTML and how proper markup creates accessible experiences for all users.

---

### Key Takeaways

- Keyboard navigation is essential for many users with disabilities
- Tab order should be logical and follow visual layout
- Every interactive element needs a visible focus indicator
- Skip links help users bypass repetitive content
- Testing with keyboard-only navigation reveals accessibility issues
