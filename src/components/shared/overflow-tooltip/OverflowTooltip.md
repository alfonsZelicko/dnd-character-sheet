## OverflowTooltip Component

The `OverflowTooltip` component provides a tooltip that appears when its child content overflows its container. This is particularly useful for displaying the full text of truncated elements, such as text with ellipsis applied due to space constraints.

### Props

- `BoxProps` (optional): Props for the Tooltip inned wrapper of the content of tooltip
- `maxWidth` (optional): The maximum width (in pixels) of the container before the content is truncated and the tooltip becomes active. {-1} means 'no truncate' (as when is `unset`)
- `title` (optional): The content to be displayed within the tooltip itself. If not provided (`title === undefined`), the full, untruncated text of the child element will be used.
- `...tooltipProps`: Any additional props that can be passed to the underlying `Tooltip` component from the Material-UI library.

### Functionality

- The component uses a `ResizeObserver` to monitor changes in the size of its child element.
- If the child element's content overflows its container (i.e., its `scrollWidth` is greater than its `clientWidth`), the tooltip is displayed on hover, showing the full, untruncated text (`title` or `innerText`).
- If the content fits within the container, the tooltip is hidden.
- The `maxWidth` prop can be used to control the maximum width of the container before truncation occurs.

### Example Usage

```jsx
<OverflowTooltip>This is some very long text that might get truncated if it doesn't fit.</OverflowTooltip>
```

**Key points**

- Leverages `ResizeObserver` for efficient size monitoring
- Provides a clean way to handle text overflow with tooltips
- Customizable via `maxWidth` and additional `TooltipProps`
- Enhances user experience by revealing hidden content
