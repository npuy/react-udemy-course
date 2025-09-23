import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface BreadcrumbType {
  label: string;
  to: string;
}

interface CustomBreadcrumbsProps {
  currentPage: string;
  breadcrumbs?: BreadcrumbType[];
}

export const CustomBreadcrumbs = ({
  currentPage,
  breadcrumbs = [],
}: CustomBreadcrumbsProps) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={crumb.to}>{crumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-black font-bold">
            {currentPage}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
