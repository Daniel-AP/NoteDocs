type Props = {
    size: number
}

export const CloseIcon = ({ size }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width={size} height={size} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor">
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
        </svg>
    )
}