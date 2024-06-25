import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

interface VirtualizedListProps {
  dataLength: number;
  viewportHeight: number;
  gridColumns?: number;
  loadMore?: () => void;
  isLoading?: boolean;
  renderItem: (index: number, style: React.CSSProperties) => ReactNode;
  itemHeight: number;
  gap: number;
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  dataLength,
  viewportHeight,
  gridColumns = 1,
  loadMore = () => {},
  isLoading = false,
  renderItem,
  itemHeight,
  gap,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerRow = gridColumns > 1 ? gridColumns : 1;
  const rowHeight = itemHeight + gap;
  const totalHeight = useMemo(
    () => Math.ceil(dataLength / itemsPerRow) * rowHeight,
    [dataLength, itemsPerRow, rowHeight]
  );

  const handleScroll = useCallback(
    (e: Event) => {
      const target = e.target as HTMLDivElement;
      setScrollTop(target.scrollTop);

      if (target.scrollTop + target.clientHeight >= totalHeight - 100) {
        loadMore();
      }
    },
    [loadMore, totalHeight]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / rowHeight) * itemsPerRow;
    const endIndex = Math.min(
      dataLength - 1,
      Math.ceil((scrollTop + viewportHeight) / rowHeight) * itemsPerRow - 1
    );
    return { startIndex, endIndex };
  }, [dataLength, itemsPerRow, rowHeight, scrollTop, viewportHeight]);

  const renderItems = (): ReactNode[] => {
    const items: ReactNode[] = [];
    for (
      let index = visibleItems.startIndex;
      index <= visibleItems.endIndex;
      index++
    ) {
      const rowIndex = Math.floor(index / itemsPerRow);
      const top = rowIndex * rowHeight;
      const style: React.CSSProperties = {
        position: "absolute",
        top,
        left: `${(index % itemsPerRow) * (100 / itemsPerRow)}%`,
        width: `calc(${100 / itemsPerRow}% - ${gap}px)`,
        minHeight: itemHeight,
      };
      items.push(renderItem(index, style));
    }
    return items;
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: viewportHeight,
        width: "100%",
        margin: "auto",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div
        className="virtualized-inner"
        style={{ height: totalHeight, position: "relative" }}
      >
        {renderItems()}
        {isLoading && (
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px",
              background: "rgba(0, 0, 0, 0.5)",
              color: "white",
              borderRadius: "5px",
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Fetching more data...
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(VirtualizedList);
