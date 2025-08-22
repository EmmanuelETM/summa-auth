import { Dialog } from "../Dialog";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Plus } from "lucide-react";

export function CreateAppDialog({ open, setOpen }) {
  return (
    <Dialog
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Create App"
      footer={
        <>
          <Button
            text="Cancel"
            variant="secondary"
            onClick={() => setOpen(false)}
          />
          <Button
            text="Add"
            variant="primary"
            Icon={Plus}
            onClick={() => console.log("Saved")}
          />
        </>
      }
    >
      <Input label="Name" />
      <Input label="Alias" />
      <Input label="Url" />
    </Dialog>
  );
}
