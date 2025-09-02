import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "../ui/breadcrumb";
import { Link } from "react-router";

interface BreadCrumbs {
  label: string,
  to: string;
}

interface Props {
  currentPage: string;
  breadCrumbs?: BreadCrumbs[];
}

export function CustomBreadCrumbs({ currentPage, breadCrumbs }: Props) {

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild >
            <Link to='/'>
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        {
          breadCrumbs?.map((crumb, i) => (
            <div
              key={i}
              className="flex flex-row gap-0.5 justify-center items-center">
              <BreadcrumbItem >
                <BreadcrumbLink asChild >
                  <Link to={crumb.to}>
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            </div>
          ))
        }
        <BreadcrumbItem>
          <BreadcrumbLink className="text-black font-bold">
            {currentPage}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}