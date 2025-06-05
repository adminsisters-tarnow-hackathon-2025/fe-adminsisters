import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

export interface FormInputProps {
  form: UseFormReturn;
  name: string;
  placeholder?: string;
  label?: string;
}

export const FormInput: React.FC<FormInputProps> = (props) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input placeholder={props.placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
