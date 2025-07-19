---
title: "Understanding ARIA Roles"
description: "Learn about ARIA roles and how they define the purpose and function of elements for assistive technologies."
order: 2
---

# Understanding ARIA Roles

ARIA roles tell assistive technologies what an element is or does. They provide semantic meaning to elements that might otherwise be unclear or inadequate when using standard HTML alone.

## What are ARIA Roles?

Roles define the **purpose** of an element. They answer the question "What is this element?" for assistive technologies like screen readers.

### Types of Roles

ARIA roles fall into several categories:

1. **Landmark Roles** - Define page regions
2. **Widget Roles** - Define interactive controls
3. **Document Structure Roles** - Define content organization
4. **Live Region Roles** - Define dynamic content areas

## Landmark Roles

Landmark roles help users navigate page sections:

```html
<nav role="navigation">
	<!-- Navigation links -->
</nav>

<main role="main">
	<!-- Main content -->
</main>

<aside role="complementary">
	<!-- Sidebar content -->
</aside>

<footer role="contentinfo">
	<!-- Footer information -->
</footer>
```

### Common Landmark Roles

- `banner` - Site header/masthead
- `navigation` - Navigation links
- `main` - Primary content
- `complementary` - Supporting content
- `contentinfo` - Footer information
- `search` - Search functionality

## Widget Roles

Widget roles define interactive elements:

```html
<div role="button" tabindex="0">Custom Button</div>

<div role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
	<!-- Custom slider -->
</div>

<ul role="tablist">
	<li role="tab" aria-selected="true">Tab 1</li>
	<li role="tab" aria-selected="false">Tab 2</li>
</ul>
```

### Popular Widget Roles

- `button` - Clickable button
- `link` - Hyperlink
- `checkbox` - Checkbox control
- `slider` - Range input
- `tab` - Tab control
- `tablist` - Container for tabs
- `tabpanel` - Tab content area

## Document Structure Roles

These roles organize content hierarchy:

```html
<article role="article">
	<header role="banner">
		<h1>Article Title</h1>
	</header>

	<section role="region" aria-labelledby="section-heading">
		<h2 id="section-heading">Section Title</h2>
		<!-- Section content -->
	</section>
</article>
```

## Best Practices

### 1. Use Semantic HTML First

```html
<!-- Good: Native HTML -->
<button>Click me</button>

<!-- Avoid: Custom element with role -->
<div role="button">Click me</div>
```

### 2. Don't Override Native Semantics

```html
<!-- Bad: Conflicting semantics -->
<button role="link">Confusing Element</button>

<!-- Good: Use appropriate element -->
<a href="#somewhere">Link Text</a>
```

### 3. Ensure Keyboard Accessibility

When using widget roles, implement proper keyboard navigation:

```html
<div role="button" tabindex="0" onkeydown="handleKeyDown(event)">
	Custom Button
</div>
```

### 4. Provide Required Properties

Some roles require specific ARIA properties:

```html
<!-- Slider requires value properties -->
<div
	role="slider"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow="25"
	aria-label="Volume"
></div>
```

## Common Mistakes

1. **Adding unnecessary roles** to semantic HTML
2. **Missing required properties** for widget roles
3. **Incorrect role hierarchy** (e.g., tab not in tablist)
4. **Forgetting keyboard support** for interactive roles

## Testing Your Roles

Use these tools to verify your ARIA roles:

- Screen reader software (NVDA, JAWS, VoiceOver)
- Browser developer tools accessibility panel
- Automated testing tools (axe, WAVE)

Remember: Roles provide meaning, but they must be combined with proper states, properties, and keyboard interaction to create truly accessible experiences.
