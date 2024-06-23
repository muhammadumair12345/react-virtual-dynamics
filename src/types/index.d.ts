interface VirtualizedListProps {
  dataLength: number;
  viewportHeight: number;
  gridColumns?: number;
  loadMore?: () => void;
  isLoading?: boolean;
  renderItem: (index: number, style: React.CSSProperties) => React.ReactNode;
  itemHeight: number;
  gap: number;
}