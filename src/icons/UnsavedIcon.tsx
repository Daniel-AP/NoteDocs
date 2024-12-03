type Props = {
    size: number
}

export const UnsavedIcon = ({ size }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor">
            <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"></path>
        </svg>
    )
}