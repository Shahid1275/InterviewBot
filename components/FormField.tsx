// FormField.tsx
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Controller } from 'react-hook-form'

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
}

const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='label'>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className='input' type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormField