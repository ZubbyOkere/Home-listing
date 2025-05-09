import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label: string;
  defaultValue?: string;
  placeHolder: string;
};
const FormInput = (props: FormInputProps) => {
  const { name, type, label, defaultValue, placeHolder } = props;
  return (
    <div className="mb-2">
      <Label htmlFor={name}>{label || name}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        required
      />
    </div>
  );
};

export default FormInput;
