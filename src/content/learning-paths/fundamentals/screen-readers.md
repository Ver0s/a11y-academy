---
title: "Understanding Screen Readers"
description: "Learn how screen readers work and how to design with them in mind."
order: 2
---

# Understanding Screen Readers

A **screen reader** is assistive technology that converts digital text into
synthesized speech or braille output. It's the primary way many blind and
visually impaired users navigate the web.

## How Screen Readers Work

Screen readers don't just read text linearly. They:

1. **Parse the HTML structure** to understand the page layout
2. **Create a virtual representation** of the page content
3. **Provide navigation shortcuts** to jump between elements
4. **Announce semantic information** about elements

### Popular Screen Readers

- **NVDA** (Windows) - Free and open source
- **JAWS** (Windows) - Most popular commercial option
- **VoiceOver** (macOS/iOS) - Built into Apple devices
- **TalkBack** (Android) - Built into Android devices
- **ORCA** (Linux) - Open source screen reader

## Navigation Patterns

Screen reader users navigate differently than sighted users:

### Headings Navigation

Users can jump between headings using H key:

- H1 → H2 → H3 → H2 → H3 → H3

### Links Navigation

Users can list all links and jump to them:

- "Click here" (bad)
- "Download accessibility guide PDF" (good)

## Best Practices for Screen Reader Users

### 1. Use Semantic HTML

```html
<!-- Good -->
<h1>Main Title</h1>
<h2>Section Title</h2>
<p>Content paragraph</p>

<!-- Bad -->
<div class="big-text">Main Title</div>
<div class="medium-text">Section Title</div>
<div>Content paragraph</div>
```

### 2. Provide Alternative Text

```html
<!-- Good -->
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2" />

<!-- Bad -->
<img src="chart.png" alt="chart.png" />
```

### 3. Label Form Elements

```html
<!-- Good -->
<label for="search">Search products</label>
<input type="text" id="search" />

<!-- Bad -->
<input type="text" placeholder="Search products" />
```

### 4. Use Descriptive Link Text

```html
<!-- Good -->
<a href="/report.pdf">Download 2024 Accessibility Report (PDF, 2MB)</a>

<!-- Bad -->
<a href="/report.pdf">Click here</a>
```

**Exercise:** Install NVDA (free screen reader) and try navigating this
lesson with your eyes closed. Notice how the headings, links, and form
elements are announced.

## Common Screen Reader Issues

### 1. Missing Skip Links

Without skip links, users must tab through entire navigation:

```html
<a href="#main" class="skip-link">Skip to main content</a>
<nav>...</nav>
<main id="main">...</main>
```

### 2. Unlabeled Form Fields

```html
<!-- Bad -->
<input type="text" placeholder="Enter your name" />

<!-- Good -->
<label for="name">Full Name</label>
<input type="text" id="name" placeholder="Enter your name" />
```

### 3. Generic Link Text

```html
<!-- Bad -->
<a href="/guide">Read more</a>

<!-- Good -->
<a href="/guide">Read the complete accessibility guide</a>
```

### 4. Missing Button Labels

```html
<!-- Bad -->
<button>❌</button>

<!-- Good -->
<button aria-label="Delete item">❌</button>
```

## Testing with Screen Readers

### Quick Testing Tips

1. **Close your eyes** and try navigating with keyboard only
2. **Use heading navigation** (H key in NVDA)
3. **Tab through interactive elements**
4. **Listen to how content is announced**

### Common Keyboard Shortcuts (NVDA)

- **Tab** - Next interactive element
- **H** - Next heading
- **L** - Next link
- **B** - Next button
- **F** - Next form field
- **Insert + F7** - List all elements

**Pro tip:** The best way to understand screen readers is to use one
yourself. Download NVDA (free) and spend 15 minutes navigating familiar
websites with your eyes closed.

## What's Next?

In the next lesson, we'll explore keyboard navigation patterns and learn how to make interactive elements accessible to users who can't use a mouse.

---

## Key Takeaways

- Screen readers parse HTML structure to create navigation shortcuts
- Semantic HTML is crucial for screen reader users
- Proper labeling makes forms and buttons accessible
- Descriptive link text helps users understand destinations
- The best way to test is to use a screen reader yourself

**Remember:** Screen reader users are power users - they often navigate
faster than sighted users once they understand your page structure!
