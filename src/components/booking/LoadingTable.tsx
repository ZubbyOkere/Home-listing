import { Skeleton } from "../ui/skeleton";

const LoadingTable = ({ rows }: { rows?: number }) => {
  const tableRows = Array.from({ length: rows || 5 }, (_, i) => {
    return (
      <div key={i} className="mb-4">
        <Skeleton className="w-full h-8 rounded" />
      </div>
    );
  });
  return <>{tableRows}</>;
};

export default LoadingTable;
