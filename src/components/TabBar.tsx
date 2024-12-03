import { memo, useEffect, useLayoutEffect, useState } from "react"
import { TabGroup, TabList } from "@headlessui/react"
import { useAppStore } from "../stores/appStore"
import { TabItem } from "./TabItem"

type Props = {
    tabGroupRef: React.MutableRefObject<HTMLElement | null>
    scrollArrowsRef: React.MutableRefObject<HTMLElement | null>
}

export const TabBar = memo(({ tabGroupRef, scrollArrowsRef }: Props) => {

    const tabTitle = useAppStore(s => s.tabTitle)
    const tabs = useAppStore(s => s.tabs)
    const selectedTab = useAppStore(s => s.selectedTab)
    const showScrollArrows = useAppStore(s => s.showScrollArrows)
    const setSelectedTab = useAppStore(s => s.setSelectedTab)
    const toggleScrollArrows = useAppStore(s => s.toggleScrollArrows)

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const [tabWidth, setTabWidth] = useState<number>(0)
    
    const handleResize = () => {

        setWindowWidth(window.innerWidth);
        
    }

    useLayoutEffect(() => {

        const availableWidth = windowWidth-200
        const numberOfTabs = tabTitle.length
        const width = availableWidth/(numberOfTabs+1)

        setTabWidth(width)

    }, [tabTitle.length, windowWidth])

    useLayoutEffect(() => {

        if(tabGroupRef.current) {

            const scrollArrowsWidth = scrollArrowsRef.current?.clientWidth || 0
            const hasScroll = tabGroupRef.current.scrollWidth-scrollArrowsWidth > tabGroupRef.current.clientWidth

            if(hasScroll !== showScrollArrows) toggleScrollArrows()

        }

    }, [tabWidth, windowWidth])

    useEffect(() => {

        setTimeout(() => tabs[selectedTab]?.scrollIntoView({ behavior: "smooth" }))

    }, [selectedTab])

    useEffect(() => {

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)

    }, [])

    return (
        <TabGroup
            ref={tabGroupRef}
            onChange={setSelectedTab}
            selectedIndex={selectedTab}
            className="flex overflow-auto"
        >
            <TabList className="flex">
                {
                    tabTitle.map((_, i) => (
                        <TabItem
                            key={i}
                            index={i}
                            title={tabTitle[i]}
                            width={tabWidth}
                        />
                    ))
                }
            </TabList>
        </TabGroup>
    )

})