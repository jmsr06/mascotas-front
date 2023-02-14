import { useState } from 'react'
import { Popover, ArrowContainer } from 'react-tiny-popover'

const Info = ({ info }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={['bottom', 'top', 'left', 'right']} // preferred positions by priority
            onClickOutside={() => setIsPopoverOpen(false)}
            content={({ position, childRect, popoverRect }) => (
                <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowSize={10}
                    arrowColor={'rgb(254 249 195)'}
                    arrowStyle={{ opacity: 1 }}
                    className='popover-arrow-container'
                    arrowClassName='popover-arrow'>
                    <ul className='z-100 font-semibold bg-yellow-100 p-4 text-xs w-40 rounded-md'>
                        {info.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </ArrowContainer>)}
        >
            <span onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='ml-2 inline-flex justify-center items-center bg-blue-500 w-5 h-5 rounded-full hover:bg-blue-300 cursor-pointer'>
                <i className="cursor-pointer text-xs text-white fa-solid fa-question"></i>
            </span>
        </Popover>
    )
}

export default Info
