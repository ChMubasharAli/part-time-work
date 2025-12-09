"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();

  const paths = pathname
    .split("/")
    .filter((p) => p) // remove empty parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1)); // capitalize

  return (
    <nav className="text-sm text-gray-600 flex items-center space-x-2 py-3">
      <Link href="/" className="hover:text-blue-600">
        Home
      </Link>

      {paths.map((segment, index) => {
        const href =
          "/" +
          paths
            .slice(0, index + 1)
            .join("/")
            .toLowerCase();
        const isLast = index === paths.length - 1;

        return (
          <div key={index} className="flex items-center space-x-2">
            <span>/</span>

            {isLast ? (
              <span className="text-gray-900 font-medium">{segment}</span>
            ) : (
              <Link href={href} className="hover:text-blue-600">
                {segment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
