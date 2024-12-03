import { useEffect, useRef, useState } from "react";
import { Button } from "@headlessui/react";
import { useActions } from "../hooks/useActions";
import { Logo } from "./Logo";
import { TabBar } from "./TabBar";
import { PlusIcon } from "../icons/PlusIcon";
import { ArrowIcon } from "../icons/ArrowIcon";
import { useAppStore } from "../stores/appStore";

export const Header = () => {

    const showScrollArrows = useAppStore(s => s.showScrollArrows)

    const { handleAddTab } = useActions()

    const [disabled, setDisabled] = useState({
        left: false,
        right: false
    })

    const tabGroupRef = useRef<HTMLElement | null>(null)
    const scrollArrowsRef = useRef<HTMLDivElement | null>(null)

    const handleDisable = () => {

        setDisabled({
            left: tabGroupRef.current?.scrollLeft! === 0,
            right: Math.round(tabGroupRef.current?.scrollLeft!) === Math.round(tabGroupRef.current?.scrollWidth!-tabGroupRef.current?.clientWidth!)
        })

    }

    const scrollTo = (x: number) => {

        if(!tabGroupRef.current) return

        tabGroupRef.current.scrollTo({
            left: tabGroupRef.current.scrollLeft+x,
            behavior: "smooth"
        })
    }

    useEffect(() => {

        if(!tabGroupRef.current) return

        tabGroupRef.current.addEventListener("scroll", handleDisable, { passive: true })
        window.addEventListener("resize", handleDisable)

        return () => {
            tabGroupRef.current?.removeEventListener("scroll", handleDisable)
            window.removeEventListener("resize", handleDisable)
        }

    }, [tabGroupRef.current])

    return (
        <header className="bg-blue-50 flex h-12 w-full pe-36 ps-4 shrink-0 text-sm">
            <Logo />
            <nav className="flex self-end overflow-hidden items-center h-9 relative">
                <div
                    ref={scrollArrowsRef}
                    data-visible={showScrollArrows ? true : null}
                    className="flex shrink-0 items-center w-0 gap-1 overflow-hidden data-[visible]:w-fit data-[visible]:mr-2"
                >
                    <Button
                        disabled={disabled.left}
                        onClick={() => scrollTo(-175)}
                        className="h-6 w-6 flex justify-center items-center rounded text-gray-500 hover:bg-white disabled:text-gray-300 disabled:hover:bg-transparent"
                    >
                        <div className="rotate-90">
                            <ArrowIcon size={10} />
                        </div>
                    </Button>
                    <Button
                        disabled={disabled.right}
                        onClick={() => scrollTo(175)}
                        className="h-6 w-6 flex justify-center items-center rounded text-gray-500 hover:bg-white disabled:text-gray-300 disabled:hover:bg-transparent"
                    >
                        <div className="-rotate-90">
                            <ArrowIcon size={10} />
                        </div>
                    </Button>
                </div>
                <TabBar
                    tabGroupRef={tabGroupRef}
                    scrollArrowsRef={scrollArrowsRef}
                />
                <Button
                    title="Abrir nueva pestaña"
                    onClick={handleAddTab}
                    className="ml-2 px-2 py-1 hover:bg-blue-100 active:bg-blue-200 rounded"
                >
                    <PlusIcon size={16} />
                </Button>
            </nav>
        </header>
    );
}
