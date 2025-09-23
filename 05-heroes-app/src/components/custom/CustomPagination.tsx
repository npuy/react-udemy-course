import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface CustomPaginationProps {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: CustomPaginationProps) => {
  const page = 1;
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button variant={index + 1 === page ? "default" : "outline"} size="sm">
          {index + 1}
        </Button>
      ))}

      <Button variant="outline" size="sm" disabled={page === totalPages}>
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
