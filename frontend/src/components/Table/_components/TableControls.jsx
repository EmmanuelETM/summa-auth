// TableControls.jsx
import { Button } from "../../Button";
import { Filters } from "./Filters";
import { Plus } from "lucide-react";

export function TableControls({
  filters,
  setFilters,
  text,
  accessors,
  onClick = () => console.log("clicked"),
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 w-full">
      <Filters
        filters={filters}
        setFilters={setFilters}
        accessors={accessors}
      />
      <div className="flex-shrink-0">
        <Button
          Icon={Plus}
          text={text}
          onClick={onClick}
          variant="secondary"
          className="h-full"
        />
      </div>
    </div>
  );
}
