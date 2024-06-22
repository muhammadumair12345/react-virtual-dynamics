import VirtualizedList from "./components/VirtualizedList";

const data = Array.from({ length: 200 }).map((_, i) => i + 1);

const App = () => {
  return (
    <VirtualizedList
      dataLength={data.length}
      viewportHeight={500}
      itemHeight={100}
      gap={10}
      isLoading={true}
      gridColumns={4}
      renderItem={(index, style) => (
        <div key={index} style={{ ...style, background: "red" }}>
          {data[index]}
        </div>
      )}
    />
  );
};

export default App;
