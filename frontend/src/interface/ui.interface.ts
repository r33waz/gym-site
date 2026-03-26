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