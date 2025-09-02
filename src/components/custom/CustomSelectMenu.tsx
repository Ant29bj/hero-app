import { useSearchParams } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
  menuValue?: string;
  placeholder?: string;
  keyValue: string,
  values: string[];
}


export function CustomSelectMenu({ menuValue, values, placeholder, keyValue }: Props) {
  const [, setSearchParams] = useSearchParams();

  const setQueryParams = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  }
  const handleValue = (value: string) => {
    setQueryParams(keyValue, value);
  }


  return (
    <div className="flex flex-row">
      <Select
        onValueChange={(value) => handleValue(value)}
        defaultValue={''}
        value={menuValue}
      >
        <SelectTrigger className="w-[250px] cursor-pointer">
          <SelectValue placeholder={placeholder ?? ''} />
        </SelectTrigger>
        <SelectContent>
          {values.map((value, index) => {
            return <SelectItem
              key={index}
              className="capitalize"
              value={value}>{value}</SelectItem>
          })}
        </SelectContent>
      </Select>
    </div>
  );

}