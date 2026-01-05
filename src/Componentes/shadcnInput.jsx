import { Input } from "@/components/ui/input"

export function ShadcnInput({placeholder, value, onChange}) {

    return <Input onChange={onChange} value={value} type="text" placeholder={placeholder} />
}
