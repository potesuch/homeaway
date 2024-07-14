interface CustomButtonProps {
    label: string;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className
}) => {
    return (
        <button
            type="submit"
            className={`w-full py-4 bg-helio hover:bg-helio-dark text-white text-center rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </button>
    );
};

export default CustomButton;
