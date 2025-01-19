interface HeadingProps {
    title: string;
    description: string;            
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    description
}) => {
    return (
        <div className="flex flex-col items-start">
            <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
            <h3 className="text-sm text-gray-400">{description}</h3>
        </div>
    )   
}