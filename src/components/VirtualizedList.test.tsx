import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VirtualizedList from "./VirtualizedList";

describe("VirtualizedList", () => {
  const data = Array.from({ length: 200 }).map((_, i) => i + 1);

  const renderItem = (index: number, style: React.CSSProperties) => (
    <div
      key={index}
      style={{ ...style, background: "red" }}
      data-testid={`item-${index}`}
    >
      {data[index]}
    </div>
  );

  test("renders the VirtualizedList component", () => {
    render(
      <VirtualizedList
        dataLength={data.length}
        viewportHeight={500}
        itemHeight={100}
        gap={10}
        renderItem={renderItem}
      />
    );
    expect(screen.getByTestId("virtualized-container")).toBeInTheDocument();
  });

  test("renders only visible items", () => {
    render(
      <VirtualizedList
        dataLength={data.length}
        viewportHeight={500}
        itemHeight={100}
        gap={10}
        renderItem={renderItem}
      />
    );

    // Check that only the items within the viewport are rendered
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`item-${i}`)).toBeInTheDocument();
    }

    // Items outside the viewport should not be rendered
    expect(screen.queryByTestId(`item-20`)).not.toBeInTheDocument();
  });

  test("loads more items when scrolling to the bottom", () => {
    const loadMore = jest.fn();
    render(
      <VirtualizedList
        dataLength={data.length}
        viewportHeight={500}
        itemHeight={100}
        gap={10}
        renderItem={renderItem}
        loadMore={loadMore}
      />
    );

    fireEvent.scroll(screen.getByTestId("virtualized-container"), {
      target: { scrollTop: 1000 },
    });

    expect(loadMore).toHaveBeenCalled();
  });

  test("displays loading indicator when isLoading is true", () => {
    render(
      <VirtualizedList
        dataLength={data.length}
        viewportHeight={500}
        itemHeight={100}
        gap={10}
        renderItem={renderItem}
        isLoading={true}
      />
    );

    expect(screen.getByText("Fetching more data...")).toBeInTheDocument();
  });

  test("does not call loadMore when isLoading is true", () => {
    const loadMore = jest.fn();
    render(
      <VirtualizedList
        dataLength={data.length}
        viewportHeight={500}
        itemHeight={100}
        gap={10}
        renderItem={renderItem}
        loadMore={loadMore}
        isLoading={true}
      />
    );

    fireEvent.scroll(screen.getByTestId("virtualized-container"), {
      target: { scrollTop: 1000 },
    });

    expect(loadMore).not.toHaveBeenCalled();
  });
});
