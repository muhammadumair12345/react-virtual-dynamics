# react-virtualizer

A React component for efficiently rendering large lists or grids of items using virtualization. This component improves performance by only rendering items that are currently visible in the viewport.

## Installation

To install the package, run:

```bash
npm install react-virtualizer
```

## Usage

### Basic Example

Here is a basic example of how to use the `VirtualizedList` component:

```tsx
import React from "react";
import VirtualizedList from "react-virtualizer";

const data = Array.from({ length: 200 }).map((_, i) => i + 1);

const App = () => {
  return (
    <VirtualizedList
      dataLength={data.length}
      viewportHeight={500}
      itemHeight={100}
      gap={10}
      renderItem={(index, style) => (
        <div key={index} style={style}>
          {data[index]}
        </div>
      )}
    />
  );
};

export default App;
```

### Props

| Prop             | Type                                                             | Default | Description                                                                             |
| ---------------- | ---------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `dataLength`     | `number`                                                         |         | The total number of items in the data set.                                              |
| `viewportHeight` | `number`                                                         |         | The height of the viewport for the virtualized list.                                    |
| `gridColumns`    | `number`                                                         | `1`     | The number of columns for grid layout. Set to `1` for a single column (list layout).    |
| `loadMore`       | `() => void`                                                     | `null`  | Optional function to load more items when the user scrolls near the bottom of the list. |
| `isLoading`      | `boolean`                                                        | `false` | Optional boolean to show a loading indicator when more items are being loaded.          |
| `renderItem`     | `(index: number, style: React.CSSProperties) => React.ReactNode` |         | Function to render an item. Receives the index and a style object for positioning.      |
| `itemHeight`     | `number`                                                         |         | The height of a single item.                                                            |
| `gap`            | `number`                                                         |         | The gap between items in the grid.                                                      |

### Example with Loading Indicator and Load More

```tsx
import React, { useState } from "react";
import VirtualizedList from "react-virtualizer";

const initialData = Array.from({ length: 50 }).map((_, i) => i + 1);

const App = () => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        const moreData = Array.from({ length: 20 }).map(
          (_, i) => data.length + i + 1
        );
        setData([...data, ...moreData]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <VirtualizedList
      dataLength={data.length}
      viewportHeight={500}
      gridColumns={4}
      itemHeight={100}
      gap={10}
      loadMore={loadMore}
      isLoading={isLoading}
      renderItem={(index, style) => (
        <div key={index} style={style}>
          {data[index]}
        </div>
      )}
    />
  );
};

export default App;
```

## Development

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/muhammadumair12345/react-virtualizer.git
cd react-virtualizer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

### Building the Package

To build the package, run:

```bash
npm run build
```

This will create a `dist` folder containing the compiled code.

````

3. Create a new React project (or use an existing one) and link the package:

```bash
npx create-react-app my-app
cd my-app
npm install react-virtualizer
````

4. Import and use the `VirtualizedList` component in your project as shown in the examples above.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

Please ensure your code follows the project's coding standards and passes all tests.

See the [Contributing Guide](https://github.com/muhammadumair12345/react-virtualizer/blob/main/CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/muhammadumair12345/react-virtualizer/blob/main/LICENSE) file for details.

## Acknowledgements

Special thanks to the community for their contributions and feedback.
