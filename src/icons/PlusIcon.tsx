type Props = {
    size: number
}

export const PlusIcon = ({ size }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width={size} height={size} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor">
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
        </svg>
    )
}