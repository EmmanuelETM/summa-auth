import { Dialog } from "../Dialog";
import { Button } from "../../Button";
import { Input, Checkbox } from "../../Input";
import { Plus } from "lucide-react";

export function CreateUserDialog({ open, setOpen }) {
  return (
    <Dialog
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Create User"
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
      <form onSubmit={(event) => event.preventDefault()}>
        <Input label="Name" />
        <Input type="email" label="Email" />
        <Input type="password" label="Password" />
        <Checkbox label={"Enabled"} />
      </form>
    </Dialog>
  );
}
