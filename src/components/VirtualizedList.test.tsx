import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import VirtualizedList from "./VirtualizedList";

const mockData = Array.from({ length: 200 }).map((_, i) => i + 1);

const renderItem = (index: number, style: React.CSSProperties) => (
  <div
    key={index}
    style={{
      ...style,
      border: "1px solid black",
      backgroundColor: "gray",
    }}
    data-testid={`item-${index}`}
  >
    {mockData[index]}
  </div>
);

const defaultProps = {
  dataLength: mockData.length,
  viewportHeight: 500,
  itemHeight: 100,
  gap: 10,
  gridColumns: 4,
  renderItem: renderItem,
};

describe("VirtualizedList", () => {
  it("renders initial items", () => {
    render(<VirtualizedList {...defaultProps} />);

    const items = screen.getAllByTestId(/^item-/);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toHaveTextContent("1");
  });

  it("renders more items on scroll", () => {
    const { container } = render(<VirtualizedList {...defaultProps} />);

    fireEvent.scroll(container, { target: { scrollTop: 1000 } });

    const items = screen.getAllByTestId(/^item-/);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toHaveTextContent("1");
  });

  it("displays loading indicator when isLoading is true", () => {
    render(<VirtualizedList {...defaultProps} isLoading={true} />);
    
    const loadingIndicator = screen.getByText(/fetching more data/i);
    expect(loadingIndicator).toBeInTheDocument();
  });

  it("renders correct number of items based on viewport height", () => {
    const viewportHeight = 500;
    const itemHeight = 100;
    const itemsPerRow = 4;
    const visibleRows = Math.ceil(viewportHeight / itemHeight);
    const expectedVisibleItems = visibleRows * itemsPerRow;

    render(<VirtualizedList {...defaultProps} viewportHeight={viewportHeight} itemHeight={itemHeight} />);

    const items = screen.getAllByTestId(/^item-/);
    expect(items.length).toBe(expectedVisibleItems);
  });

  it("renders items in correct positions", () => {
    render(<VirtualizedList {...defaultProps} />);

    const item = screen.getByTestId("item-0");
    expect(item).toHaveStyle("top: 0px");
    expect(item).toHaveStyle("left: 0%");
  });

  it("handles case when dataLength is 0", () => {
    render(<VirtualizedList {...defaultProps} dataLength={0} />);

    const items = screen.queryAllByTestId(/^item-/);
    expect(items.length).toBe(0);
  });
});
