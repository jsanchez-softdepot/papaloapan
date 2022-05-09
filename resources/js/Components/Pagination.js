import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Pagination = ({ links }) => {
  return links.map((item, itemIndex) => {
    return <Link className="btn btn-info btn-sm mr-2" href={item.url} key={itemIndex.toString()} dangerouslySetInnerHTML={{ __html: item.label }}></Link>;
  });
};

export default Pagination;
