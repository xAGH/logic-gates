interface FitViewButtonProps {
    onClick: any;
}

const FitViewButton = ({ onClick }: FitViewButtonProps) => (
    <button
        onClick={onClick}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2 rounded bg-primary text-on-primary border-none cursor-pointer text-l"
    >
        Volver al contenido
    </button>
);

export default FitViewButton;
