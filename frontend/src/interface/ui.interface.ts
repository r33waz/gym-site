export interface SelectOption {
    label: string;
    value: string | number; 
}


export interface SelectProps {
    options: SelectOption[];
    value?: string | number;
    onChange: (value: string) => void;
    control?: any;
    name?: string;
    label?: string;
    className?: string 
    disabled?: boolean
    isRequired?: boolean
}


//  for the input  props
export interface InputProps {
    type: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string | number) => void;
    
    className?: string;
    control?: any;
    name?: string;
    label?: string;
    disabled?: boolean
    isRequired?: boolean
    debounce?: number
}