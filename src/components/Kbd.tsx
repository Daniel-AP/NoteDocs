import React from "react"

type Props = {
    keyComb: string[]
}

export const Kbd = ({ keyComb }: Props) => {
    
    return (
        <>
            {
                keyComb.map((k, i) => (
                    <React.Fragment key={i}>
                        <kbd>{ k }</kbd>
                        { i < keyComb.length-1 ? " + " : null }
                    </React.Fragment>                    
                ))
            }
        </>
    )
}