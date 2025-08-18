import { BrushCleaning } from "lucide-react";
import { Button } from "../Button";
import { Filters } from "./Filters";

export function TableControls({ filters, setFilters, handleLimpiarClick }) {
  return (
    <div className="flex flex-col gap-2 max-w-6xl w-full">
      <Filters filters={filters} setFilters={setFilters} />
      <div className="flex items-center gap-4 mt-4">
        <Button
          text="Limpiar"
          Icon={BrushCleaning}
          onClick={handleLimpiarClick}
        />
      </div>
    </div>
  );
}
