import React, { useEffect, useRef } from "react";

export const Mole: React.FC<{ visible: boolean; onClick: () => void; }>= ({
        visible,
        onClick, }) => {
            const gridCellRef = React.createRef<HTMLDivElement>();

            const applyClassAndRemove =(className: string) => {
                gridCellRef.current?.classList.add(className);
                setTimeout(()=> {
                    gridCellRef.current?.classList.remove(className);
                },250);
            };
            useEffect(()=>{
                return()=> {
                    if(gridCellRef.current){
                        gridCellRef.current.classList.remove('successful','missed');
                    }
                };
            },[]);
        return (
        <div 
            className={`mole ${visible ? 'visible': '' }`}
            ref={gridCellRef}
            onClick ={() => {
                onClick();
                if (visible) applyClassAndRemove('successful');
                else applyClassAndRemove('missed');
            }}>
        </div>
    );
};