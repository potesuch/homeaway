interface CustomButtonProps {
    label: string;
    className?: string;
    type: 'submit' | 'reset' | 'button' | undefined;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    type,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`w-full py-4 bg-helio hover:bg-helio-dark text-white text-center rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </button>
    );
};

export default CustomButton;
