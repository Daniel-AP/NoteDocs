import { memo, useEffect, useState } from "react"
import { Button, Tab } from "@headlessui/react"
import { useAppStore } from "../stores/appStore"
import { useModalStore } from "../stores/modalStore"
import { useActions } from "../hooks/useActions"
import { CloseIcon } from "../icons/CloseIcon"
import { UnsavedIcon } from "../icons/UnsavedIcon"

type Props = {
    title: string
    index: number
    width: number
}

export const TabItem = memo(({ title, index, width }: Props) => {
    
    const unsavedChanges = useAppStore(s => s.unsavedChanges)
    const tabs = useAppStore(s => s.tabs)
    const selectedTab = useAppStore(s => s.selectedTab)
    const isAnyModalOpen = useModalStore(s => s.isAnyModalOpen)

    const { handleDelTab } = useActions()
    const [hover, setHover] = useState(false)

    const handleClose = (e: React.MouseEvent) => {

        e.stopPropagation()
        handleDelTab(index)
        
    }

    const CloseButton = () => (
        <Button
            title="Cerrar pestaña"
            onClick={handleClose}
            className="flex shrink-0 justify-center items-center ml-2 rounded active:bg-blue-50 hover:bg-white group-data-[selected]:active:bg-blue-200 group-data-[selected]:hover:bg-blue-100 w-6 h-6"
        >
            <CloseIcon size={14} />
        </Button>
    )

    const UnsavedIndicator = () => (
        <div
            className="flex shrink-0 text-gray-500 justify-center items-center ml-2 rounded active:bg-blue-50 hover:bg-white group-data-[selected]:active:bg-blue-200 group-data-[selected]:hover:bg-blue-100 w-6 h-6"
        >
            <UnsavedIcon size={8} />
        </div>
    )

    useEffect(() => {

        if(isAnyModalOpen) setHover(false)

    }, [isAnyModalOpen])

    return (
        <Tab
            ref={el => {tabs[index] = el}}
            as="a"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            style={{ width }}
            className="data-[selected]:bg-white data-[selected]:border-[#e5e7eb] border-2 border-transparent border-b-0 py-[5px] ps-4 pe-2 rounded-lg rounded-b-none text-start min-w-28 max-w-64 hover:bg-blue-100 group outline-none cursor-default"
        >
            <div className="flex h-full justify-between items-center">
                <p className="text-ellipsis whitespace-nowrap overflow-hidden">{ title }</p>
                {
                    hover
                    ? <CloseButton />
                    : (
                        unsavedChanges.has(index)
                        ? <UnsavedIndicator />
                        : selectedTab === index
                            ? <CloseButton />
                            : null
                    )
                }
            </div>
        </Tab>
    )

})