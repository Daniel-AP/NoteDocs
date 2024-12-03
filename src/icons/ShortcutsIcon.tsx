type Props = {
    size: number
}

export const ShortcutsIcon = ({ size }: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width={size} height={size} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor">
            <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z"></path>
            <path d="M6 10l0 .01"></path>
            <path d="M10 10l0 .01"></path>
            <path d="M14 10l0 .01"></path>
            <path d="M18 10l0 .01"></path>
            <path d="M6 14l0 .01"></path>
            <path d="M18 14l0 .01"></path>
            <path d="M10 14l4 .01"></path>
        </svg>
    )
}