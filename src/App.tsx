import { VirtualizedList } from './components';

const data = Array.from({ length: 200 }).map((_, i) => i + 1);

const App = () => {
  return (
    <VirtualizedList
      dataLength={data.length}
      viewportHeight={500}
      itemHeight={100}
      gap={10}
      gridColumns={4}
      renderItem={(index, style) => (
        <div
          key={index}
          style={{
            ...style,
            border: '1px solid black',
            backgroundColor: 'gray',
          }}
        >
          {data[index]}
        </div>
      )}
    />
  );
};

export default App;
