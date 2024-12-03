import { useEffect } from "react"

export const useShortcut = (keys: string[], callback: () => any) => {

    const handleKeyDown = (event: KeyboardEvent) => {

        const pressedKeys = new Set<string>()

        if (event.ctrlKey) pressedKeys.add("control")
        if (event.shiftKey) pressedKeys.add("shift")
        if (event.altKey) pressedKeys.add("alt")
        if (event.metaKey) pressedKeys.add("meta")

        pressedKeys.add(event.key.toLowerCase())

        const requiredKeys = new Set(keys.map(key => key.toLowerCase()))

        const isMatchingKeys = requiredKeys.size === pressedKeys.size && Array.from(requiredKeys).every(key => pressedKeys.has(key))

        if (isMatchingKeys) callback()
            
    }

    useEffect(() => {

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)

    }, [callback])

}
