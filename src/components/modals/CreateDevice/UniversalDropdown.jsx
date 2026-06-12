import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { FormContext } from "./FormContext";

const UniversalDropdown = ({ name, items, placeholder, label = "name" }) => {
  const { control, errors } = useContext(FormContext);
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: `Выберите ${placeholder.toLowerCase()}` }}
        render={({ field }) => (
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{field.value || placeholder}</Dropdown.Toggle>
            <Dropdown.Menu>
              {items.map((item) => (
                <Dropdown.Item
                  onClick={() => field.onChange(item[label])}
                  key={item.id}
                >
                  {item[label]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      />
      {errors[name] && (
        <div className="text-danger">{errors[name].message}</div>
      )}
    </>
  );
};

export default UniversalDropdown;
